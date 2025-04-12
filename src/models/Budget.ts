import {SpendingType} from "./enum/SpendingType.ts";
import {BudgetClassification} from "./enum/BudgetClassification.ts";

export type Budget = {
    id: number,
    title: string,
    classification: BudgetClassification,
    spending_type: SpendingType,
    user_id: number,
    sort_order: number,
    cumulative: boolean,
    hidden: boolean,
}