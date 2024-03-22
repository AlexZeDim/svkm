import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { config } from '@svkm/config';
import process from 'node:process';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@svkm/db-storage';

import {
  adj,
  capitalize,
  category,
  CategoryDto,
  FilterDto,
  random,
  toSlug,
} from '@svkm/resources';

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
  async createCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      const isExists = await this.categoryModel.findOne({
        slug: categoryDto.slug,
      });

      if (isExists) throw new ConflictException('Category already exist');

      const category = new this.categoryModel(categoryDto);

      const categoryDoc = await this.categoryModel.create(category);
      return CategoryDto.fromDocument(categoryDoc);
    } catch (error) {
      this.logger.error(error);
    }
  }
  /**
   * @description Изменить категорию. Добавить поддержку частичного обновления
   * модели. Например, возможность изменить только active без
   * необходимости передавать всю модель. И так для любого поля модели.
   */
  async updateCategory(slug): string {
    return 'updateCategory';
  }
  /**
   * @description Удалить категорию
   */
  async deleteCategory(): string {
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
      this.logger.debug(
        `There are already ${isNumberOfDocuments} categories in the collection!`,
      );
      if (isNumberOfDocuments) return;

      length = length - numOfDocuments;

      this.logger.debug(`Adding ${length} categories in the collection...`);

      const documents = Array(length)
        .fill(0)
        .map((e, i) => {
          const [adjLength, categoryLength] = [adj.length, category.length];

          const adjItx = random(0, adjLength - 1);
          const catItx = random(0, categoryLength - 1);

          const [a, c] = [adj[adjItx], category[catItx]];

          const name = capitalize(`${a} ${c}`);

          return new this.categoryModel({
            name,
            slug: toSlug(name),
            description: '',
            active: i % 2 === 0,
          });
        });

      await this.categoryModel.insertMany(documents);
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
