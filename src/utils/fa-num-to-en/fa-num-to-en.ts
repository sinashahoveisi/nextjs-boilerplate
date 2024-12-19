/**
 * Converts Persian (Farsi) numbers to English numbers.
 * @param {string} value - The string containing Persian numbers.
 * @returns {string} The string with English numbers.
 * @example
 * const persianString = "۱۲۳۴۵";
 * const englishString = faNumToEn(persianString);
 * console.log(englishString); // Output: "12345"
 */
const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const faNumToEn = (value: string): string => {
  return value.replace(/[۰-۹]/g, (char) => englishNumbers[persianNumbers.indexOf(char)] || char);
};
