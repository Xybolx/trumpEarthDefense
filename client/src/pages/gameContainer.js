import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import useEventListener from '../hooks/useEventListener';
import useIntersection from '../hooks/useIntersection';
import Plane from '../components/plane/index';
import Missile from '../components/missile/index';
import { Enemy, Enemy2, Enemy3 } from '../components/enemies';
import { Wall } from '../components/wall';
import Stats from '../components/stats';
import EarthShield from '../components/earthShield/EarthShield';
import SpecialMissile from '../components/specialMissile';
import Lightning from '../components/lightning';
import useGamepad from '../hooks/useGamepad';
import SpecialAlert from '../components/alerts/SpecialAlert';
// import useWidthObserver from '../hooks/useWidthObserver';
import useCounter from '../hooks/useCounter';
import useToggle from '../hooks/useToggle';
import useGamescreen from '../components/useGamescreen';

const GameContainer = () => {

    let history = useHistory();

    const [message, setMessage] = useState("");

    const [isOpen, setIsOpen, toggleOpen, setOpenTrue, setOpenFalse] = useToggle(false);

    // refs
    const planeRef = useRef();
    const missileRef = useRef();
    const wallRef = useRef();
    const specialMissileRef = useRef();
    const lightningRef = useRef();
    const enemyRef = useRef();
    const enemy2Ref = useRef();
    const enemy3Ref = useRef();

    // context
    const { setScore } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    // state
    const [gameOver, setGameOver] = useState(false);
    const [lives, setLives] = useCounter(3);
    const [specialReset, setSpecialReset] = useState(false);

    // handle mouse controls
    // handle wheel events
    const wheelHandler = useCallback(({ deltaY }) => {
            if (deltaY < 0 && planeRef.current.getBoundingClientRect().height !== (window.innerHeight || document.documentElement.clientHeight)) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) - 7 + "px";
            }

            if (planeRef.current.getBoundingClientRect().height === (window.innerHeight || document.documentElement.clientHeight)) {
                console.log("Max Height!");
            }

            if (deltaY > 0 && planeRef.current.getBoundingClientRect().y !== 0) {
                planeRef.current.style.top = parseInt(planeRef.current.style.top) + 7 + "px";
            }
        }, []);

        const [fireHandler, isFlying, setIsFlying, wallClass, missile, charge] = useGamescreen(gameOver, setSpecialReset, missileRef, specialMissileRef, wallRef);

    // handle mouse down event
    const mouseDownHandler = useCallback(() => {
        fireHandler();
    }, [fireHandler]);

    // useEventListener for wheel
    useEventListener("wheel", wheelHandler, window);
    // useEventListener for mouse down
    useEventListener("mousedown", mouseDownHandler, window);

    const upHandler = useCallback(() => {
        if (!gameOver && planeRef.current.getBoundingClientRect().height !== (window.innerHeight || document.documentElement.clientHeight)) {
            planeRef.current.style.top = parseInt(planeRef.current.style.top) - 30 + "px";
        }
        if (!gameOver && planeRef.current.getBoundingClientRect().height === (window.innerHeight || document.documentElement.clientHeight)) {
            console.log("MAX HEIGHT!");
        }  
    }, [gameOver]);

    const downHandler = useCallback(() => {
        if (!gameOver) {
            planeRef.current.style.top = parseInt(planeRef.current.style.top) + 30 + "px";
        } 
    }, [gameOver]);

    // handle key down events
    const keyHandler = useCallback(({ key }) => {
        if (key === "ArrowUp") {
            upHandler();
        }
        if (key === "ArrowDown") {
            downHandler();
        }
        if (key === " ") {
            fireHandler();
        }
    }, [fireHandler, upHandler, downHandler]);

    // useEventListener for key down events
    useEventListener("keydown", keyHandler, window);

    // useIntersection for detecting collision and screen width
    // const wallClass = useWidthObserver(missileRef, wallRef, gameOver, isFlying, setIsFlying);
    useIntersection(missile, enemyRef, -100, "target", isFlying, setIsFlying, setLives, gameOver);
    useIntersection(missile, enemy2Ref, -200, "target2", isFlying, setIsFlying, setLives, gameOver);
    useIntersection(missile, enemy3Ref, -300, "target3", isFlying, setIsFlying, setLives, gameOver);

    useEffect(() => {
        if (lives === 0) {
            setGameOver(true);
        }
    }, [lives, setGameOver]);

    // useEffect(() => {
    //     if (!gameOver && charge < 3) {
    //         const chargeTimer = setInterval(() => setCharge(charge => charge + 1), 500);
    //         return () => {
    //             clearInterval(chargeTimer);
    //         };
    //     }
    // }, [charge, gameOver, setCharge]);

    useEffect(() => {
        if (!gameOver) {
            document.getElementById("bgMusic").volume = .50;
            document.getElementById("bgMusic").play();
        }
    }, [gameOver]);

    useEffect(() => {
        const enemyReset = async () => {
            await clearSpecial;
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
        };
        const destroyAllEnemies = async () => {
            const splode = new Audio("splode.mp3");
            splode.volume = .5;
            splode.play();
            enemyRef.current.className = "destroyed";
            enemy2Ref.current.className = "destroyed";
            enemy3Ref.current.className = "destroyed";
            lightningRef.current.style.visibility = "visible";
            specialMissileRef.current.style.visibility = "hidden";
            clearSpecial();
        };
        if (!gameOver && specialReset) {
            const specialResetTimer = setTimeout(enemyReset, 1200);
            const destroyAllTimer = setTimeout(destroyAllEnemies, 800);
            return () => {
                clearTimeout(specialResetTimer);
                clearTimeout(destroyAllTimer);
            }
        }
    }, [gameOver, specialReset, setSpecialReset, clearSpecial, setScore]);

    useEffect(() => {

        const rude = new Audio("rude.mp3");
        const quiet = new Audio("quiet.mp3");
        const congrats = new Audio("congrats.mp3");
        const rocket = new Audio("rocket.mp3");
        const theWall = new Audio("wall.mp3");

        const insults = [rude, quiet, congrats, rocket, theWall];
        const indexOfInsult = Math.floor(Math.random() * insults.length);
        const randomInsult = insults[indexOfInsult];

        if (!gameOver && specialReset && indexOfInsult === 0) {
            setMessage(`"Don't be rude!"`);
            setOpenTrue();
            randomInsult.play();
        }
        if (!gameOver && specialReset && indexOfInsult === 1) {
            setMessage(`"Quiet! Quiet!"`);
            setOpenTrue();
            randomInsult.play();
        }
        if (!gameOver && specialReset && indexOfInsult === 2) {
            setMessage(`"Congratulations!`);
            setOpenTrue();
            randomInsult.play();
        }
        if (!gameOver && specialReset && indexOfInsult === 3) {
            setMessage(`"Little rocket man!"`);
            setOpenTrue();
            randomInsult.play();
        }
        if (!gameOver && specialReset && indexOfInsult === 4) {
            setMessage(`"The Wall just got ten feet taller!"`);
            setOpenTrue();
            randomInsult.play();
        }
        if (!gameOver && !specialReset) {
            setOpenFalse();
        }
        
    }, [gameOver, specialReset, setOpenFalse, setOpenTrue]);

    // handle gamepad controls
    const startHandler = () => {};

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
            <SpecialAlert message={message} isOpen={isOpen} />
            <Enemy ref={enemyRef}></Enemy>
            <Enemy2 ref={enemy2Ref}></Enemy2>
            <Enemy3 ref={enemy3Ref}></Enemy3>
            <Plane ref={planeRef}>
                <Missile ref={missileRef} />
            </Plane>
            <Wall ref={wallRef} className={wallClass} />
        </div>
    );
};

export default GameContainer;