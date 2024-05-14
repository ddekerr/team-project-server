import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import exceptionMessages from 'constants/exceptionMessages';
import { Types } from 'mongoose';

@Injectable()
export class MongooseIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isValidObjectId = Types.ObjectId.isValid(value);
    if (!isValidObjectId) {
      throw new BadRequestException(exceptionMessages.MONGO_INVALID_ID);
    }
    return value;
  }
}
