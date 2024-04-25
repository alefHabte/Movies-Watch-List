import { useState, useEffect } from "react";

export function useLocalStoreState(initialState, key) {
  const [value, setValue] = useState(function () {
    const saved = localStorage.getItem(key);
    return JSON.parse(saved);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
