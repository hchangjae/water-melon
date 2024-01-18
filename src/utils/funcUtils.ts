export const throttle = <T extends unknown[]>(func: (...args: T) => void, limit?: number) => {
  let inThrottle: boolean;
  return function (...args: T) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getValue = <T extends unknown>(setState: React.Dispatch<React.SetStateAction<T>>) => {
  return new Promise<T>((resolve) => {
    setState((prev) => (resolve(prev), prev));
  });
};
