import { ApiProperty } from '@nestjs/swagger';
import { ApiError } from './ApiError';
import { ValidationError } from 'types';

export class ApiValidationError extends ApiError {
  @ApiProperty({ type: { errorField: [String] } })
  public errors: ValidationError[];

  constructor(status: number, message: string, errors: ValidationError[]) {
    super(status, message);

    this.errors = errors;
  }
}
