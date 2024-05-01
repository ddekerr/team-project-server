import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './cron.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronController],
})
export class CronModule {}
