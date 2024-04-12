interface Address {
    city: string;
    address: string;
  }

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly phone_number: string;
    readonly addresses: Address[];
    readonly created_at: Date;
    readonly updated_at: Date;
}


