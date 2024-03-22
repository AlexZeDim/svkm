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
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SORING } from '@svkm/resources/const';
import { FilterQuery } from 'mongoose';
import { Category } from '@svkm/db-storage';

export class FilterDto {
  @ApiProperty(SWAGGER_FILTER_NAME)
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty(SWAGGER_FILTER_DESCRIPTION)
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty(SWAGGER_FILTER_ACTIVE)
  @IsOptional()
  @Transform(({ value: active }) => Boolean(active))
  active: boolean | number;

  @ApiProperty(SWAGGER_SEARCH_NAME)
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty(SWAGGER_FILTER_PAGE_SIZE)
  @IsInt()
  @Min(0)
  @Max(9)
  @IsOptional()
  pageSize: number;

  @ApiProperty(SWAGGER_FILTER_PAGE)
  @IsInt()
  @Min(0)
  @Max(999999)
  @IsOptional()
  page: number;

  @ApiProperty(SWAGGER_FILTER_SORT)
  @IsEnum(SORING)
  @IsOptional()
  sort: string;

  public static fromDto(filterDto: Partial<FilterDto>) {
    const filterMap = new Map<string, FilterQuery<Category>>([
      [
        'isBySearch',
        {
          $text: { $search: filterDto.search },
        },
      ],
      [
        'isNameAndDescription',
        {
          $or: [
            { name: { $regex: `/${filterDto.name}/`, $options: 'i' } },
            {
              description: {
                $regex: `/${filterDto.description}/`,
                $options: 'i',
              },
            },
          ],
        },
      ],
      ['isByActiveOnly', { active: filterDto.active }],
      [
        'isByActiveAndName',
        {
          $and: [
            { name: filterDto.active },
            { name: { $regex: `/${filterDto.name}/`, $options: 'i' } },
          ],
        },
      ],
      [
        'isByActiveAndDesc',
        {
          $and: [
            { active: filterDto.active },
            {
              description: {
                $regex: `/${filterDto.description}/`,
                $options: 'i',
              },
            },
          ],
        },
      ],
      ['byDefault', {}],
    ]);

    const isBySearch = Boolean(filterDto.search);
    if (isBySearch) return filterMap.get('isBySearch');
    const isByActive = 'active' in filterDto;
    const isNameAndDescription =
      Boolean(filterDto.name) && Boolean(filterDto.description);
    const isByActiveOnly =
      !isBySearch &&
      !filterDto.name &&
      !filterDto.description &&
      'active' in filterDto;

    if (isByActiveOnly) return filterMap.get('isByActiveOnly');
    if (isNameAndDescription && isByActive)
      return filterMap.get('isNameAndDescription');

    if (isNameAndDescription && !isByActive)
      return filterMap.get('isNameAndDescription');

    return filterMap.get('byDefault');
  }
}
