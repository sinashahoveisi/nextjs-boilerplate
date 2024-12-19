/**
 * Utility to retrieve a value from an object using dot-notation for nested keys.
 * @param obj The object to retrieve the value from.
 * @param path The dot-notated key path (e.g., "validation.personnelCodeNumeric").
 * @returns The value if found, otherwise undefined.
 */
export function getNestedValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((acc, key) => {
    // Ensure the object is typed as a record with string keys
    return acc && (acc as Record<string, any>)[key];
  }, obj);
}
