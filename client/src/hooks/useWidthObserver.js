import { useContext } from "react";
import SpecialContext from '../context/specialContext';
import useInterval from '../hooks/useInterval';

const useWidthObserver = (missile, wall, wall2, gameOver, isFlying, setIsFlying) => {

    // context
    const { clearSpecial } = useContext(SpecialContext);

    // audio
    const no = new Audio('no.mp3');
    const wrong = new Audio('wrong.mp3');

    const missileTick = () => {
        const missileStyle = missile.current.style;
        const rect1 = missile.current.getBoundingClientRect();
        const rect2 = wall.current.getBoundingClientRect();
        const rect3 = wall2.current.getBoundingClientRect();

        const wallIntersect = 
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y;

        const wall2Intersect = 
            rect1.x < rect3.x + rect3.width &&
            rect1.x + rect1.width > rect3.x &&
            rect1.y < rect3.y + rect3.height &&
            rect1.height + rect1.y > rect3.y;

        switch (true) {

            case !gameOver && rect1.right > (window.innerWidth || document.documentElement.clientWidth):
                clearSpecial();
                setIsFlying(false);
                missileStyle.top = 0 + "px";
                missileStyle.visibility = "hidden";
                break;
            case !gameOver && wallIntersect:
                setIsFlying(false);
                no.play();
                missileStyle.top = 0 + "px";
                missileStyle.visibility = "hidden";
                break;
            case !gameOver && wall2Intersect:
                setIsFlying(false);
                wrong.play();
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