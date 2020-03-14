import { useState, useContext, useEffect } from "react";
import SpecialContext from '../context/specialContext';
import useInterval from '../hooks/useInterval';
import useTimeout from '../hooks/useTimeout';

const useWidthObserver = (missile, wall, gameOver, isFlying, setIsFlying) => {

    missile = missile.current;
    wall = wall.current;

    // state
    const [wallClass, setWallClass] = useState("wall");
    const [isWallIntersect, setIsWallIntersect] = useState(false);

    // context
    const { clearSpecial } = useContext(SpecialContext);

    // audio
    // const no = new Audio('no.mp3');
    const wrong = new Audio('wrong.mp3');

    
    
    const missileTick = () => {
        const rect1 = missile.getBoundingClientRect();
        const rect2 = wall.getBoundingClientRect();
        const missileStyle = missile.style;
        // const rect3 = wall2.current.getBoundingClientRect();

        const wallIntersect = 
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;

        // const wall2Intersect = 
        //     rect1.x < rect3.x + rect3.width &&
        //     rect1.x + rect1.width > rect3.x &&
        //     rect1.y < rect3.y + rect3.height &&
        //     rect1.height + rect1.y > rect3.y;

        switch (true) {

            case !gameOver && rect1.right > (window.innerWidth || document.documentElement.clientWidth):
                setIsFlying(false);
                clearSpecial();
                missileStyle.top = 0 + "px";
                missileStyle.visibility = "hidden";
                break;
            case !gameOver && wallIntersect:
                setIsFlying(false);
                clearSpecial();
                setWallClass("wallAlternate");
                setIsWallIntersect(!isWallIntersect);
                wrong.play();
                missileStyle.top = 0 + "px";
                missileStyle.visibility = "hidden";
                break;
            // case !gameOver && wall2Intersect:
            //     setIsFlying(false);
            //     wrong.play();
            //     missileStyle.top = 0 + "px";
            //     missileStyle.visibility = "hidden";
            //     break;
            default:
                missileStyle.top = parseInt(missileStyle.top) - 10 + "px";
                break;
        }      
    };

    useTimeout(() => {
        setWallClass("wall");
        setIsWallIntersect(!isWallIntersect);
    }, !gameOver && isWallIntersect ? 175 : null);

    useInterval(() => {
        missileTick();
    }, !gameOver && isFlying ? 25 : null);

    return wallClass;
};

export default useWidthObserver;