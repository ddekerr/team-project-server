import { BadRequestException } from '@nestjs/common';
import { validationMessages } from 'constants/messages';
import { ValidationError } from 'types';

export class ValidationException extends BadRequestException {
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super(validationMessages.VALIDATION_ERROR);

    this.errors = errors;
  }
}
