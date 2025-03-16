import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionStatusEnum } from '@transaction-system/shared';
import { FraudRequestDTO } from '../dtos/fraud-request.dto';

@Controller('fraud')
export class FraudController {

    constructor(@Inject('FRAUD_EVENT') private readonly kafkaClient: ClientKafka) {}

    @MessagePattern('transaction_created')
    async validateTransaction(@Payload() dto: FraudRequestDTO): Promise<void> {
        const status = dto.value > 1000 ? TransactionStatusEnum.REJECTED : TransactionStatusEnum.APPROVED;

        this.kafkaClient.emit('update_transaction_status', {
            transactionExternalId: dto.transactionExternalId,
            status
        });
    }
}
