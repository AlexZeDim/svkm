import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Category } from '@svkm/db-storage';
import {
  SWAGGER_CATEGORY_ACTIVE,
  SWAGGER_CATEGORY_CREATED_AT,
  SWAGGER_CATEGORY_DESCRIPTION,
  SWAGGER_CATEGORY_ID,
  SWAGGER_CATEGORY_NAME,
  SWAGGER_CATEGORY_SLUG,
  toSlug,
} from '@svkm/resources';

export class CategoryDto {
  @ApiProperty(SWAGGER_CATEGORY_ID)
  @IsNotEmpty({ message: 'ID is required | ID обязательно!' })
  @IsString()
  id: string;

  @ApiProperty(SWAGGER_CATEGORY_SLUG)
  @IsNotEmpty({ message: 'Slug is required | Slug обязателен!' })
  @IsString()
  @Transform(({ value: slug }) => toSlug(slug))
  slug: string;

  @ApiProperty(SWAGGER_CATEGORY_NAME)
  @IsNotEmpty({ message: 'Необходимо указать name | название категории!' })
  @IsString()
  name: string;

  @ApiProperty(SWAGGER_CATEGORY_DESCRIPTION)
  @IsString()
  description: string;

  // TODO add more
  @ApiProperty(SWAGGER_CATEGORY_ACTIVE)
  active: boolean;

  @ApiProperty(SWAGGER_CATEGORY_CREATED_AT)
  createdAt: Date;

  fromDocument(document: Category): CategoryDto {
    // TODO
    return Object.assign(this, document);
  }
}
