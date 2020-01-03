import Instructions from "../../pages/intructions";
import Initials from "../../pages/initials";
import Home from "../../pages/home";
import HighScores from "../../pages/HighScores";
import GameContainer from "../../pages/gameContainer";

const routes = [

    {
        path: '/',
        component: Home
    },

    {
        path: '/initials',
        component: Initials
    },

    {
        path: '/instructions',
        component: Instructions
    },

    {
        path: '/scores',
        component: HighScores
    },

    {
        path: '/game',
        component: GameContainer
    }
];

export default routes;