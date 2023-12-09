import { ApiProperty } from '@nestjs/swagger';

export class ApiError {
  @ApiProperty()
  public status: number;

  @ApiProperty()
  public message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
