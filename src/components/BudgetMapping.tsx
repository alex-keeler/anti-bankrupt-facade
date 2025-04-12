import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faMoneyBillTransfer, faPiggyBank, faXmark} from "@fortawesome/free-solid-svg-icons";
import {BudgetMappingState} from "../state/BudgetMappingState.ts";
import {useRef, useState} from "react";
import BudgetSelectMenu from "./BudgetSelectMenu.tsx";
import {PopupMenuState} from "../state/PopupMenuState.ts";
import {Budget} from "../models/Budget.ts";
import {TransactionBehavior} from "../models/enum/TransactionBehavior.ts";
import {formatAmount} from "../util/util.ts";
import {TransactionDetails} from "../models/TransactionDetails.ts";

export default function BudgetMapping(props: { state: BudgetMappingState, transaction: TransactionDetails, editing: boolean, numberOfMappings: number, setState: (state: BudgetMappingState) => void }) {
    if (props.state.categorizedState) {
        return (<CategorizedBudgetMapping state={props.state} setState={props.setState} editing={props.editing}/>);
    } else {
        return (<UncategorizedBudgetMapping transaction={props.transaction} numberOfMappings={props.numberOfMappings} setState={props.setState}/>);
    }
}

function CategorizedBudgetMapping(props: { state: BudgetMappingState, setState: (state: BudgetMappingState) => void, editing: boolean }) {

    const amountRef = useRef<HTMLInputElement>(null);

    const categorizedState = props.state.categorizedState!;

    const removeCategorization = () => {
        props.setState({ categorizedState: undefined });
    }

    const updateAmount = () => {
        const state = {...props.state}; // TODO: I'm not sure if copying the object is necessary, but it felt weird to edit the original state object

        const amount = Math.round(amountRef.current!.valueAsNumber * 100);

        state.categorizedState!.amount = amount;

        const currentBehavior = state.categorizedState!.behavior;
        if (amount < 0 && (currentBehavior === TransactionBehavior.Contribution || currentBehavior === TransactionBehavior.Reimbursement)) {
            state.categorizedState!.behavior = TransactionBehavior.Spending;
        } else if (amount > 0 && currentBehavior === TransactionBehavior.Spending) {
            state.categorizedState!.behavior = TransactionBehavior.Contribution;
        }

        props.setState(state);
    }

    const updateBehavior = () => {
        // positive amount: contribution or reimbursement
        // negative amount: spending
        // zero: any

        let newBehavior = categorizedState.behavior;

        switch (categorizedState.behavior) {
            case TransactionBehavior.Spending:
                if (categorizedState.amount >= 0) {
                    newBehavior = TransactionBehavior.Contribution;
                }
                // don't change behavior if amount is negative
                break;
            case TransactionBehavior.Contribution:
                newBehavior = TransactionBehavior.Reimbursement;
                break;
            case TransactionBehavior.Reimbursement:
                if (categorizedState.amount > 0) {
                    newBehavior = TransactionBehavior.Contribution;
                } else {
                    newBehavior = TransactionBehavior.Spending;
                }
                break;
        }

        if (newBehavior !== categorizedState.behavior) {
            const state = {...props.state}; // TODO: I'm not sure if copying the object is necessary, but it felt weird to edit the original state object
            state.categorizedState!.behavior = newBehavior;
            props.setState(state);
        }
    }

    const getBehaviorIcon = (behavior: TransactionBehavior) => {
        switch (behavior) {
            case TransactionBehavior.Spending:
                return <FontAwesomeIcon icon={faCreditCard} title={"Spending"}/>
            case TransactionBehavior.Contribution:
                return <FontAwesomeIcon icon={faPiggyBank} title={"Contribution"}/>
            case TransactionBehavior.Reimbursement:
                return <FontAwesomeIcon icon={faMoneyBillTransfer} title={"Reimbursement"}/>
            default:
                return null;
        }
    }

    return (
        <li className={"budget-mapping"}>
            <div className={`budget-mapping__behavior ${props.editing ? "budget-mapping__behavior--editing" : ""}`} onClick={props.editing ? updateBehavior : () => {}}>
                {getBehaviorIcon(categorizedState.behavior)}
            </div>
            <div className={"budget-mapping__amount"}>
                {props.editing ? (
                    // I can't use onChange because it maps to HTML's oninput event, so I'm using onBlur instead. Whoever made that decision is dead to me :)
                    <>
                        $<input ref={amountRef} type={"number"} step={"0.01"} name={"amount"} defaultValue={categorizedState.amount / 100} onBlur={updateAmount} />
                    </>
                ) : (
                    formatAmount(categorizedState.amount)
                )}

            </div>
            <div className={"budget-mapping__category"}>
                <span>{categorizedState.budget_title}</span>
                <span className={"budget-mapping__remove"} onClick={removeCategorization}><FontAwesomeIcon icon={faXmark}/></span>
            </div>
        </li>
    );
}

function UncategorizedBudgetMapping(props: { transaction: TransactionDetails, numberOfMappings: number, setState: (state: BudgetMappingState) => void }) {

    const [budgetMenuState, setBudgetMenuState] = useState<PopupMenuState>({ triggered: false, position: {} });
    const categoryRef = useRef<HTMLDivElement>(null);

    const categoryOnMouseEnter = () => {
        const boundingBox = categoryRef.current!.getBoundingClientRect();
        setBudgetMenuState({ triggered: true, position: { top: boundingBox.bottom, left: boundingBox.left } });
    };

    const categoryOnMouseLeave = () => {
        setBudgetMenuState((prevState) => ({ triggered: false, position: prevState.position }));
    }

    const chooseBudget = (budget: Budget): void => {

        const onlyMapping = props.numberOfMappings == 1;

        const budgetMappingState: BudgetMappingState = {
            categorizedState: {
                budget_id: budget.id,
                budget_title: budget.title,
                bank_transaction_id: props.transaction.id,
                amount: onlyMapping ? props.transaction.amount : 0.0,
                behavior: onlyMapping && props.transaction.amount > 0 ? TransactionBehavior.Contribution : TransactionBehavior.Spending,
            }
        }
        props.setState(budgetMappingState);
    }

    return (
        <>
            <li className={"budget-mapping budget-mapping--none"}>
                <div className={"budget-mapping__category"}
                     ref={categoryRef}
                     onMouseEnter={categoryOnMouseEnter}
                     onMouseLeave={categoryOnMouseLeave}>
                    <span>Uncategorized</span>
                </div>
            </li>
            <BudgetSelectMenu triggered={budgetMenuState.triggered} position={budgetMenuState.position} onSelection={chooseBudget} />
        </>
    );
}
