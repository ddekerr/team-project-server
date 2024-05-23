import { applyDecorators, HttpCode } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import exceptionMessages from 'constants/exceptionMessages';
import validationMessage from 'constants/validationMessage';

import { ApiError } from 'helpers/ApiError';
import { ApiSwaggerResponse } from 'helpers/ApiSwaggerResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';

import { CreateUserDto } from 'modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'modules/user/dto/update-user.dto';
import { User } from 'modules/user/schemas/user.schema';

import { Actions, EntityType } from 'types';

export function ApiRegisterUser() {
  return applyDecorators(
    HttpCode(201),
    ApiOperation({ summary: 'Register new user, send the access token and set cookie with refresh token' }),
    ApiBody({ type: CreateUserDto }),
    ApiConflictResponse({ type: ApiError, description: exceptionMessages.CONFLICT_EMAIL_MSG }),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User),
  );
}

export function ApiLoginUser() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Login user, send the access token and set cookie with refresh token' }),
    ApiBody({ type: CreateUserDto }),
    ApiSwaggerResponse(Actions.CREATE, EntityType.USER, User),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG }),
    ApiUnauthorizedResponse({ type: ApiError, description: exceptionMessages.UNAUTHORIZED_PASSWORD_MSG }),
  );
}

export function ApiLogoutUser() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Logout user, clear cookies' }),
    ApiHeader({ name: 'Bearer Token', description: 'Token to route access' }),
    ApiSwaggerResponse(Actions.LOGOUT, EntityType.USER, String),
    ApiUnauthorizedResponse({ description: exceptionMessages.UNAUTHORIZED_TOKEN_VALID_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG }),
  );
}

export function ApiGetMe() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Get the user information, with the access token and set cookie with refresh token' }),
    ApiHeader({ name: 'Bearer Token', description: 'Token to route access' }),
    ApiSwaggerResponse(Actions.GET, EntityType.USER, User),
    ApiUnauthorizedResponse({ description: exceptionMessages.UNAUTHORIZED_TOKEN_VALID_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG }),
  );
}

export function ApiUpdateMe() {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({ summary: 'Update user information, with the access token and set cookie with refresh token' }),
    ApiHeader({ name: 'Bearer Token', description: 'Token to route access' }),
    ApiBody({ type: UpdateUserDto }),
    ApiSwaggerResponse(Actions.UPDATE, EntityType.USER, User),
    ApiBadRequestResponse({ type: ApiValidationError, description: validationMessage.VALIDATION_ERROR }),
    ApiUnauthorizedResponse({ description: exceptionMessages.UNAUTHORIZED_TOKEN_VALID_MSG }),
    ApiNotFoundResponse({ type: ApiError, description: exceptionMessages.NOT_FOUND_USER_MSG }),
  );
}
