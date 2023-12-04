import { BadRequestException } from '@nestjs/common';
import { validationMessages } from 'src/constants/messages';

export class ValidationException extends BadRequestException {
  public errors: string[];

  constructor(response: string[]) {
    super(validationMessages.VALIDATION_ERROR);

    this.errors = response;
  }
}
