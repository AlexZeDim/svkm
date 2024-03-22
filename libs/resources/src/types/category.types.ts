import { CategoryDto } from '@svkm/resources/dto';

export type CategoryBySlug = Pick<CategoryDto, 'slug'>;

export type CategoryResponse = {
  message: string;
  category: CategoryDto;
};
