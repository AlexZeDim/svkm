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
    const isBySearch = Boolean(filterDto.search);

    let searchFilter: FilterQuery<Category>;

    if (isBySearch) {
      searchFilter = {
        $text: { $search: filterDto.search },
      };
    }

    const filterOr = [];
    if (!isBySearch) {
      if (filterDto.name) {
        filterOr.push({ name: { $search: filterDto.name } });
      }

      if (filterDto.description) {
        filterOr.push({ description: { $search: filterDto.description } });
      }

      searchFilter = {
        $or: filterOr,
      };
    }

    const isByActive = 'active' in filterDto;
    const isByActiveOnly = filterOr.length === 0;

    if (isByActiveOnly && isByActive) {
      searchFilter = { active: filterDto.active };
    }

    if (isBySearch && isByActive) {
      searchFilter = {
        $and: [
          {
            $or: filterOr,
          },
          { active: filterDto.active },
        ],
      };
    }

    if (isBySearch) {
      searchFilter = {
        $or: filterOr,
      };
    }

    return searchFilter;
  }
}
