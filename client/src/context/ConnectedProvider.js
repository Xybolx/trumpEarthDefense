import React, { useMemo } from 'react';
import ConnectedContext from './connectedContext';
import useToggle from '../hooks/useToggle';

const ConnectedProvider = ({ children }) => {

    const [gamepadConnected, toggleGamepadConnected] = useToggle(false);
    const connectedValue = useMemo(() => ({ gamepadConnected, toggleGamepadConnected }), [gamepadConnected, toggleGamepadConnected]);

    return (
        <ConnectedContext.Provider value={connectedValue}>
            { children }
        </ConnectedContext.Provider>
    );
};

export default ConnectedProvider;