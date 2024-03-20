/**
 * @description Return force lowercased slug format string
 * @param s {string}
 * @return {string}
 */
export const toSlug = (s: string): string =>
  s.replace(/\s+/g, '-').replace(/'+/g, '').toLowerCase();
