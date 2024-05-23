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

  @ApiProperty({ required: false, type: User })
  @Prop({ required: false, type: User, ref: 'user' })
  user: User;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Product, ref: 'product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
