import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 64 })
  title: string;

  @Prop({ unique: true, required: true, type: String })
  slug: string;

  @Prop({ required: false, type: String, default: null })
  icon?: string;

  @Prop({ required: false, type: String, default: null })
  parent?: string;

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], default: [] })
  children?: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
