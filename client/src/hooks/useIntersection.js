import { useState, useEffect, useContext } from "react";
import ScoreContext from "../context/scoreContext";
import useInterval from "./useInterval";

const useIntersection = (missle, enemy, boolean, setBoolean, setNumber) => {

    const [isIntersecting, setIsIntersecting] = useState(false);

    const { setScore } = useContext(ScoreContext);

    const splode = new Audio("splode.mp3");

    const missleTick = () => {
        const missleStyle = missle.current.style;
        const winWidth = window.innerWidth;
        const docWidth = document.documentElement.clientWidth;
        const rect1 = missle.current.getBoundingClientRect();
        const rect2 = enemy.current.getBoundingClientRect();
        const enemyIntersect = 
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y;
        if (rect1.right > (winWidth || docWidth)) {
            console.log("out of view");
            setBoolean(false);
            missleStyle.top = 0 + "px";
            missleStyle.visibility = "hidden";
        }
        if (enemyIntersect) {
            splode.play();
            setScore(score => score + 100);
            setBoolean(false);
            setIsIntersecting(true);
            console.log("intersecting!");
        }
        missleStyle.top = parseInt(missleStyle.top) - 10 + "px";        
    };

    const enemyTick = () => {
        const rect = enemy.current.getBoundingClientRect();
        const enemyStyle = enemy.current.style;
        if (rect.left <= 0) {
            setNumber(number => number - 1);
            enemyStyle.right = 0 + "px";
        }
    };

    useEffect(() => {
        const missleStyle = missle.current.style;
        const enemyStyle = enemy.current.style;
        const missleRect = missle.current.getBoundingClientRect();
        const resetEnemy = () => {
            setIsIntersecting(false);
            enemy.current.className = "target";
            enemyStyle.right = 0 + "px";
        };
        if (isIntersecting) {
            const destroyTimer = setTimeout(resetEnemy, 150);
            missleStyle.top = 0 + "px";
            missleStyle.visibility = "hidden";
            enemyStyle.top = missleRect.top + "px";
            enemy.current.className = "destroyed";
            return () => {
                clearTimeout(destroyTimer);
            };
        }
    }, [missle, enemy, isIntersecting]);

    useInterval(() => {
        enemyTick();
        enemy.current.style.right = parseInt(enemy.current.style.right) + 15 + "px";
    }, 250);

    useInterval(() => {
        missleTick();
    }, boolean ? 25 : null);

};

export default useIntersection;