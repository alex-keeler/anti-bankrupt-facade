import {BudgetClassification} from "./enum/BudgetClassification.ts";
import {Budget} from "./Budget.ts";

export type BudgetsByClassification = {
    classification: BudgetClassification,
    budgets: Budget[],
}