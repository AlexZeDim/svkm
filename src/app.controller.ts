import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CategoryBySlug, CategoryDto, FilterDto } from '@svkm/resources';

@Controller('category')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @HttpCode(201)
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.appService.createCategory(categoryDto);
  }

  @Patch('updateCategory/:slug')
  async updateCategory(
    @Param() param: CategoryBySlug,
    @Body() body: Partial<CategoryDto>,
  ) {
    return await this.appService.updateCategory(param.slug, body);
  }

  @Delete(':slugOrId')
  async deleteCategory(@Param('slugOrId') slugOrId: string) {
    return await this.appService.deleteCategory(slugOrId);
  }

  @Get('/:query')
  async getByIdOrSlug(query: string) {
    // await this.appService.getByIdOrSlug(query);
  }

  @Get('getByFilter')
  async getByFilter(queryFilter: FilterDto) {
    return await this.appService.getByFilter(queryFilter);
  }
}
