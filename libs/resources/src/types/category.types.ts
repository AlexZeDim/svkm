import { CategoryDto } from '@svkm/resources/dto';

export type CategoryBySlug = Pick<CategoryDto, 'slug'>;

export type Category = {
  message: string;
  category: CategoryDto;
};
