import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TransactionProfile } from './transaction.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [TransactionProfile],
  exports: [AutomapperModule, TransactionProfile],
})
export class MappingModule {}
