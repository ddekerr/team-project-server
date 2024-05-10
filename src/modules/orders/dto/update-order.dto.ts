import { PartialType, OmitType, PickType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

//export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ['totalPrice'] as const)) {}

// export class UpdateOrderDto extends PartialType(
//   PickType(CreateOrderDto, ['totalPrice'] as const),
// ) {}
