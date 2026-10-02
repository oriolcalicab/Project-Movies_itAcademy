import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 400): T {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() =>{
        const timeoutId = setTimeout(() => setDebounceValue(value), delay);
         return () => clearTimeout(timeoutId)
    }, [value, delay])
    
   return debounceValue
}