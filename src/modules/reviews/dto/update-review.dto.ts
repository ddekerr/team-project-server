import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateRewievDto extends PartialType(
  PickType(CreateReviewDto, ['advantages', 'disadvantages', 'comment'] as const),
) {}
