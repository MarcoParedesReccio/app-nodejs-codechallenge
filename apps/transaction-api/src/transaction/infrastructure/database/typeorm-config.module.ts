import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mongodb',
        url: process.env.MONGO_URI,
        entities: [Transaction],
        synchronize: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
