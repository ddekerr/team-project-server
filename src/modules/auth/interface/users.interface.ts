import { Document } from "mongoose";

export interface IUsers extends Document {

    readonly email: string;
   
    readonly first_name:string;

    readonly last_name:string;

    readonly password:string;

    readonly phone_number:string;

    readonly address:string;
}
