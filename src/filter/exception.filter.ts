import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import validationMessages from 'constants/validationMessage';
import { ValidationException } from 'exceptions/validation.exception';
import { Response } from 'express';
import { ApiError } from 'helpers/ApiError';
import { ApiValidationError } from 'helpers/ApiValidationError';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log(typeof exception);

    // // let err = null;
    // // if (exception instanceof ApiError) {
    // //   err = new ApiValidationError(status, validationMessages.VALIDATION_ERROR, exception.errors);
    // // } else {
    // //   err = new ApiError(status, exception.message);
    // // }

    // response.status(status).json(err);
  }
}
