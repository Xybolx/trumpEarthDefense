import { useCallback, useState } from "react";

const useArray = initial => {
    const [value, setValue] = useState(initial);

    const addValue = useCallback(added => setValue(value => [...value, added]), []);

    const removeById = useCallback(id => setValue(arr => arr.filter(item => item && item._id !== id)), []);

    const clear = useCallback(() => setValue(() => []), []);

    return [value, setValue, addValue, removeById, clear];
}

export default useArray;