import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Wish List')
    .setDescription('Wish List API Description')
    .setVersion('1.0')
    .addTag('wish list')

    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  app.enableCors({
    origin: [
      'http://127.0.0.1:3006',
      'http://localhost:3006',
      'http://127.0.0.1:3007',
      'http://localhost:3007',
      'http://193.162.143.177:3006',
      'http://193.162.143.177:3007',
      // 'http://127.0.0.1:',
      // 'http://127.0.0.1:',
    ],
  });

  await app.listen(3008);
}
bootstrap();
