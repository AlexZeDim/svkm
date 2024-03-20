import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterDto } from '@svkm/resources';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/createCategory')
  createCategory(): string {
    return this.appService.createCategory();
  }

  @Post('/updateCategory')
  updateCategory(): string {
    return this.appService.updateCategory();
  }

  @Delete('/deleteCategory')
  deleteCategory(): string {
    return this.appService.deleteCategory();
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
