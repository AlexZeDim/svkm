import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { config } from '@svkm/config';
import process from 'node:process';
import { FilterDto } from '@svkm/resources';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@svkm/db-storage';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name, {
    timestamp: true,
  });

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}
  /**
   * @description Создать категорию
   */
  createCategory(): string {
    return 'createCategory!';
  }
  /**
   * @description Изменить категорию. Добавить поддержку частичного обновления
   * модели. Например, возможность изменить только active без
   * необходимости передавать всю модель. И так для любого поля модели.
   */
  updateCategory(): string {
    return 'updateCategory';
  }
  /**
   * @description Удалить категорию
   */
  deleteCategory(): string {
    return 'deleteCategory!';
  }
  /**
   * @description Получить категорию по id или slug.
   */
  getByIdOrSlug(query: string): string {
    return 'getByIdOrSlug!';
  }
  /**
   * @description Получить массив категорий по фильтру. Без фильтров
   * по умолчанию отдаются первые две категории отсортированные по дате
   * создания (поле createdDate). Новые категории идут первыми
   */
  async getByFilter(filter: FilterDto) {
    try {
      // TODO sort by

      const categories = await this.categoryModel.find(filter);
    } catch (e) {
      this.logger.error(e);
    }

    return 'getByFilter!';
  }

  async generateMockData(length = 5000) {
    try {
      const numOfDocuments = await this.categoryModel.countDocuments();
      const isNumberOfDocuments = numOfDocuments >= length;
      if (isNumberOfDocuments) {
        this.logger.debug(
          `There are already ${isNumberOfDocuments} categories in the collection!`,
        );
        return;
      }

      length = length - numOfDocuments;

      const documents = Array.from({ length }, () => 5);

      const t = new Category();

    } catch (error) {
      this.logger.error(error);
    }
  }

  async onApplicationBootstrap(): Promise<void> {
    console.log(config);
    console.log(process.env.MONGO_CONNECTION);
    await this.generateMockData();
  }
}
