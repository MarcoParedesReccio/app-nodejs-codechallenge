import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TransactionTypeDto {
    @ApiProperty({
      description: 'Nombre del tipo de transacción',
      example: 'Transferencia bancaria',
    })
    @IsString()
    @AutoMap()
    name: string;
}