import {TransactionBehavior} from "./enum/TransactionBehavior.ts";

export type BudgetTransactionMappingDetails = {
    id: number,
    bank_transaction_id: number,
    budget_id: number,
    budget_title: string,
    amount: number,
    behavior: TransactionBehavior,
}