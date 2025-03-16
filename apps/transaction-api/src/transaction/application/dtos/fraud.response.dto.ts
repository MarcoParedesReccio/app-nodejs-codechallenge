import { TransactionStatusEnum } from "@transaction-system/shared";

export class FraudResponseDTO {
    transactionExternalId: string;
    status: TransactionStatusEnum;
}