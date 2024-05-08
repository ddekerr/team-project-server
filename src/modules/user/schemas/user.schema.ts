import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type Address = {
  city: string;
  street: string;
  house: string;
  apartment: number;
};

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({ required: false })
  @Prop({ required: false })
  first_name: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  last_name: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  phone_number: string;

  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  b_day: Date;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({ required: false })
  @Prop({ type: { city: String, street: String, house: String, apartment: Number } })
  addresses: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
