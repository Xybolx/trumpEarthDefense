import Instructions from "../../pages/intructions";
import Initials from "../../pages/initials";
import Home from "../../pages/home";
import HighScores from "../../pages/HighScores";
import GameContainer from "../../pages/gameContainer";

const routes = [

    {
        id: 1,
        path: '/',
        component: Home
    },

    {
        id: 2,
        path: '/initials',
        component: Initials
    },

    {   id: 3,
        path: '/instructions',
        component: Instructions
    },

    {
        id: 4,
        path: '/scores',
        component: HighScores
    },

    {
        id: 5,
        path: '/game',
        component: GameContainer
    }
];

export default routes;