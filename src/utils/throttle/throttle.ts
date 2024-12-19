export function throttle(fn: (...args: any[]) => void, limit: number) {
  let lastFunc: number;
  let lastRan: number;

  return function (this: any, ...args: any[]) {
    const context = this;
    if (!lastRan) {
      fn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = window.setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            fn.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };
}
