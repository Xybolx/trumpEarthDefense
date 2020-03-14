import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import useEventListener from '../hooks/useEventListener';
import useIntersection from '../hooks/useIntersection';
import Plane from '../components/plane/index';
import Missile from '../components/missile/index';
import { Enemy, Enemy2, Enemy3 } from '../components/enemies';
import { BossMissile, Boss2Missile, Boss3Missile } from '../components/bossMissile';
import { Wall } from '../components/wall';
import Stats from '../components/stats';
import EarthShield from '../components/earthShield/EarthShield';
import SpecialMissile from '../components/specialMissile';
import Lightning from '../components/lightning';
import useGamepad from '../hooks/useGamepad';
import useWidthObserver from '../hooks/useWidthObserver';
import useInterval from '../hooks/useInterval';

const GameContainer = () => {

    let history = useHistory();

    // refs
    const planeRef = useRef();
    const missileRef = useRef();
    const wallRef = useRef();
    const wall2Ref = useRef();
    const specialMissileRef = useRef();
    const lightningRef = useRef();
    const enemyRef = useRef();
    const enemy2Ref = useRef();
    const enemy3Ref = useRef();
    const bossMissileRef = useRef();
    const boss2MissileRef = useRef();
    const boss3MissileRef = useRef();

    // audio
    const laser = new Audio('laser.mp3');
    const splode = new Audio("splode.mp3");
    const specialSound = new Audio("special.mp3");

    // context
    const { setScore } = useContext(ScoreContext);
    const { special, clearSpecial } = useContext(SpecialContext);

    // state
    const [gameOver, setGameOver] = useState(false);
    const [lives, setLives] = useState(3);
    const [isFlying, setIsFlying] = useState(false);
    const [isFlyingBoss, setIsFlyingBoss] = useState(false);
    const [charge, setCharge] = useState(3);
    const [specialReset, setSpecialReset] = useState(false);

    // handle mouse controls
    // handle wheel events
    const wheelHandler = useCallback(
        ({ deltaY }) => {
            if (deltaY < 0 && planeRef.current.getBoundingClientRect().height !== (window.innerHeight || document.documentElement.clientHeight)) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) - 7 + "px";
            }

            if (deltaY < 0 && planeRef.current.getBoundingClientRect().height === (window.innerHeight || document.documentElement.clientHeight)) {
                console.log("Max Height!");
            }

            if (deltaY > 0 && planeRef.current.getBoundingClientRect().y !== 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) + 7 + "px";
            }
        }, []);

    const fireHandler = useCallback(() => {
        if (!gameOver && !isFlying && charge === 3 && special < 5) {
            setIsFlyingBoss(true);
            setIsFlying(true);
            setCharge(0);
            laser.volume = .50;
            laser.play();
            bossMissileRef.current.style.visibility = "visible";
            missileRef.current.style.visibility = "visible";
        }
        if (!gameOver && !isFlying && charge === 3 && special === 5) {
            specialSound.volume = 1;
            specialSound.play();
            setSpecialReset(true);
            missileRef.current.style.visibility = "hidden";
            missileRef.current.style.top = 0 + "px";
            specialMissileRef.current.style.visibility = "visible";
        }
    }, [charge, gameOver, isFlying, laser, special, specialSound]);

    useInterval(() => {
        bossMissileRef.current.style.right = parseInt(bossMissileRef.current.style.right) + 10 + "px";
    }, isFlyingBoss ? 50 : null);

    // handle mouse down event
    const mouseDownHandler = useCallback(() => {
        fireHandler();
    }, [fireHandler]);

    // useEventListener for wheel
    useEventListener("wheel", wheelHandler, window);
    // useEventListener for mouse down
    useEventListener("mousedown", mouseDownHandler, window);

    // useIntersection for detecting collision and screen width
    const wallClass = useWidthObserver(missileRef, wallRef, gameOver, isFlying, setIsFlying);
    useIntersection(missileRef, enemyRef, -100, "target", isFlying, setIsFlying, setLives, gameOver);
    useIntersection(missileRef, enemy2Ref, -200, "target2", isFlying, setIsFlying, setLives, gameOver);
    useIntersection(missileRef, enemy3Ref, -300, "target3", isFlying, setIsFlying, setLives, gameOver);

    useEffect(() => {
        if (lives === 0) {
            setGameOver(true);
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
            specialMissileRef.current.style.visibility = "hidden";
            lightningRef.current.style.visibility = "hidden";
            setScore(score => score + 500);
            setSpecialReset(false);
            clearSpecial();
        };
        const destroyAllEnemies = () => {
            splode.volume = .5;
            splode.play();
            enemyRef.current.className = "destroyed";
            enemy2Ref.current.className = "destroyed";
            enemy3Ref.current.className = "destroyed";
            lightningRef.current.style.visibility = "visible";
            specialMissileRef.current.style.visibility = "hidden";
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

    useEffect(() => {

        const rude = new Audio("rude.mp3");
        const quiet = new Audio("quiet.mp3");
        const congrats = new Audio("congrats.mp3");
        const rocket = new Audio("rocket.mp3");
        const wall = new Audio("wall.mp3");

        const insults = [rude, quiet, congrats, rocket, wall];
        const indexOfInsult = Math.floor(Math.random() * insults.length);

        const getRandomInsult = () => insults[indexOfInsult].play();

        if (!gameOver && specialReset) {
            getRandomInsult();
        }
    }, [gameOver, specialReset]);

    // handle gamepad controls
    const startHandler = () => {};

    const upHandler = () => {
        if (!gameOver) {
            planeRef.current.style.top = parseInt(planeRef.current.style.top) - 30 + "px";
        } 
    };

    const downHandler = () => {
        if (!gameOver) {
            planeRef.current.style.top = parseInt(planeRef.current.style.top) + 30 + "px";
        } 
    };

    const backHandler = () => {
        history.push("/");
    };

    const { gamepad } = useGamepad(startHandler, backHandler, fireHandler, upHandler, downHandler);

    if (gameOver) {
        return <Redirect to="/initials" />;
    }

    return (
        <div id="game-container">
            {gamepad}
            <audio id="bgMusic" src="bg.mp3" loop />
            <Lightning ref={lightningRef}>
                <SpecialMissile ref={specialMissileRef} />
            </Lightning>
            <EarthShield className={
                lives === 3 ?
                    "earth border-success" :
                    lives === 2 ? "earth border-warning" :
                        "earth border-danger"
            }
            />
            <Stats
                charge={charge}
                lives={lives}
                gameOver={gameOver}
            />
            <Enemy ref={enemyRef}>
                <BossMissile ref={bossMissileRef} />
            </Enemy>
            <Enemy2 ref={enemy2Ref}>
                <Boss2Missile ref={boss2MissileRef} />
            </Enemy2>
            <Enemy3 ref={enemy3Ref}>
                <Boss3Missile ref={boss3MissileRef} />
            </Enemy3>
            <Plane ref={planeRef}>
                <Missile ref={missileRef} />
            </Plane>
            <Wall ref={wallRef} className={wallClass} />
            {/* <Wall2 ref={wall2Ref} /> */}
        </div>
    );
};

export default GameContainer;