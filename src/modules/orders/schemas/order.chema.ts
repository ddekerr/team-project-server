import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'modules/products/schemas/product.schema';
import { Address } from 'modules/user/schemas/user.schema';
import { Document } from 'mongoose';
import { OrderedProducts } from '../types';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @ApiProperty({ uniqueItems: true, description: 'Unique code of order' })
  @Prop({ unique: true })
  order_code: string;

  @ApiProperty({ description: 'Customer`s email' })
  @Prop()
  customer_email: string;

  @ApiProperty({ description: 'List and quantity of acquired products' })
  @Prop({ type: [{ type: { product: Product, quantity: Number } }] })
  products: OrderedProducts[];

  @ApiProperty({ description: 'Total amount to be paid' })
  @Prop({ type: Number })
  total: number;

  @ApiProperty({ description: 'The address where the order will be delivered' })
  @Prop({ type: { city: String, street: String, house: String, apartment: Number } })
  delivery_address: Address;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
