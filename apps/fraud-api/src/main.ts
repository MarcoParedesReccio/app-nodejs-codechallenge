import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FraudModule } from './fraud/fraud.module';


async function bootstrap() {
  const app = await NestFactory.create(FraudModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'fraud-consumer',
        allowAutoTopicCreation: true
      },
      subscribe: {
        fromBeginning: true
      }
    },
  });

  const port = 3001;
  await app.startAllMicroservices();
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
