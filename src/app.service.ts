import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@svkm/db-storage';

import {
  adj,
  capitalize,
  category,
  CategoryDto,
  FilterDto,
  queryToSlug,
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

      if (isExists) return new ConflictException('Категория уже была создана');

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
  async updateCategory(slugOrId: string, categoryDto: Partial<CategoryDto>) {
    try {
      const filterQuery = queryToSlug(slugOrId);
      const existCategory = await this.categoryModel.findOne<Category>(
        filterQuery,
      );
      if (!existCategory) return new NotFoundException('Категория не найдена');

      const message = `Каталог ${slugOrId} был успешно обновлен`;
      const categoryDocument = await this.categoryModel.findByIdAndUpdate(
        existCategory._id,
        {
          slug: categoryDto.slug,
          name: categoryDto.name,
          description: categoryDto.description,
          active: categoryDto.active,
        },
        {
          upsert: false,
          new: true,
        },
      );

      const category = CategoryDto.fromDocument(categoryDocument);

      return { message, category };
    } catch (error) {
      this.logger.error(error);
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Удалить категорию
   */
  async deleteCategory(slugOrId: string) {
    try {
      const filterQuery = queryToSlug(slugOrId);

      const document = await this.categoryModel.findOneAndDelete(filterQuery);
      const message = document
        ? 'Категория была успешно удалена'
        : `Категории по запросу ${slugOrId} не существует`;

      const category = CategoryDto.fromDocument(document);

      return { message, category };
    } catch (error) {
      this.logger.error(error);
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Получить категорию по id или slug.
   */
  async getByIdOrSlug(slugOrId: string) {
    try {
      const filterQuery = queryToSlug(slugOrId);

      const categoryDocument = await this.categoryModel.findOne<Category>(
        filterQuery,
      );

      if (!categoryDocument)
        return new NotFoundException('Категория не найдена');

      const category = CategoryDto.fromDocument(categoryDocument);

      return { message: 'Категория найдена', category };
    } catch (error) {
      this.logger.error(error);
      return new InternalServerErrorException(error);
    }
  }
  /**
   * @description Получить массив категорий по фильтру. Без фильтров
   * по умолчанию отдаются первые две категории отсортированные по дате
   * создания (поле createdDate). Новые категории идут первыми
   */
  async getByFilter(filter: Partial<FilterDto>) {
    try {
      // TODO sort by

      const aggregationPipeline = FilterDto.fromDto(filter);


      console.log(aggregationPipeline);

      const categories = await this.categoryModel.aggregate<Category>(
        aggregationPipeline,
      );

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
    await this.generateMockData();
  }
}
