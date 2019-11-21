import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import useEventListener from '../hooks/useEventListener';
import useIntersection from '../hooks/useIntersection';
import Plane from '../components/plane/index';
import Missle from '../components/missle/index';
import { Enemy, Enemy2, Enemy3, Enemy4 } from '../components/enemies';

const GameContainer = () => {

    const planeRef = useRef();
    const missleRef = useRef();
    const enemyRef = useRef();
    const enemy2Ref = useRef();
    const enemy3Ref = useRef();
    const enemy4Ref = useRef();

    const laser = new Audio('laser.mp3');

    // const bgMusic = new Audio('bg.mp3');

    const { score } = useContext(ScoreContext);

    const { special } = useContext(SpecialContext);

    const [gameOver, setGameOver] = useState(false);

    const [lives, setLives] = useState(3);

    const [isFlying, setIsFlying] = useState(false);

    const [charge, setCharge] = useState(3);

    const [initialRedirect, setInitialRedirect] = useState(false);

    const wheelHandler = useCallback(
        ({ deltaY }) => {
            if (deltaY < 0 ) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) - 5 + "px";
            }
            if (deltaY > 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) + 5 + "px";
            }
        },
        []
    );

    const missleHandler = useCallback(() => {
        if (!gameOver && !isFlying && charge === 3) {
            setIsFlying(true);
            setCharge(0);
            laser.volume = .50;
            laser.play();
            missleRef.current.style.visibility = "visible";
        }
    }, [laser, missleRef, isFlying, charge, gameOver]);

    useEventListener("wheel", wheelHandler, document);

    useEventListener("mousedown", missleHandler, document);

    useIntersection(missleRef, enemyRef, isFlying, setIsFlying, setLives, gameOver);

    useIntersection(missleRef, enemy2Ref, isFlying, setIsFlying, setLives, gameOver);

    useIntersection(missleRef, enemy3Ref, isFlying, setIsFlying, setLives, gameOver);

    useIntersection(missleRef, enemy4Ref, isFlying, setIsFlying, setLives, gameOver);

    useEffect(() => {
        if (lives === 0) {
            const livesTimer = setTimeout(setInitialRedirect(true), 3000);
            setGameOver(true);
            return () => {
                clearTimeout(livesTimer);
            };
        }
    }, [lives]);

    useEffect(() => {
        if (!gameOver && charge < 3) {
            const chargeTimer = setInterval(() => setCharge(charge => charge + 1), 500);
            return () => {
                clearInterval(chargeTimer);
            };
        }
    }, [charge, gameOver]);

    useEffect(() => {
        if (!gameOver) {
            document.getElementById("bgMusic").play();
        }
    }, [gameOver]);

    if (initialRedirect) {
        return <Redirect to="/initials" />;
    }

    return (
        <div>
            <audio id="bgMusic" src="bg.mp3" />
            <div className="over-earth">
                <div className={lives === 3 ? "earth border-success" : lives === 2 ? "earth border-warning" : "earth border-danger"} />
            </div>
            <div className="col-md-6 text-left">
                Score <span className="text-white">{score}</span>
                <div className="progress badge" style={{ height: 20 }}>
                    Earth <span className="text-white">&nbsp;{Math.floor(lives / 3 * 100) + "%"}</span>
                    <div className={lives === 3 ? "progress-bar bg-success" : lives === 2 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${lives}` / 3 * 100 + "%" }} aria-valuenow={lives / 3 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
                {/* <div className="progress badge" style={{ height: 20 }}>
                    Special <span className="text-white">&nbsp;{Math.floor(special / 5 * 100) + "%"}</span>
                    <div className={special === 5 ? "progress-bar bg-success" : special >= 3 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${special}` / 5 * 100 + "%" }} aria-valuenow={special / 5 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div> */}
                <div className="progress badge" style={{ height: 20 }}>
                    Laser  <span className="text-white">&nbsp;{Math.floor(charge / 3 * 100) + "%"}</span>
                    <div className={charge === 3 ? "progress-bar bg-success" : charge === 2 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${charge}` / 3 * 100 + "%" }} aria-valuenow={charge / 3 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
            </div>
            <Enemy ref={enemyRef} />
            <Enemy2 ref={enemy2Ref} />
            <Enemy3 ref={enemy3Ref} />
            <Enemy4 ref={enemy4Ref} />
            <Plane ref={planeRef}>
                <Missle ref={missleRef} />
            </Plane>
        </div>
    );
};

export default GameContainer;