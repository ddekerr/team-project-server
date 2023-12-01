import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  // init application
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Docs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // run server
  await app.listen(PORT, () => console.log(`Server starts on ${PORT} port`));
}

// entry point
bootstrap();
