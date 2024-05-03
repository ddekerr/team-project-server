import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategory {
  @ApiProperty({ description: 'Title of category in ukrainian', default: 'Category title' })
  readonly title: string;

  @ApiProperty({
    description: 'Mutated title field in latin without spaces and uppercese characters',
    default: 'category-slug',
    uniqueItems: true,
  })
  readonly slug: string;

  @ApiProperty({ required: false, description: "Category's icon id" })
  readonly icon?: string | null;

  @ApiProperty({ required: false, description: "Parent's category slug" })
  readonly parent?: string | null;

  @ApiProperty({ required: false, type: [String], description: 'List of children category slugs' })
  readonly children?: ResponseCategory[] | [];
}

export type Filter = {
  parent?: null | 0 | 'null';
};
