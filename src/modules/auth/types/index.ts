import { UserDocument } from 'modules/user/schemas/user.schema';

export type Token = string;

export type Tokens = {
  accessToken: Token;
  refreshToken: Token;
};

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export type Payload = {
  email:string;
  userId: string;
};

export type UserResponse = {
  user: UserDocument;
  tokens: string;
};
