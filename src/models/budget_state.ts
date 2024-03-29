type BudgetState = {
    id: number,
    title: string,
    classification: BudgetClassification,
    spending_type: SpendingType,
    cycle_start_date: Date,
    months_until_maturity: number | undefined,
    amount_monthly: number,
    amount_current: number
    amount_total: number | undefined,
    amount_spent: number,
    amount_spent_this_month: number,
    amount_contributed: number,
    amount_contributed_this_month: number,
};