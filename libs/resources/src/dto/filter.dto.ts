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
    const pipeline = [];

    const isBySearch =
      Boolean(filterDto.search) ||
      Boolean(filterDto.name) ||
      Boolean(filterDto.description);

    if (isBySearch) {
      const bySearchMatch = {
        $match: {
          $text: {
            $search: filterDto.search
              ? filterDto.search
              : filterDto.name
              ? filterDto.name
              : filterDto.description,
          },
        },
      };

      pipeline.push(bySearchMatch);
    }

    if (filterDto.sort) {
      const isDesc = filterDto.sort.charAt(0) === '-';
      const orderBy = isDesc ? -1 : 1;
      const field = isDesc ? filterDto.sort.substring(1) : filterDto.sort;

      const sort = {
        $sort: { score: { $meta: 'textScore' }, [field]: orderBy },
      };

      pipeline.push(sort);
    }

    const isByActive = 'active' in filterDto;
    if (isByActive) {
      const byActiveMatch = {
        $match: { active: filterDto.active },
      };

      pipeline.push(byActiveMatch);
    }

    if (filterDto.page) {
      const skip = {
        $skip: filterDto.page,
      };

      pipeline.push(skip);
    }

    if (filterDto.pageSize) {
      const limit = {
        $limit: filterDto.pageSize || 2,
      };

      pipeline.push(limit);
    }

    return pipeline;
  }
}
