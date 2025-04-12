export type TransactionDetails = {
    id: number,
    date: Date,
    bank_description: string | undefined,
    user_description: string | undefined,
    comment: string | undefined,
    amount: number,
    bank_account_title: string
};