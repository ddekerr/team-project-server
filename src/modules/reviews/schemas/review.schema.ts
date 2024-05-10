import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'modules/products/schemas/product.schema';
import { User } from 'modules/user/schemas/user.schema';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, versionKey: false })
export class Review {
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String })
  advantages: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, type: String })
  disadvantages: string;

  @ApiProperty({ required: false, nullable: true })
  @Prop({ required: false, default: null })
  comment?: string;

  @ApiProperty({ required: true, type: User })
  @Prop({ required: true, type: User })
  user: User;

  @ApiProperty({ required: true })
  @Prop({ required: true, type: Product })
  product: Product & { id: number };
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
