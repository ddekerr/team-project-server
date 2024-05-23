import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
// import { HttpExceptionFilter } from 'filter/exception.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = +process.env.PORT || 5000;

  // init application
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  // setup swagger
  const config = new DocumentBuilder().setTitle('Docs').setVersion('0.0.1').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  // run server
  await app.listen(PORT, () => console.log(`Server starts on ${PORT} port`));
}

// entry point
start();
