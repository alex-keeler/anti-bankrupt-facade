import {TransactionBehavior} from "./enum/TransactionBehavior.ts";

export type BudgetTransactionMapping = {
    id?: number,
    budget_id: number,
    bank_transaction_id: number,
    amount: number,
    behavior: TransactionBehavior,
}