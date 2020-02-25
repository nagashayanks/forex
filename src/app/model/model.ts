
export interface CurrentUser {
    userId: number;
    userName: string;
}

export interface TransactionSummary {
    transactionId: number;
    sourceAccountNumber: number;
    destinationAccountNumber: number;
    transactionAmount: number;
    transactionType: string;
    transactionDate: string;
    availableBalance: number;
}
