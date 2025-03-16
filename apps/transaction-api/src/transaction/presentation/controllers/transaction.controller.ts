import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionCommand } from '../../application/commands/create-transaction.command';
import { UpdateTransactionStatusCommand } from '../../application/commands/update-transaction-status.command';
import { CreateTransactionDto } from '../../application/dtos/create-transaction.dto';
import { FraudResponseDTO } from '../../application/dtos/fraud.response.dto';
import { TransactionDto } from '../../application/dtos/transaction.dto';
import { GetTransactionQuery } from '../../application/queries/get-transaction.query';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {

    constructor(private readonly commandBus: CommandBus, 
        private readonly queryBus: QueryBus,
        @InjectMapper() private readonly mapper: Mapper) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get transaction by ID' })
    @ApiResponse({ status: 200, description: 'Transaction retrieved', type: TransactionDto })
    async get(@Param('id') id: string) {
        return this.queryBus.execute(new GetTransactionQuery(id));
    }

    @Post()
    @ApiOperation({ summary: 'Create transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created', type: TransactionDto })
    async create(@Body() request: CreateTransactionDto) {
        const command = this.mapper.map(request, CreateTransactionDto, CreateTransactionCommand);
        return this.commandBus.execute(command);
    }

    @MessagePattern('update_transaction_status')
    async updateTransactionStatus(@Payload() dto: FraudResponseDTO): Promise<void> {
        const command = new UpdateTransactionStatusCommand(dto.transactionExternalId, dto.status);
        await this.commandBus.execute(command); 
    }
}
