import { ApiPropertyOptions } from '@nestjs/swagger';
import { SORING } from '@svkm/resources/const';

export const SWAGGER_FILTER_NAME: ApiPropertyOptions = {
  name: 'name',
  description: 'Name of category | Имя категории',
  type: String,
  required: true,
  example: 'Name | Имя',
};

export const SWAGGER_FILTER_DESCRIPTION: ApiPropertyOptions = {
  name: 'description',
  description: 'Description of the category | Описание категории',
  type: String,
  required: false,
  example: 'Description | Описание',
};

export const SWAGGER_FILTER_ACTIVE: ApiPropertyOptions = {
  name: 'active',
  description: 'Is active? | Статус каталога',
  type: Boolean,
  required: false,
  example: 'true | false',
};

export const SWAGGER_SEARCH_NAME: ApiPropertyOptions = {
  name: 'search',
  description:
    'Поиск осуществляется по полю name и(ли) description с приоритетом к полю search',
  type: String,
  required: false,
  example: 'Name | Имя',
};

export const SWAGGER_FILTER_PAGE_SIZE: ApiPropertyOptions = {
  name: 'pageSize',
  description: 'Допустимы только цифры от 1-9 | По умолчанию = 2',
  type: Number,
  required: false,
  example: 2,
  minimum: 0,
  maximum: 9,
};

export const SWAGGER_FILTER_PAGE: ApiPropertyOptions = {
  name: 'page',
  description: 'Номер страницы | Допустимы только цифры',
  type: Number,
  required: false,
  default: 1,
  example: 1,
  minimum: 0,
  maximum: 999999,
};

export const SWAGGER_FILTER_SORT: ApiPropertyOptions = {
  name: 'sort',
  description: 'Тип сортировки: sort=поле ASC | sort=-поле DESC',
  type: String,
  enum: SORING, // TODO enum
  required: false,
  example: `ASC: ${SORING.CREATED_ASC} | DESC: ${SORING.CREATED_DESC}`,
};
