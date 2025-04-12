export const formatAmount = (amount: number): string => {
    if (amount >= 0) {
        return "$" + (amount / 100).toFixed(2);
    } else {
        return "-$" + (-amount / 100).toFixed(2);
    }
}