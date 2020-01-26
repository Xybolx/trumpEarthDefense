import { useState, useEffect, useContext } from "react";
import ScoreContext from "../context/scoreContext";
import SpecialContext from "../context/specialContext";
import useInterval from "./useInterval";

const useIntersection = (missle, enemy, isFlying, setIsFlying, setLives, gameOver) => {

    // state
    const [isIntersecting, setIsIntersecting] = useState(false);

    // context
    const { setScore } = useContext(ScoreContext);
    const { special, setSpecial, clearSpecial } = useContext(SpecialContext);

    // audio elements
    const splode = new Audio("splode.mp3");
    const bong = new Audio("bing-bong.mp3");

    // function to advance player projectile/detect if it reaches the end of the screen/detect intersection
    const missleTick = () => {
        const missleStyle = missle.current.style;
        const rect1 = missle.current.getBoundingClientRect();
        const rect2 = enemy.current.getBoundingClientRect();

        const enemyIntersect = 
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y;

        switch (true) {
                
            case !gameOver && enemyIntersect && special < 5:
                splode.play();
                setScore(score => score + 100);
                setSpecial(special => special + 1);
                setIsFlying(false);
                setIsIntersecting(true);
                break;

            default: 
                missleStyle.top = parseInt(missleStyle.top) - 10 + "px";
                break;
        }      
    };

    // function to advance enemies across screen/
    const enemyTick = () => {
        const rect = enemy.current.getBoundingClientRect();
        const enemyStyle = enemy.current.style;
        if (!gameOver && rect.left <= 0) {
            bong.play();
            setLives(lives => lives - 1);
            enemyStyle.right = 0 + "px";
        }

        if (!gameOver && enemy.current !== null) {
            enemyStyle.right = parseInt(enemyStyle.right) + 10 + "px";
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
            const destroyTimer = setTimeout(resetEnemy, 750);
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
    }, !gameOver ? 250 : null);

    useInterval(() => {
        missleTick();
    }, !gameOver && isFlying ? 25 : null);

};

export default useIntersection;