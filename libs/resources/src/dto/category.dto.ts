import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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
import { Model } from 'mongoose';

export class CategoryDto {
  @ApiProperty(SWAGGER_CATEGORY_ID)
  id?: string;

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

  // TODO add more default?
  @ApiProperty(SWAGGER_CATEGORY_ACTIVE)
  @IsBoolean()
  active: boolean;

  @ApiProperty(SWAGGER_CATEGORY_CREATED_AT)
  createdAt?: Date;

  public static fromDocument(document: Category): CategoryDto {
    const id = document._id.toString();
    return Object.assign(new CategoryDto(), {
      id,
      slug: document.slug,
      name: document.name,
      description: document.description,
      active: document.active,
      createdAt: document.createdAt,
    });
  }

  public static fromDto(
    document: CategoryDto,
    categoryModel: Model<Category>,
  ): Category {
    return new categoryModel({
      slug: document.slug,
      name: document.name,
      description: document.description,
      active: document.active,
      createdAt: document.createdAt,
    });
  }
}
