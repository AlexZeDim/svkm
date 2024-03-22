import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { config } from '@svkm/config';
import process from 'node:process';
import { FilterQuery, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@svkm/db-storage';

import {
  adj,
  capitalize,
  category,
  CategoryByIdOrSlug,
  CategoryDto,
  FilterDto,
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
  async createCategory(categoryDto: CategoryDto) {
    try {
      const isExists = await this.categoryModel.findOne({
        slug: categoryDto.slug,
      });

      if (isExists) return new ConflictException('Category already exist');

      const document = new this.categoryModel(categoryDto);
      const categoryDoc = await this.categoryModel.create(document);
      const category = CategoryDto.fromDocument(categoryDoc);
      return { message: 'Категория создана', category };
    } catch (error) {
      this.logger.error(error);
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Изменить категорию. Добавить поддержку частичного обновления
   * модели. Например, возможность изменить только active без
   * необходимости передавать всю модель. И так для любого поля модели.
   */
  async updateCategory(slug: string, category: Partial<CategoryDto>) {
    try {
      return await this.categoryModel.findOneAndUpdate<Category>(
        { slug: slug },
        category,
        {
          upsert: false,
          new: true,
        },
      );
    } catch (error) {
      this.logger.error(error);
      // TODO review
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Удалить категорию
   */
  async deleteCategory(slugOrId: string) {
    try {
      let filterQuery: FilterQuery<Category> = { slug: slugOrId };

      const isObjectId = Types.ObjectId.isValid(slugOrId);
      if (isObjectId) {
        const _id = new Types.ObjectId(slugOrId);
        filterQuery = {
          $or: [{ slug: slugOrId }, { _id }],
        };
      }

      const document = await this.categoryModel.findOneAndDelete(filterQuery);
      const message = document
        ? 'Категория была успешно удалена'
        : `Категории по запросу ${slugOrId} не существует`;

      const category = CategoryDto.fromDocument(document);

      return { message, category };
    } catch (error) {
      this.logger.error(error);
      // TODO review
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Получить категорию по id или slug.
   */
  async getByIdOrSlug(args: CategoryByIdOrSlug) {
    // TODO from dto
    const category = await this.categoryModel.findOne<Category>({
      $or: [{ slug: args.slug }, { _id: args.id }],
    });

    if (!category) return new NotFoundException('Category not found');

    return CategoryDto.fromDocument(category);
  }
  /**
   * @description Получить массив категорий по фильтру. Без фильтров
   * по умолчанию отдаются первые две категории отсортированные по дате
   * создания (поле createdDate). Новые категории идут первыми
   */
  async getByFilter(filter: FilterDto) {
    try {
      // TODO sort by

      const searchFilter = FilterDto.fromDto(filter);
      const skip = filter.pageSize || 2;
      const limit = 1;

      const categories = await this.categoryModel
        .find(searchFilter)
        .skip(skip)
        .limit(limit);

      return categories.map((category) => CategoryDto.fromDocument(category));
    } catch (error) {
      this.logger.error(error);
      return new InternalServerErrorException(error);
    }
  }

  async generateMockData() {
    try {
      const numOfDocuments = await this.categoryModel.countDocuments();
      const [adjLength, categoryLength] = [adj.length, category.length];
      const isNumberOfDocuments = numOfDocuments >= adjLength * categoryLength;
      this.logger.debug(
        `There are already ${isNumberOfDocuments} categories in the collection!`,
      );
      if (isNumberOfDocuments) return;

      this.logger.debug(`Adding mock categories in the collection...`);

      const categories = category
        .map((category, catItx) =>
          adj.map(
            (adj, adjItx) =>
              new this.categoryModel({
                name: capitalize(`${adj} ${category}`),
                slug: toSlug(`${adj} ${category}`),
                description: `${adj} ${category}`,
                active: (catItx * adjItx) % 2 === 0,
              }),
          ),
        )
        .flat();

      await this.categoryModel.insertMany(categories);
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
