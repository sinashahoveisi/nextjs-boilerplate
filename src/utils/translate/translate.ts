import translations from 'messages/en.json';
import {getNestedValue} from 'utils/get-nested-value';
import type {TranslationType} from 'types/translation';

/**
 * Function to retrieve a translation function scoped to a specific page or subset.
 * @param page The top-level key (e.g., "Auth", "HomePage", "Auth.validation").
 * @returns A function to retrieve the translation by key.
 */
export function translation<T extends keyof TranslationType>(page: T): (key: string) => string {
  const pageTranslations = translations?.[page];

  return (key: string) => {
    const value = getNestedValue(pageTranslations, key);
    return typeof value === 'string' ? value : key;
  };
}
