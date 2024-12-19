/**
 * Pipes multiple functions together, passing the result of each function
 * as the input to the next.
 * @param {...Function[]} fns The functions to pipe together.
 * @returns {Function} The piped function.
 * @example
 * // Create a piped function to increment, double, and square a number
 * const pipedFunction = pipe(addOne, double, square);
 *
 * // Call the piped function
 * const result = pipedFunction(3); // result = square(double(addOne(3)))
 * console.log(result); // Output: 64
 */
export function pipe(...fns: Array<Function>): Function {
  return function (input: any): any {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}
