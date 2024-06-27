import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import telegramBotMessage from 'constants/telegramBotMessage';

@Injectable()
export class TelegramBotService {
  private readonly groupSupportId: string;

  constructor(@InjectBot() private readonly bot: Telegraf) {
    this.groupSupportId = process.env.TELEGRAM_GROUP_CHAT_ID;
    this.initializeBot();
  }

  private initializeBot() {
    this.bot.start((ctx: Context) => {
      ctx.reply(telegramBotMessage.START);
    });

    this.bot.on('message', async (ctx) => {
      if (ctx.message.chat.type === 'private') {
        const chatId = ctx.message.chat.id;
        await this.forwardMessageToGroup(chatId, ctx.message.message_id);
      } else if (ctx.message.chat.type === 'supergroup') {
        const replyToMessage = (ctx.message as any).reply_to_message.forward_from.id;
        if (replyToMessage) {
          // Перевірка чи це Reply Message від бота
          const chatUserId = (ctx.message as any).reply_to_message.forward_from.id;
          const message = (ctx.message as any).text;
          await this.handleGroupReply(chatUserId, message);
        }
      }
    });
  }

  private async forwardMessageToGroup(chatId: number, messageId: number) {
    await this.bot.telegram.forwardMessage(this.groupSupportId, chatId, messageId);
  }

  private async handleGroupReply(chatIdUser: number, message: string) {
    await this.bot.telegram.sendMessage(chatIdUser, message);
  }
}
