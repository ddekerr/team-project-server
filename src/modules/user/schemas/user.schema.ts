import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'modules/auth/types';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

type PersonalAddress = {
  street: string;
  house: string;
  apartament?: number;
};

export type Address = {
  city: string;
  postalOperator?: string;
  postalDepartment?: string;
  personalAddress?: PersonalAddress;
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
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  b_day: Date;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({ required: false })
  @Prop({
    type: {
      city: String,
      postalOperator: { type: String, required: false, _id: false },
      postalDepartment: { type: String, required: false, _id: false },
      personalAddress: {
        type: {
          street: String,
          house: String,
          apartament: { type: Number, required: false },
        },
        required: false,
        _id: false,
      },
    },
    required: false,
    _id: false,
  })
  address?: Address;

  @ApiProperty()
  @Prop({ required: true, default: [Role.USER] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
