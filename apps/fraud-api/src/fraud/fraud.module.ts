import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FraudController } from './controllers/fraud.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ClientsModule.register([
            {
                name: 'FRAUD_EVENT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: [process.env.KAFKA_BROKER],
                    },
                    consumer: {
                        groupId: 'fraud-consumer',
                    }
                },
            },
        ]),
    ],
    controllers: [FraudController]
})
export class FraudModule {}
