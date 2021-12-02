import React from 'react';

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(value);

  React.useEffect(() => {
    const delayCallback = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(delayCallback);
  }, [delay, value]);

  return debouncedValue;
};
