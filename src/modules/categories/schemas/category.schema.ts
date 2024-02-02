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
    uniqueItems: true,
    default: 'category-title',
  })
  @Prop({ unique: true, required: true })
  slug: string;

  @ApiProperty({ default: 1, required: false, type: mongoose.Schema.Types.ObjectId, description: 'Parent category' })
  @Prop({ default: null, required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: string;

  @ApiProperty({ required: false, type: [mongoose.Schema.Types.ObjectId] })
  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  childrens?: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
