import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tokens_ extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({required: true })
  exp: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Tokens_);
