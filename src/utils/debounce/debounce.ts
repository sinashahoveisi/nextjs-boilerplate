export function debounce<T extends (...args: any) => any>(func: T, delay: number): (...args: any) => any {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
