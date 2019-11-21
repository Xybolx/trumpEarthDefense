// import { useState, useEffect, useContext } from "react";
import useInterval from "./useInterval";

const useWindowWidth = (missle, gameOver, isFlying, setIsFlying) => {

    const missleTick = () => {
        const rect1 = missle.current.getBoundingClientRect();
        const winWidth = window.innerWidth;
        const docWidth = document.documentElement.clientWidth;
        const missleStyle = missle.current.style;
        if (!gameOver && rect1.right > (winWidth || docWidth)) {
            setIsFlying(false);
            missleStyle.top = 0 + "px";
            missleStyle.visibility = "hidden";
        }        
        missleStyle.top = parseInt(missleStyle.top) - 10 + "px";
    };

    useInterval(() => {
        missleTick();
    }, isFlying ? 25 : null);
};

export default useWindowWidth;