import { useState, useCallback } from "react";

const useCounter = initial => {
    // state
    const [value, setValue] = useState(initial);

    // function to increment count by 1
    const increment1 = useCallback(() => setValue(value => value + 1), []);

    // function to increment count by 100
    const increment100 = useCallback(() => setValue(value => value + 100), []);

    // function to increment count by 400
    const increment400 = useCallback(() => setValue(value => value + 400), []);

    // function to decrement count by 1
    const decrement1 = useCallback(() => setValue(value => value - 1), []);

    // function to clear count
    const clear = useCallback(() => setValue(initial), [initial]);

    // return an array
    return [value, setValue, increment1, increment100, increment400, decrement1, clear];

};

export default useCounter;
