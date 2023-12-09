import { BadRequestException } from '@nestjs/common';
import { validationMessages } from 'src/constants/messages';
import { ValidationError } from 'src/types';

export class ValidationException extends BadRequestException {
  public errors: ValidationError[];

  constructor(response: ValidationError[]) {
    super(validationMessages.VALIDATION_ERROR);

    this.errors = response;
  }
}
