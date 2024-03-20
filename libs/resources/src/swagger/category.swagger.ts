export const SWAGGER_CATEGORY_ID: ApiPropertyOptions = {
  name: 'id',
  description: 'Id of the category',
  type: String,
  required: true,
  example: '42432afe',
};

export const SWAGGER_CATEGORY_SLUG: ApiPropertyOptions = {
  name: 'slug',
  description: 'Slug-name',
  type: String,
  required: true,
  example: 'slug-name',
};

export const SWAGGER_CATEGORY_NAME: ApiPropertyOptions = {
  name: 'name',
  description: 'Name of category | Имя категории',
  type: String,
  required: true,
  example: 'Name | Имя',
};

export const SWAGGER_CATEGORY_DESCRIPTION: ApiPropertyOptions = {
  name: 'description',
  description: 'Description of the category | Описание категории',
  type: String,
  required: false,
  example: 'Description | Описание',
};

export const SWAGGER_CATEGORY_ACTIVE: ApiPropertyOptions = {
  name: 'active',
  description: 'Is active? | Статус каталога',
  type: Boolean,
  example: 'true | false',
};

export const SWAGGER_CATEGORY_CREATED_AT: ApiPropertyOptions = {
  name: 'createdAt',
  description: 'createdAt | Дата создания',
  type: Date,
  example: new Date(),
};
