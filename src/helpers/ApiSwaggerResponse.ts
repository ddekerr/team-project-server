import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  getSchemaPath,
  ApiResponse as SwaggerResponse,
} from '@nestjs/swagger';
import { ApiResponse } from './ApiResponse';

export const ApiSwaggerResponse = <TModel extends Type<any>>(
  status: number,
  model: TModel,
  description?: string,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    SwaggerResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
      description,
    }),
  );
};
