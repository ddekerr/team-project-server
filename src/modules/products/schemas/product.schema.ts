import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'modules/categories/schemas/category.schema';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

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

  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, description: 'Categories list of product' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
