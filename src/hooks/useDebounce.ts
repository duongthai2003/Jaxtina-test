import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounce, setdebounce] = useState<string>(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setdebounce(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value]);

  return debounce;
}
export default useDebounce;
