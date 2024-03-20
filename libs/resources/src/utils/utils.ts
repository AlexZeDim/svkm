import { randomInt } from 'crypto';

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
