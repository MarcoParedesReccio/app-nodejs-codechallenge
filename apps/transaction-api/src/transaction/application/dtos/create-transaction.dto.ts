import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { TransactionTypeEnum } from "@transaction-system/shared";

export class CreateTransactionDto {

  @ApiProperty({
    description: 'ID externo de la cuenta que realiza el débito',
    example: 'acc-123456',
  })
  @IsString()
  @AutoMap()
  accountExternalIdDebit: string;


  @ApiProperty({
    description: 'ID externo de la cuenta que recibe el crédito',
    example: 'acc-654321',
  })
  @IsString()
  @AutoMap()
  accountExternalIdCredit: string;

  @ApiProperty({
    description: 'Tipo de transferencia (ejemplo: 1 para transferencia bancaria)',
    example: 1,
  })
  @AutoMap()
  @IsEnum(TransactionTypeEnum, { 
    message: (args) => {
      const validValues = Object.values(TransactionTypeEnum)
        .filter(value => typeof value === 'number')
        .join(', ');
      return `El tipo de transacción debe ser uno de los siguientes valores: ${validValues}`;
    }
  })
  transferTypeId: TransactionTypeEnum;


  @ApiProperty({
    description: 'Monto de la transacción (debe ser mayor a 0)',
    example: 100,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @AutoMap()
  value: number;
}
