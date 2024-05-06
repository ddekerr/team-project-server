import { Controller, Res } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Response } from 'express';

@Controller('cron')
export class CronController {
  // @Cron('0 */15 * * * *') // Every 15 minutes
  // handleCron(@Res() response: Response) {
  // response.status(200).json({ message: 'Server live!' });
  // }
}
