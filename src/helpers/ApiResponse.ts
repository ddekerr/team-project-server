import { ApiProperty } from '@nestjs/swagger';
import successMessages from 'constants/successMessages';
import { Actions, EntityType } from 'types';

export class ApiResponse<T> {
  @ApiProperty({ enum: [200, 201] })
  private status: number;

  @ApiProperty()
  private data?: T;

  @ApiProperty({ type: String })
  private message?: string;

  constructor(action: Actions, entityType: EntityType, data?: T) {
    this.status = this.setStatus(action);
    this.data = data;
    this.message = this.setMessage(action, entityType);
  }

  private setStatus(action: Actions): 200 | 201 {
    return action === Actions.CREATE ? 201 : 200;
  }

  private setMessage(action: Actions, entityType: EntityType): string {
    if (action !== Actions.GET) {
      return successMessages[`${entityType}_${action}_MSG`];
    }

    return 'OK';
  }

  getdata(): T {
    return this.data;
  }

  getStatus(): number {
    return this.status;
  }

  getMessage(): string {
    return this.message;
  }
}
