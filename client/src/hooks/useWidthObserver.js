import { useState, useEffect, useContext } from "react";
import SpecialContext from '../context/specialContext';
import useInterval from '../hooks/useInterval';

const useWidthObserver = (missile, gameOver, isFlying, setIsFlying) => {

    // context
    const { clearSpecial } = useContext(SpecialContext);

    const missileTick = () => {
        const missileStyle = missile.current.style;
        const rect1 = missile.current.getBoundingClientRect();

        switch (true) {

            case !gameOver && rect1.right > (window.innerWidth || document.documentElement.clientWidth):
                clearSpecial();
                setIsFlying(false);
                missileStyle.top = 0 + "px";
                missileStyle.visibility = "hidden";
                break;
            default: 
                missileStyle.top = parseInt(missileStyle.top) - 10 + "px";
                break;
        }      
    };

    useInterval(() => {
        missileTick();
    }, !gameOver && isFlying ? 25 : null);
};

export default useWidthObserver;