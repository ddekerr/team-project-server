import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ValidationError } from 'src/types';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages: ValidationError[] = errors.map((e) => {
        // return `${e.property}: ${Object.values(e.constraints).join(', ')}`;
        return {
          [e.property]: Object.values(e.constraints),
        };
      });

      throw new ValidationException(messages);
    }

    return value;
  }
}
