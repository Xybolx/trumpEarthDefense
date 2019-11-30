import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import useEventListener from '../hooks/useEventListener';
import useIntersection from '../hooks/useIntersection';
import Plane from '../components/plane/index';
import Missle from '../components/missle/index';
import { Enemy, Enemy2, Enemy3, Enemy4 } from '../components/enemies';
import Stats from '../components/stats';

const GameContainer = () => {

    const planeRef = useRef();
    const missleRef = useRef();
    const enemyRef = useRef();
    const enemy2Ref = useRef();
    const enemy3Ref = useRef();
    const enemy4Ref = useRef();

    const laser = new Audio('laser.mp3');

    const splode = new Audio("splode.mp3");

    const specialSound = new Audio("special.mp3");

    // const bgMusic = new Audio('bg.mp3');

    const { setScore } = useContext(ScoreContext);

    const { special, clearSpecial } = useContext(SpecialContext);

    const [gameOver, setGameOver] = useState(false);

    const [lives, setLives] = useState(3);

    const [isFlying, setIsFlying] = useState(false);

    const [charge, setCharge] = useState(3);

    const [specialReset, setSpecialReset] = useState(false);

    const [initialRedirect, setInitialRedirect] = useState(false);

    const wheelHandler = useCallback(
        ({ deltaY }) => {
            if (deltaY < 0 ) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) - 5 + "px";
            }
            if (deltaY > 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) + 5 + "px";
            }
        }, []);

    const missleHandler = useCallback(() => {
        if (!gameOver && !isFlying && charge === 3 && special < 5) {
            setIsFlying(true);
            setCharge(0);
            laser.volume = .25;
            laser.play();
            missleRef.current.style.visibility = "visible";
        }
        if (!gameOver && charge === 3 && !isFlying && special === 5) {
            specialSound.volume = 1;
            specialSound.play();
            setSpecialReset(true);
            missleRef.current.style.visibility = "hidden";
            missleRef.current.style.top = 0 + "px";
        }
    }, [laser, isFlying, charge, gameOver, special, specialSound]);

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
            document.getElementById("bgMusic").volume = .50;
            document.getElementById("bgMusic").play();
        }
    }, [gameOver]);

    useEffect(() => {
        const enemyReset = () => {
            enemyRef.current.className = "target";
            enemyRef.current.style.right = -300 + "px";
            enemy2Ref.current.className = "target2";
            enemy2Ref.current.style.right = -200 + "px";
            enemy3Ref.current.className = "target3";
            enemy3Ref.current.style.right = -100 + "px";
            enemy4Ref.current.className = "target4";
            enemy4Ref.current.style.right = 0 + "%";
            setScore(score => score + 400);
            setSpecialReset(false);
            clearSpecial();
        };
        const destroyAllEnemies = () => {
            splode.volume = .75;
            splode.play();
            enemyRef.current.className = "destroyed";
            enemy2Ref.current.className = "destroyed";
            enemy3Ref.current.className = "destroyed";
            enemy4Ref.current.className = "destroyed";
        };
        if (!gameOver && specialReset) {
            const specialResetTimer = setTimeout(enemyReset, 1200);
            const destroyAllTimer = setTimeout(destroyAllEnemies, 800);
            return () => {
                clearTimeout(specialResetTimer);
                clearTimeout(destroyAllTimer);
            }
        }
    }, [gameOver, specialReset, clearSpecial, setScore, splode]);

    if (initialRedirect) {
        return <Redirect to="/initials" />;
    }

    return (
        <div id="game-container">
            <audio id="bgMusic" src="bg.mp3" loop />
            <div className="over-earth">
                <div className={lives === 3 ? "earth border-success" : lives === 2 ? "earth border-warning" : "earth border-danger"} />
            </div>
            <Stats charge={charge} lives={lives} gameOver={gameOver} />
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