import { useState, useCallback } from "react";

const useCounter = initial => {
    // state
    const [value, setValue] = useState(initial);

    // function to increment count by 1
    const increment1 = useCallback(() => setValue(value => value + 1), []);

    // function to increment count by 1
    const increment100 = useCallback(() => setValue(value => value + 100), []);

    // function to decrement count by 1
    const decrement1 = useCallback(() => setValue(value => value - 1), []);

    // function to clear count
    const clear = useCallback(() => setValue(initial), [initial]);

    // return an array
    return [value, increment1, increment100, decrement1, clear];

};

export default useCounter;
