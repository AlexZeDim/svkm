import { ApiProperty } from '@nestjs/swagger';
import {
  SWAGGER_FILTER_ACTIVE,
  SWAGGER_FILTER_DESCRIPTION,
  SWAGGER_FILTER_NAME,
  SWAGGER_FILTER_PAGE,
  SWAGGER_FILTER_PAGE_SIZE,
  SWAGGER_FILTER_SORT,
  SWAGGER_SEARCH_NAME,
} from '@svkm/resources/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SORING } from '@svkm/resources/const';

export class FilterDto {
  @ApiProperty(SWAGGER_FILTER_NAME)
  @IsString()
  name: string;

  @ApiProperty(SWAGGER_FILTER_DESCRIPTION)
  @IsString()
  description: string;

  @ApiProperty(SWAGGER_FILTER_ACTIVE)
  @Transform(({ value: active }) => Boolean(active))
  active: boolean | number;

  @ApiProperty(SWAGGER_SEARCH_NAME)
  @IsString()
  search: string;

  @ApiProperty(SWAGGER_FILTER_PAGE_SIZE)
  @IsInt()
  @Min(0)
  @Max(9)
  pageSize: number;

  @ApiProperty(SWAGGER_FILTER_PAGE)
  @IsInt()
  @Min(0)
  @Max(999999)
  page: number;

  @ApiProperty(SWAGGER_FILTER_SORT)
  @IsEnum(SORING)
  sort: string;
}
