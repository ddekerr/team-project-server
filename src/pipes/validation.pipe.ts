import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'exceptions/validation.exception';
import { ValidationError } from 'types';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const err = await validate(obj);

    if (err.length) {
      const errors = this.errorResponse(err)

      throw new ValidationException(errors);
    }

    return value;
  }

  private errorResponse(arrErrorValue) {
    const errors = []
    for (let i = 0; i < arrErrorValue.length; i++) {

      const e = arrErrorValue[i]

      let constraints
      if (e.children.length) {
        constraints = this.errorResponse(e.children)
      } else {
        constraints = e.constraints
      }

      errors.push({ [e.property]: constraints })
    }
    return errors
  }
}
