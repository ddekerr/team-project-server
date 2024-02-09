import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, getSchemaPath, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ApiResponse } from './ApiResponse';
import { Actions, EntityType } from 'types';
import apiMessages from 'constants/apiMessages';

export const ApiSwaggerArrayResponse = <TModel extends Type<any>>(
  action: Actions,
  entityType: EntityType,
  model: TModel,
) => {
  const status: 200 | 201 = action === Actions.CREATE ? 201 : 200;
  const description: string = apiMessages[`${entityType}_${action}_DESCRIPTION`];

  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    SwaggerResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: { type: 'array', items: { $ref: getSchemaPath(model) } },
            },
          },
        ],
      },
      description,
    }),
  );
};
