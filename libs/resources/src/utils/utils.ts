import { randomInt } from 'crypto';
import { FilterQuery, Types } from 'mongoose';
import { Category } from '@svkm/db-storage';

/**
 * @description Gives a random int number in-between requested values
 */
export const random = (min = 0, max = 100, divider?: number | undefined) =>
  divider ? randomInt(min, max + 1) / divider : randomInt(min, max + 1);

/**
 * @description Return force lowercased slug format string
 * @param s {string}
 * @return {string}
 */
export const toSlug = (s: string): string =>
  s.replace(/\s+/g, '-').replace(/'+/g, '').toLowerCase();

/**
 * @description Returns capitalized string
 * @param s {string}
 * @return {string}
 */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const queryToSlug = (slugOrId: string): FilterQuery<Category> => {
  let filterQuery: FilterQuery<Category> = { slug: slugOrId };

  const isObjectId = Types.ObjectId.isValid(slugOrId);
  if (isObjectId) {
    const _id = new Types.ObjectId(slugOrId);
    filterQuery = {
      $or: [{ slug: slugOrId }, { _id }],
    };
  }

  return filterQuery;
};
