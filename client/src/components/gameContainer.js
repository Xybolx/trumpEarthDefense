import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import useEventListener from '../hooks/useEventListener';
import useIntersection from '../hooks/useIntersection';
import Plane from './plane';
import Missle from './missle';
import Enemy from './enemy';
import Enemy2 from './enemy2';
import Enemy3 from './enemy3';

const GameContainer = () => {

    const planeRef = useRef();

    const missleRef = useRef();

    const enemyRef = useRef();

    const enemy2Ref = useRef();

    const enemy3Ref = useRef();

    const earthRef = useRef();

    const laser = new Audio('laser.mp3');

    const { score } = useContext(ScoreContext);

    const [lives, setLives] = useState(3);

    const [isFlying, setIsFlying] = useState(false);

    const [initialRedirect, setInitialRedirect] = useState(false);

    const wheelHandler = useCallback(
        ({ deltaY }) => {
            if (deltaY < 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) - 5 + "px";
            }
            if (deltaY > 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) + 5 + "px";
            }
        },
        []
    );

    const missleHandler = useCallback(() => {
        if (!isFlying) {
            setIsFlying(true);
            laser.play();
            missleRef.current.style.visibility = "visible";
        }
    }, [laser, missleRef, isFlying]);

    useEventListener("wheel", wheelHandler, window);

    useEventListener("mousedown", missleHandler, document);

    useIntersection(missleRef, enemyRef, isFlying, setIsFlying, setLives);

    useIntersection(missleRef, enemy2Ref, isFlying, setIsFlying, setLives);

    useIntersection(missleRef, enemy3Ref, isFlying, setIsFlying, setLives);

    useEffect(() => {
        if (lives === 0) {
            const livesTimer = setTimeout(setInitialRedirect(true), 3000);
            return () => {
                clearTimeout(livesTimer);
            };
        }
    }, [lives]);

    if (initialRedirect) {
        return <Redirect to="/initials" />;
    }

    return (
        <div className="game-container">
            <div className="over-earth">
                <div ref={earthRef} className={lives === 2 ? "earth border-warning" : lives === 1 ? "earth border-danger" : "earth border-success"} />
            </div>
            <div className="col-md-6 text-left">
                <div>Score:<span className="stats">{score}</span></div>
                <div className="progress badge" style={{ height: 20 }}>
                    Grid Health
                        <div className={lives === 3 ? "progress-bar bg-success" : lives === 2 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${lives}` / 3 * 100 + "%" }} aria-valuenow={lives / 3 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
            </div>
            <Enemy ref={enemyRef} />
            <Enemy2 ref={enemy2Ref} />
            <Enemy3 ref={enemy3Ref} />
            <Plane ref={planeRef}>
                <Missle ref={missleRef} />
            </Plane>
        </div>
    );
};

export default GameContainer;