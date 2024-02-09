import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: String, format: 'binary' })
  poster: any;
}
