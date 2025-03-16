import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, Min, IsObject, IsISO8601 } from 'class-validator';
import { TransactionStatusDto } from './transaction-status.dto';
import { TransactionTypeDto } from './transaction-type.dto';

export class TransactionDto {
  @ApiProperty({
    description: 'ID de la transacción',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @AutoMap()
  transactionExternalId: string;

  @ApiProperty({
    description: 'Tipo de transacción',
    type: TransactionTypeDto,
  })
  @IsObject()
  @Type(() => TransactionTypeDto)
  @AutoMap(() => TransactionTypeDto)
  transactionType: TransactionTypeDto;

  @ApiProperty({
    description: 'Estado de la transacción',
    type: TransactionStatusDto,
  })
  @IsObject()
  @Type(() => TransactionStatusDto)
  @AutoMap(() => TransactionStatusDto)
  transactionStatus: TransactionStatusDto;


  @ApiProperty({
    description: 'Valor de la transacción',
    example: 120,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @AutoMap()
  value: number;

  @ApiProperty({
    description: 'Fecha de creación de la transacción',
    example: '2024-03-13T12:34:56.789Z',
  })
  @IsISO8601()
  @AutoMap()
  createdAt: string;
}
