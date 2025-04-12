import {FullTransactionDetails} from "../models/FullTransactionDetails.ts";
import "../scss/transaction.scss";
import TransactionBudgetMappings from "./TransactionBudgetMappings.tsx";
import {formatAmount} from "../util/util.ts";

export default function Transaction(props: {fullTransactionDetails: FullTransactionDetails}) {

    const transaction = props.fullTransactionDetails.transaction;
    const budgetMappings = props.fullTransactionDetails.budget_mappings;

    return (
        <li className={"transaction"}>
            <div className={"transaction__date"}>
                {transaction.date.toString()}
            </div>
            <div
                className={"transaction__amount " + (transaction.amount >= 0 ? "transaction__amount--positive" : "transaction__amount--negative")}>
                {formatAmount(transaction.amount)}
            </div>
            <div style={{flex: 1}}>
                <div className={"transaction__user-description"}>
                    <div className={"transaction__user-description--text"}
                         style={{display: "none"}}>{transaction.user_description}</div>
                    <div className={"transaction__user-description--link"} style={{display: "none"}}>Add a title</div>
                    <input className={"transaction__user-description--input"} type={"text"} placeholder={"Title"}
                           style={{display: "none"}}/>
                </div>
                <div className={"transaction__bank-description"}>{transaction.bank_description}</div>
                <div className={"transaction__comment"}> {/* TODO: should I make a component out of this? */}
                    <div className={"transaction__comment--text"}
                         style={{display: "none"}}>{transaction.comment}</div>
                    <div className={"transaction__comment--link"} style={{display: "none"}}>Add a comment</div>
                    <input className={"transaction__comment--input"} type={"text"} placeholder={"Comment"}
                           style={{display: "none"}}/>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <TransactionBudgetMappings transaction={transaction} budgetMappings={budgetMappings}/>
                <div className={"transaction__bank-account"}>{transaction.bank_account_title}</div>
            </div>
        </li>
    );
}