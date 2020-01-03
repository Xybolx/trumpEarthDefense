import { useState, useCallback } from 'react';

const useToggle = initial => {
    
    const [state, setState] = useState(initial);

    const toggle = useCallback(() => setState(!state), [state]);

    const toggleTrue = useCallback(() => setState(true), []);

    const toggleFalse = useCallback(() => setState(false), []);

    return [state, toggle, toggleTrue, toggleFalse];
};

export default useToggle;
