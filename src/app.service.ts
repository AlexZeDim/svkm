import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { config } from '@svkm/config';
import process from 'node:process';

@Injectable()
export class AppService implements OnApplicationBootstrap {
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
  getByFilter() {
    // TODO sort by
    return 'getByFilter!';
  }

  onApplicationBootstrap(): void {
    console.log(config);
    console.log(process.env.MONGO_CONNECTION);
  }
}
