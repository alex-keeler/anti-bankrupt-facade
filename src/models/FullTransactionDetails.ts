import {BudgetTransactionMappingDetails} from "./BudgetTransactionMappingDetails.ts";
import {TransactionDetails} from "./TransactionDetails.ts";

export type FullTransactionDetails = {
    transaction: TransactionDetails,
    budget_mappings: BudgetTransactionMappingDetails[]
};