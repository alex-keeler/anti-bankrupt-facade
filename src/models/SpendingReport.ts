import {BudgetClassificationSpendingReport} from "./BudgetClassificationSpendingReport.ts";

export type SpendingReport = {
    total_spent: number,
    total_spent_unbudgeted: number,
    budget_classifications: BudgetClassificationSpendingReport[],
}