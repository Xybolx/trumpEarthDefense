import React, { useMemo } from 'react';
import SpecialContext from './specialContext';
import useCounter from '../hooks/useCounter';

const SpecialProvider = ({ children }) => {

    const [special, setSpecial, incSpecial, incSpecial100, incSpecial400, clearSpecial] = useCounter(0);
    const specialValue = useMemo(() => ({ special, setSpecial, incSpecial, incSpecial100, incSpecial400, clearSpecial }), [special, setSpecial, incSpecial, incSpecial100, incSpecial400, clearSpecial]);

    return (
        <SpecialContext.Provider value={specialValue}>
            { children }
        </SpecialContext.Provider>
    );
};

export default SpecialProvider;