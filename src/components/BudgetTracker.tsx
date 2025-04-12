import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import '../scss/budget-tracker.scss';
import '../scss/well.scss';
import {MouseEventHandler, useState} from "react";
import {BudgetState} from "../models/BudgetState.ts";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {TransactionDetails} from "../models/TransactionDetails.ts";
import {useDateContext} from "../context/context.ts";
import {formatAmount} from "../util/util.ts";

export default function BudgetTracker(props: { budget_state: BudgetState }) {

    const [showTransactionDetails, setShowTransactionDetails] = useState(false);

    function toggleTransactionDetails() {
        setShowTransactionDetails(!showTransactionDetails);
    }

    return (
        <div className={"budget well"}>
            <div className={"budget__title"}>{props.budget_state.title}</div>
            <div className={"budget__details"}>
                <BudgetAmount budget_state={props.budget_state} toggle_transaction_details={toggleTransactionDetails} show_transaction_details={showTransactionDetails}/>
                <BudgetMetadata budget_state={props.budget_state}/>
            </div>
            {showTransactionDetails && <TransactionList budget_id={props.budget_state.id}/>}
            <StatusBar budget_state={props.budget_state}/>
        </div>
    )
}

function BudgetAmount(props: { budget_state: BudgetState, toggle_transaction_details: MouseEventHandler<HTMLElement>, show_transaction_details: boolean }) {

    const formatted_amount_spent = formatAmount(props.budget_state.amount_spent);
    const formatted_threshold_amount = formatAmount(props.budget_state.amount_current);
    const percentage = props.budget_state.amount_spent == 0 ? 0 :
        Math.floor(props.budget_state.amount_spent / props.budget_state.amount_current * 100);

    return (
        <div className={"budget__spent"}>
            {formatted_amount_spent} / {formatted_threshold_amount}
            <span className={"budget__percentage"}>({percentage}%)</span>
            {props.budget_state.amount_spent != 0 ? (<TransactionExpand onClick={props.toggle_transaction_details} expanded={props.show_transaction_details} />) : null}
        </div>
    )
}

function TransactionExpand(props: { onClick: MouseEventHandler<HTMLElement>, expanded: boolean }) {
    return (
        <span className={"transaction-details__dropdown"} onClick={props.onClick}><FontAwesomeIcon icon={props.expanded ? faChevronDown : faChevronRight}/></span>
    );
}

function TransactionList(props: { budget_id: number }) {

    const navigate = useNavigate();
    const date = useDateContext();

    const { isPending, error, data } = useQuery({
        queryKey: ["transaction", "details", "top", "by-budget", props.budget_id, date.year, date.month],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/transaction/top/by-budget/${props.budget_id}?year=${date.year}&month=${date.month}&limit=10`, {
                method: 'GET',
                headers: {
                    'Auth-Token': localStorage.getItem("Auth-Token")!
                },
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/logout");
                    }

                    return response.json();
                })
                .then(data => data as TransactionDetails[])
    });

    if (isPending) {
        return (<>Loading...</>);
    }

    if (error) {
        return (<>An error has occurred.</>);
    }

    return (
        <div className={"transaction-details__list"}>
            {data.map(transaction => {
                return (<Transaction key={transaction.id} transaction={transaction}/>);
            })}
        </div>
    );
}

function Transaction(props: { transaction: TransactionDetails }) {
    return (
        <div className={"transaction-details"}>
            <span>{props.transaction.user_description ? props.transaction.user_description : props.transaction.bank_description}</span>
            <span className={"transaction-details__amount " + (props.transaction.amount > 0 ? "transaction-details__amount--positive" : "transaction-details__amount--negative")}>
                {formatAmount(Math.abs(props.transaction.amount))}
            </span>
        </div>
    );
}

function BudgetMetadata(props: { budget_state: BudgetState }) {
    return (
        <div className={"budget__metadata"}>
            {!props.budget_state.months_until_maturity ||
                props.budget_state.months_until_maturity == 1 ||
                props.budget_state.amount_total === undefined ?
                (
                    <div>{formatAmount(props.budget_state.amount_monthly)} / month</div>
                ) : (
                    <>
                        <div>{formatAmount(props.budget_state.amount_total)} / {props.budget_state.months_until_maturity} months</div>
                        <div>({formatAmount(props.budget_state.amount_monthly)} / month)</div>
                    </>
                )
            }
        </div>
    )
}

function StatusBar(props: { budget_state: BudgetState }) {

    const amount_total = props.budget_state.amount_total ? props.budget_state.amount_total : props.budget_state.amount_current;

    const spent_percentage = props.budget_state.amount_spent / amount_total * 100;
    const contributed_percentage = props.budget_state.amount_contributed / amount_total * 100;
    const threshold_percentage = props.budget_state.amount_current / amount_total * 100;

    const overspent_percentage = Math.max(spent_percentage - threshold_percentage, 0);
    const overcontributed_percentage = Math.max(contributed_percentage - threshold_percentage, 0);

    const bar_width = Math.max(spent_percentage, contributed_percentage, 100);

    const spent_portion = Math.min(spent_percentage, threshold_percentage);
    const contributed_portion = Math.max(Math.min(contributed_percentage, threshold_percentage) - spent_portion, 0);
    const overspent_overcontributed_portion = Math.min(overspent_percentage, overcontributed_percentage);
    const overspent_portion = Math.max(overspent_percentage - overspent_overcontributed_portion, 0);
    const overcontributed_portion = Math.max(overcontributed_percentage - overspent_overcontributed_portion, 0);

    const total_under_threshold_portion = spent_portion + contributed_portion;
    const total_over_threshold_portion = overspent_overcontributed_portion + overspent_portion + overcontributed_portion;
    const unused_portion = Math.max(threshold_percentage - total_under_threshold_portion, 0);
    const non_applicable_portion = Math.max(bar_width - threshold_percentage - total_over_threshold_portion, 0);

    const spent_width = spent_portion / bar_width * 100;
    const contributed_width = contributed_portion / bar_width * 100;
    const overspent_overcontributed_width = overspent_overcontributed_portion / bar_width * 100;
    const overspent_width = overspent_portion / bar_width * 100;
    const overcontributed_width = overcontributed_portion / bar_width * 100;
    const unused_width = unused_portion / bar_width * 100;
    const non_applicable_width = non_applicable_portion / bar_width * 100;

    return (
        <div className={"budget__bar"}>
            <StatusBarSegment modifier={"spent"} width_percentage={spent_width}/>
            <StatusBarSegment modifier={"contributed"} width_percentage={contributed_width}/>
            <StatusBarSegment modifier={"unused"} width_percentage={unused_width}/>
            <StatusBarSegment modifier={"overspent-overcontributed"} width_percentage={overspent_overcontributed_width}/>
            <StatusBarSegment modifier={"overspent"} width_percentage={overspent_width}/>
            <StatusBarSegment modifier={"overcontributed"} width_percentage={overcontributed_width}/>
            <StatusBarSegment modifier={"non-applicable"} width_percentage={non_applicable_width}/>
        </div>
    );
}

function StatusBarSegment(props: { modifier: string, width_percentage: number }) {
    return (
        <div className={"budget__bar-segment budget__bar-segment--" + props.modifier} style={{width: props.width_percentage + "%" }}></div>
    )
}