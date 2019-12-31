import React, { useEffect, useContext } from 'react';
import API from '../utils/API';
import useArray from '../hooks/useArray';
import PageContainer from '../components/pageContainer';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import Gamepad from 'react-gamepad';
import './HighScores.css';
import ScoreContext from '../context/scoreContext';

const GameOver = () => {

    // audio
    const out = new Audio('fired.wav');
    const allFake = new Audio('all-fake.mp3');

    // context
    const { score, clearScore } = useContext(ScoreContext);

    const [scores, setScores] = useArray([]);

    const filteredScores = scores.filter(highScore => highScore.score > score)

    // state
    const [scoreRank, setScoreRank] = useArray(filteredScores);

    // map the scores array we returned from our useScores custom hook
    const mappedScores = scoreRank.map((score, index) => (
        <tr key={score._id}>
            <th scope="row">{index + 1}</th>
            <td>{score.initials}</td>
            <td>{score.score}</td>
        </tr>
    ));

    // get all scores on mount
    useEffect(() => {
        API.getScores()
            .then(res => setScores(res.data))
            .then(() => setScoreRank(filteredScores))
            .catch(err => console.log(err));
    }, []);

    // useEffect(() => {
    //     if (scoreRank.length) {
    //         out.play()
    //     }
    //     if (!scoreRank.length) {
    //         allFake.play();
    //     }
    // }, [out, allFake, scoreRank.length, scores]);

    // handle gamepad controls
    const connectHandler = gamepadIndex => {
        // setGamepadConnected(true);
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
    };

    const disconnectHandler = gamepadIndex => {
        //   setGamepadConnected(false);
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
    };

    const startHandler = () => {
        window.location = "/";
    };

    return (
        <PageContainer className="home-earth">
            <Gamepad
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
                onStart={startHandler}>
                <div />
            </Gamepad>
            <Title>{
                score !== 0 && 
                scores[0] &&
                score > scores[0].score ? 
                "New High Score!" :
                "High Scores"
            }
            </Title>
            <div className="text-white"></div>
            <div className="col-md-6 offset-md-3 table-responsive">
                <div>
                    <small>
                        <label className="text-white" htmlFor="search">Search by minimum score or initials...</label>
                    </small>
                </div>
                <div id="shame-alert" className="alert alert-warning alert-dismissible fade show container" role="alert">
                    <div className="row">
                        <div className="col">
                            <img style={{ width: 150, height: 150 }} className="img-fluid" src="trump-kiss.png" alt="Trump" />
                        </div>
                        <div className="col">
                            {scoreRank.length ? scoreRank.length + " \"player(s) had a better score than you... YOU'RE FIRED!\"" : !scoreRank.length ? "\"It's all fake news. It never happened. Totally phony...\"" : ""}
                        </div>
                    </div>
                </div>
            <table style={ scoreRank.length ? { display: "block" } : { display: "none" }} className="table table-borderless">
            <thead className="th-row">
                <tr className="text-white">
                    <th>#</th>
                    <th>Initials</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody style={{ color: "yellow" }}>
                {mappedScores}
            </tbody>
        </table>
            </div>
            <div style={{ marginTop: 10 }}>
                <NavBtn onClick={() => clearScore} to="/">Home</NavBtn>
            </div>
        </PageContainer>
    );
};

export default GameOver;