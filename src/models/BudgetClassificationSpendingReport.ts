import {BudgetSpendingReport} from "./BudgetSpendingReport.ts";
import {BudgetClassification} from "./enum/BudgetClassification.ts";

export type BudgetClassificationSpendingReport = {
    classification: BudgetClassification,
    total_spent: number,
    budgets: BudgetSpendingReport[],
}