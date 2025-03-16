import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TransactionStatusDto {
    @ApiProperty({
      description: 'Estado de la transacción',
      example: 'Approved',
    })
    @IsString()
    @AutoMap()
    name: string;
}