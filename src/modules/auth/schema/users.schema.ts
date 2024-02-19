import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users{
    @Prop({unique:true})
    email:string;

    @Prop()
    first_name:string;

    @Prop()
    last_name:string;

    @Prop()
    password:string;

    @Prop()
    phone_number:string;

    @Prop()
    address:string;

    @Prop({ default: Date.now })
    created_at: Date;
  
    @Prop({ default: Date.now })
    updated_at: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
