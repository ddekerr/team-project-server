import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Address } from 'modules/user/schemas/user.schema';
import { Recepient, OrderedProduct } from '../types';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order {

  @ApiProperty({ description: 'Email adres' })
  @Prop({ type: String })
  email:string;

  @ApiProperty({ uniqueItems: true, required: true, description: 'Unique code of order' })
  @Prop({ type: String, unique: true, required: true })
  orderCode: string;

  @ApiProperty({ description: 'The current status of the order' })
  @Prop({ type: String })
  orderStatus: string;

  @ApiProperty({ description: 'The date when the order is created' })
  @Prop({ type: Date })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The date when the order is confirmed (after payment) and submitted for delivery',
  })
  @Prop({ type: Date, default: null })
  executionAt: Date;

  @ApiProperty({ description: 'Total amount to be paid' })
  @Prop({ type: Number })
  totalPrice: number;

  @ApiProperty({ description: 'Customer`s phone' })
  @Prop()
  customerPhone: string;

  @ApiProperty({ description: 'Payment status' })
  @Prop({ type: String })
  paymentStatus: string;

  @ApiProperty({ description: 'Payment method' })
  @Prop({ type: String })
  paymentMethod: string;

  @ApiProperty({ description: 'List and quantity of acquired products' })
  @Prop({
    _id: false,
    type: [
      {
        _id: false,
        type: {
          title: String,
          price: Number,
          poster: String,
          quantity: Number,
          id: Number,
        },
      },
    ],
  })
  products: OrderedProduct[];

  @ApiProperty({ description: 'The person who will receive the order' })
  @Prop({ _id: false, type: { name: String, phone: String } })
  recepient: Recepient;

  @ApiProperty({ description: 'The address where the order will be delivered' })
  @Prop({
    _id: false,
    type: {
      city: String,
      street: String,
      house: String,
      apartment: Number,
      postalOperator: String,
      postAddress: String,
    },
  })
  deliveryAddress: Address;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// export interface IOrder {
//   orderСode: string; // Унікальний код замовлення
//   orderStatus: string; // статус замволення (оплачено, відправлено, доставлено)
//   createdAt: Date; // дата створення замовлення
//   executionAt: Date; // дата успішного пдтвердження замовлення
//   totalPrice: number; // загальна сума замовлення
//   customerPhome: string; // телефон користувача, (можливо тут буде ID)

//   paymentStatus: string; // статус оплати (підтверджено, відхилено)
//   paymentMethod: string; // Метод оплати (кеш, картка, по частинам)

//   // масив, бо товарів може бути замовлено декілька
//   products: {
//     product: {
//       title: string;
//       price: string;
//       poster: string;
//     };
//     quantity: number; //кількість цих конкретних замовлених товарів
//   }[];

//   // отримувач (може відрізнятися від залогіненого користувача)
//   recipient: {
//     name: string;
//     phone: string;
//   };

//   // адреса доставки (може відрізнятися від адреси залогіненого користувача)
//   deliveryAddress: {
//     city?: string;
//     street?: string;
//     house?: string;
//     apartment?: number;
//   };
// }
