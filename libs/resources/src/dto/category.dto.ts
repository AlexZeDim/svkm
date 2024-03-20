import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@svkm/db-storage';
import {
  SWAGGER_CATEGORY_ACTIVE,
  SWAGGER_CATEGORY_CREATED_AT,
  SWAGGER_CATEGORY_DESCRIPTION,
  SWAGGER_CATEGORY_ID,
  SWAGGER_CATEGORY_NAME,
  SWAGGER_CATEGORY_SLUG,
} from '@svkm/resources';

export class CategoryDto {
  @ApiProperty(SWAGGER_CATEGORY_ID)
  id: string;

  @ApiProperty(SWAGGER_CATEGORY_SLUG)
  slug: string;

  @ApiProperty(SWAGGER_CATEGORY_NAME)
  name: string;

  @ApiProperty(SWAGGER_CATEGORY_DESCRIPTION)
  description: string;

  @ApiProperty(SWAGGER_CATEGORY_ACTIVE)
  active: boolean;

  @ApiProperty(SWAGGER_CATEGORY_CREATED_AT)
  createdAt: Date;

  fromDocument(document: Category): CategoryDto {
    // TODO
    return Object.assign(this, document);
  }
}
