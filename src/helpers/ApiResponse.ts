import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  status: number;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  message?: string;

  constructor(status: number, data?: T, message?: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
