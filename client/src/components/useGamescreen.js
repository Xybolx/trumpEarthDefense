import { useState, useCallback, useContext, useEffect } from 'react';
import SpecialContext from '../context/specialContext';
import useCounter from '../hooks/useCounter';
import useWidthObserver from '../hooks/useWidthObserver';

const useGamescreen = (gameOver, setSpecialReset, missile, specialMissile, wall) => {

    const { special } = useContext(SpecialContext);

    const [isFlying, setIsFlying] = useState(false);
    const [charge, setCharge] = useCounter(3);

    const fireHandler = useCallback(() => {

        const laser = new Audio('laser.mp3');
        const specialSound = new Audio("special.mp3");

        if (!gameOver && !isFlying && charge === 3 && special < 5) {
            setIsFlying(true);
            setCharge(0);
            laser.playbackRate = .85;
            laser.volume = .55;
            laser.play();
            missile.current.style.visibility = "visible";
        }
        if (!gameOver && !isFlying && charge === 3 && special === 5) {
            specialSound.volume = 1;
            specialSound.playbackRate = .75;
            specialSound.play();
            setCharge(0);
            setSpecialReset(true);
            missile.current.style.visibility = "hidden";
            missile.current.style.top = 0 + "px";
            specialMissile.current.style.visibility = "visible";
        }
    }, [charge, setCharge, setIsFlying, setSpecialReset, gameOver, isFlying, special, missile, specialMissile]);

    const wallClass = useWidthObserver(missile, wall, gameOver, isFlying, setIsFlying);

    useEffect(() => {
        if (!gameOver && charge < 3) {
            const chargeTimer = setInterval(() => setCharge(charge => charge + 1), 500);
            return () => {
                clearInterval(chargeTimer);
            };
        }
    }, [charge, gameOver, setCharge]);

    return [fireHandler, isFlying, setIsFlying, wallClass, missile, charge];
};

export default useGamescreen;