import React, { useMemo } from 'react';
import ConnectedContext from './connectedContext';
import useToggle from '../hooks/useToggle';

const ConnectedProvider = ({ children }) => {

    const [connected, toggleConnected, toggleTrue, toggleFalse] = useToggle(false);
    const connectedValue = useMemo(() => ({ connected, toggleConnected, toggleTrue, toggleFalse }), [connected, toggleConnected, toggleTrue, toggleFalse]);

    return (
        <ConnectedContext.Provider value={connectedValue}>
            { children }
        </ConnectedContext.Provider>
    );
};

export default ConnectedProvider;