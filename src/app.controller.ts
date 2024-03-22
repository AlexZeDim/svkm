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

  @Get('/:query')
  async getByIdOrSlug(query: string) {
    // await this.appService.getByIdOrSlug(query);
  }

  @Get('getByFilter')
  async getByFilter(queryFilter: FilterDto) {
    return await this.appService.getByFilter(queryFilter);
  }
}
