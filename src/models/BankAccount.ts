export type BankAccount = {
    id?: number,
    title: string,
    bank: string, // TODO: use enum?
    account_type: string, // TODO: use enum?
    balance: number,
}