import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'modules/categories/schemas/category.schema';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

type Rating = { 1: number; 2: number; 3: number; 4: number; 5: number };

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  poster?: string;

  @ApiProperty({ default: true })
  @Prop({ default: true })
  inStock: boolean;

  @ApiProperty({
    description: 'Product rating',
    type: 'object',
    items: {
      type: 'number',
      default: 0,
    },
  })
  @Prop({
    type: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
  })
  rating: Rating;

  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, description: 'Categories list of product' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
