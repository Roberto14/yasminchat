import React from 'react';

export default (localStorageKey: string) : [string, any ] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || '',
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
