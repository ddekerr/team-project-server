import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';

import * as dotenv from 'dotenv';
dotenv.config(); 

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN
    })
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
