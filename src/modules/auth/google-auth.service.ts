import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AuthService } from './auth.service';
import { UsersService } from 'modules/user/users.service';

import exceptionMessages from 'constants/exceptionMessages';
import { UserResponseWithRefresh } from './types';

@Injectable()
export class GoogleAuthService {
  constructor(
    private axios: HttpService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // #################### GOOGLE AUTH ####################
  // Returns the user if he is in the database or register a new one via Google
  async googleAuth(googleAccessToken: string): Promise<UserResponseWithRefresh> {
    // get the email from google access token
    const email = await this.verifyGoogleAccessToken(googleAccessToken);

    // get user by email
    const user = await this.usersService.getUserWithoutChecking(email);

    // check user exist end return it
    if (user) {
      return await this.authService.generateResponse(user);
    }

    // if user doesnt exist create new user and return it
    const newUser = await this.usersService.createUser({ email, password: 'Google auth' });
    return await this.authService.generateResponse(newUser);
  }

  // #################### VERIFY GOOGLE ACCESS TOKEN ####################
  // Checks the correctness of the Google Token
  private async verifyGoogleAccessToken(accessToken: string): Promise<string> {
    try {
      const response = await this.axios
        .get(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`)
        .toPromise();
      return response.data.email;
    } catch (err) {
      throw new InternalServerErrorException(exceptionMessages.GOOGLE_ERROR_MSG);
    }
  }
}
