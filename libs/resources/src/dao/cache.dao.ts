import { CategoryDto } from '@svkm/resources';

export const cacheMap = new Map<string | CategoryDto>([]);

export const getFromCache = (slug: string) => {
  const isIn = cacheMap.has(slug);
  const isCapped = cacheMap.size > 10;
  let cacheCategory: undefined | CategoryDto;

  if (isIn) {
    cacheCategory = cacheMap.get(slug);
  }

  if (isCapped) {
    cacheMap.clear();
  }

  return cacheCategory;
};

export const setToCache = (slug: string, category: Partial<CategoryDto>) => {
  cacheMap.set(slug, category);
};
