import {useMemo} from 'react';
import {getNestedValue} from 'utils/get-nested-value';
import translations from 'messages/fa.json';
import type {TranslationType} from 'types/translation';

/**
 * Hook to provide a scoped translation function for a specific page or subset.
 * @param page The top-level key (e.g., "Auth", "HomePage", "Auth.validation").
 * @returns A function to retrieve the translation by key.
 */
export function useTranslation<T extends keyof TranslationType>(page: T): (key: string) => string {
  const pageTranslations = useMemo(() => translations?.[page], [page]);

  return (key: string) => {
    const value = getNestedValue(pageTranslations, key);
    return typeof value === 'string' ? value : key;
  };
}
