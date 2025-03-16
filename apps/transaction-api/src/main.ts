import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { SwaggerConfigModule } from './transaction/infrastructure/docs/swagger.module';
import { TransactionModule } from './transaction/transaction.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'transaction-consumer',
      },
    },
  });
  const port = 3000;

  await app.startAllMicroservices();
  SwaggerConfigModule.configure(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
