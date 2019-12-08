import React, { useMemo } from 'react';
import ScoreContext from './scoreContext';
import useCounter from '../hooks/useCounter';

const ScoreProvider = ({ children }) => {

    const [score, setScore, incScore, incScore100, incScore400, clearScore] = useCounter(0);
    const scoreValue = useMemo(() => ({ score, setScore, incScore, incScore100, incScore400, clearScore }), [score, setScore, incScore, incScore100, incScore400, clearScore]);

    return (
        <ScoreContext.Provider value={scoreValue}>
            { children }
        </ScoreContext.Provider>
    );
};

export default ScoreProvider;