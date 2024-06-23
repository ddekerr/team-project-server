import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class Rating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

class Characteristics {
  name: string;
  description: string[];
}

export class ImageProduct {
  imageId: number; // Не id,щоб не заплутатись
  url: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ required: false, nullable: true })
  @Prop({ required: false, default: null })
  poster?: string;

  @ApiProperty({ required: false, default: true })
  @Prop({ required: false, default: true })
  inStock: boolean;

  @ApiProperty({ type: Rating })
  @Prop({
    _id: false,
    type: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
    default: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    required: true,
  })
  rating: Rating;

  @ApiProperty({ type: [String], description: 'Categories list of product' })
  @Prop({ type: [String], default: [] })
  categories: string[];

  @ApiProperty({ type: [Characteristics] })
  @Prop({ required: true, default: [], type: [Characteristics] })
  characteristics: Characteristics[];

  @ApiProperty({ type: [ImageProduct] })
  @Prop({ required: true, default: [], type: [ImageProduct] })
  images: ImageProduct[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
