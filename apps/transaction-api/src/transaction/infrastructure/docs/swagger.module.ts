import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static configure(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Transaction API')
      .setDescription('API transactions')
      .setVersion('1.0')
      .addTag('Transactions')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
