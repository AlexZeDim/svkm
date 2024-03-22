import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryBySlug, CategoryDto, FilterDto } from '@svkm/resources';

@Controller('category')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @HttpCode(201)
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.appService.createCategory(categoryDto);
  }

  @Patch(':slugOrId')
  async updateCategory(
    @Param('slugOrId') slugOrId: string,
    @Body() body: Partial<CategoryDto>,
  ) {
    return await this.appService.updateCategory(slugOrId, body);
  }

  @Delete(':slugOrId')
  async deleteCategory(@Param('slugOrId') slugOrId: string) {
    return await this.appService.deleteCategory(slugOrId);
  }

  @Get('/:slugOrId')
  @HttpCode(200)
  async getByIdOrSlug(@Param('slugOrId') slugOrId: string) {
    return await this.appService.getByIdOrSlug(slugOrId);
  }

  @Get('getByFilter')
  async getByFilter(queryFilter: Partial<FilterDto>) {
    return await this.appService.getByFilter(queryFilter);
  }
}
