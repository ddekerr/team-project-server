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
  email: string;
  userId?: unknown;
};

export type UserResponse = {
  user: UserDocument;
  token: Token;
};

export type UserResponseWithRefresh = {
  userResponse: UserResponse;
  refreshToken: Token;
};

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}
