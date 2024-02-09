import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @ApiProperty({ description: 'Title of category in ukrainian', default: 'Category title' })
  @Prop({ minlength: 3, maxlength: 64 })
  title: string;

  @ApiProperty({
    description: 'Mutated title field in latin without spaces and uppercese characters',
    default: 'category-title',
    uniqueItems: true,
  })
  @Prop({ unique: true, required: true })
  slug: string;

  @ApiProperty({ required: false, type: String, description: 'Parent category', default: '65bb5b57dc3002eb99d080fb' })
  @Prop({ default: null, required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
