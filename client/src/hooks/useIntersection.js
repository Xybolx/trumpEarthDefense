import { useState, useEffect, useContext } from "react";
import ScoreContext from "../context/scoreContext";
import useInterval from "./useInterval";

const useIntersection = (missle, enemy, isFlying, setIsFlying, setLives, gameOver) => {

    // state
    const [isIntersecting, setIsIntersecting] = useState(false);

    // context
    const { incScore100 } = useContext(ScoreContext);

    // audio elements
    const splode = new Audio("splode.mp3");
    const laugh = new Audio("laughing.mp3");

    // function to advance player projectile/detect if it reaches the end of the screen/detect intersection
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

        if (!gameOver && rect1.right > (winWidth || docWidth)) {
            setIsFlying(false);
            missleStyle.top = 0 + "px";
            missleStyle.visibility = "hidden";
        }
        if (!gameOver && enemyIntersect) {
            splode.volume = 1;
            splode.play();
            incScore100();
            setIsFlying(false);
            setIsIntersecting(true);
        }
        missleStyle.top = parseInt(missleStyle.top) - 10 + "px";        
    };

    // function to advance enemies across screen/
    const enemyTick = () => {
        const rect = enemy.current.getBoundingClientRect();
        const enemyStyle = enemy.current.style;
        if (!gameOver && rect.left <= 0) {
            laugh.playbackRate = 1.5;
            laugh.play();
            setLives(lives => lives - 1);
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
            const destroyTimer = setTimeout(resetEnemy, 500);
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
    }, !gameOver ? 250 : null);

    useInterval(() => {
        missleTick();
    }, !gameOver && isFlying ? 30 : null);

};

export default useIntersection;