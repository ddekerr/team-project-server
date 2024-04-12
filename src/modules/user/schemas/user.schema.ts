import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface Address {
    city: string;
    address: string;
}

@Schema()
export class User {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password:string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    phone_number: string;

    @Prop({ type: [{ city: String, address: String }] })
    addresses: Address[];

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

}

export const UserSchema = SchemaFactory.createForClass(User)