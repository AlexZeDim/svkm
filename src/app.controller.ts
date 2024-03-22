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
import {
  CategoryBySlug,
  CategoryDto,
  CategoryResponse,
  FilterDto,
} from '@svkm/resources';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/createCategory')
  async createCategory(
    @Res() res: any,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryResponse> {
    const category = await this.appService.createCategory(categoryDto);
    return res.status(HttpStatus.OK).json({
      message: 'Category has been created successfully',
      category,
    });
  }

  @Patch('updateCategory/:slug')
  async updateCategory(
    @Param() param: CategoryBySlug,
    @Res() res: any,
    @Body() body: Partial<CategoryDto>,
  ) {
    const category = await this.appService.updateCategory(param.slug, body);
    return res.status(HttpStatus.OK).json(category);
  }

  @Delete('deleteCategory/:slug')
  async deleteCategory() {
    const category = await this.appService.deleteCategory();
    // return res.status(HttpStatus.OK).json(category);
  }

  @Get('/getByIdOrSlug')
  async getByIdOrSlug(query: string) {
    // await this.appService.getByIdOrSlug(query);
  }

  @Get('/getByFilter')
  async getByFilter(queryFilter: FilterDto) {
    return await this.appService.getByFilter(queryFilter);
  }
}
