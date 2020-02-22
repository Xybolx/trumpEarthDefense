import { useState, useEffect, useContext } from "react";
import ScoreContext from "../context/scoreContext";
import SpecialContext from "../context/specialContext";
import useInterval from "./useInterval";

const useIntersection = (missile, enemy, enemyRightStyle, enemyClassName, isFlying, setIsFlying, setLives, gameOver) => {

    // state
    const [isIntersecting, setIsIntersecting] = useState(false);

    // context
    const { setScore } = useContext(ScoreContext);
    const { setSpecial } = useContext(SpecialContext);

    // audio elements
    const splode = new Audio("splode.mp3");
    const bong = new Audio("bing-bong.mp3");

    // function to advance player projectile/detect if it reaches the end of the screen/detect intersection
    const missileTick = () => {
        const missileStyle = missile.current.style;
        const rect1 = missile.current.getBoundingClientRect();
        const rect2 = enemy.current.getBoundingClientRect();

        const enemyIntersect = 
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y;

        switch (true) {
                
            case !gameOver && enemyIntersect:
                splode.play();
                setScore(score => score + 100);
                setSpecial(special => special + 1);
                setIsFlying(false);
                setIsIntersecting(true);
                break;

            default: 
                missileStyle.top = parseInt(missileStyle.top) - 10 + "px";
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

    const bossMissileTick = () => {
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
        const missileStyle = missile.current.style;
        const enemyStyle = enemy.current.style;
        const missileRect = missile.current.getBoundingClientRect();

        const resetEnemy = () => {
            setIsIntersecting(false);
            enemy.current.className = enemyClassName;
            enemyStyle.right = enemyRightStyle + "px";
        };

        if (isIntersecting && enemy.current !== null) {
            const destroyTimer = setTimeout(resetEnemy, 750);
            missileStyle.top = 0 + "px";
            missileStyle.visibility = "hidden";
            enemyStyle.top = missileRect.top + "px";
            enemy.current.className = "destroyed";
            return () => {
                clearTimeout(destroyTimer);
            };
        }
    }, [missile, enemy, isIntersecting, enemyRightStyle, enemyClassName]);

    useInterval(() => {
        enemyTick();
    }, !gameOver ? 100 : null);

    useInterval(() => {
        missileTick();
    }, !gameOver && isFlying ? 25 : null);

    // useInterval(() => {
    //     bossMissileTick();
    // }, !gameOver && isFlying ? 25 : null);

};

export default useIntersection;