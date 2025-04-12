import {TransactionBehavior} from "./enum/TransactionBehavior.ts";

export type CategorizedBudgetMappingState = {
    id?: number,
    budget_id: number,
    bank_transaction_id: number,
    budget_title: string,
    amount: number,
    behavior: TransactionBehavior,
}