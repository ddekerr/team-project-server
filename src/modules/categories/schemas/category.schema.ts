import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ minlength: 3, maxlength: 64, type: String })
  title: string;

  @Prop({ unique: true, required: true, type: String })
  slug: string;

  @Prop({ required: false, type: String, default: null })
  icon?: string;

  @Prop({ required: false, type: String, default: null })
  parent?: string;

  @Prop({ default: [], required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  children?: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
