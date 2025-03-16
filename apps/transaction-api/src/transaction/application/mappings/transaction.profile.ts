import { createMap, Mapper, MappingProfile, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { TransactionTypeEnum } from '@transaction-system/shared';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateTransactionDto, CreateTransactionCommand,
        forMember(
          (dest) => dest.transferTypeId,  
          mapFrom((src) => Number(src.transferTypeId))
        ));
      createMap(mapper, CreateTransactionCommand, Transaction);
      createMap(mapper, Transaction, TransactionDto,
        forMember((dest) => dest.transactionExternalId,
          mapFrom((src) => src._id.toHexString())
        ),
        forMember((dest) => dest.transactionStatus,
          mapFrom((src) => ({ name: src.status }))
        ),
        forMember((dest) => dest.transactionType,
          mapFrom((src) => ({ name: src.transferTypeId == TransactionTypeEnum.BANK_TRANSFER ? 'Transferencia Bancaria' : 'Otro tipo' }))
        ),
        forMember((dest) => dest.createdAt,
          mapFrom((src) => src.createdAt.toISOString())
        )
      );
    };
  }
}
