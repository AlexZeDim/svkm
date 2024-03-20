import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
  getByFilter(): string {
    return this.appService.getByFilter();
  }
}
