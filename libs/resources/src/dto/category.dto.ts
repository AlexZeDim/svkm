import { Category } from '@svkm/db-storage/mongo/schema';

export class CategoryDto {
  id: string;

  slug: string;

  name: string;

  description: string;

  active: boolean;

  createdAt: Date;

  fromDocument(document: Category): CategoryDto {
    // TODO
    return Object.assign(this, document);
  }
}
