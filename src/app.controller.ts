import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryBySlug, CategoryDto, FilterDto } from '@svkm/resources';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/createCategory')
  async createCategory(@Res() res, @Body() categoryDto: CategoryDto) {
    const category = await this.appService.createCategory(categoryDto);
    return res.status(HttpStatus.OK).json({
      message: 'Category has been created successfully',
      category,
    });
  }

  @Patch('updateCategory/:slug')
  async updateCategory(@Param() param: CategoryBySlug, @Response() res: any, @Body() body: CategoryDto) {
    const category = await this.appService.updateCategory(param.slug, body);
    return res.status(HttpStatus.OK).json(category);
  }

  @Delete('deleteCategory/:slug')
  deleteCategory(): string {
    const category = await this.appService.deleteCategory();
    return res.status(HttpStatus.OK).json(category);
  }

  @Get('/getByIdOrSlug')
  getByIdOrSlug(query: string): string {
    return this.appService.getByIdOrSlug(query);
  }

  @Get('/getByFilter')
  async getByFilter(queryFilter: FilterDto): Promise<string> {
    return await this.appService.getByFilter(queryFilter);
  }
}
