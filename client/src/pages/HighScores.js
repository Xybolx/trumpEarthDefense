import React, { useEffect, useRef, useContext, lazy, Suspense } from 'react';
import useForm from '../hooks/useForm';
import useArray from '../hooks/useArray';
import useScores from '../hooks/useScores';
import ScoreContext from '../context/scoreContext';
import PageContainer from '../components/pageContainer';
import Gamepad from 'react-gamepad';
import Title from '../components/title';
import CenteredColumn from '../components/centeredColumn';
import NavBtn from '../components/buttons/NavBtn';
import './HighScores.css';
import Btn from '../components/buttons/Btn';

// lazy loaded component
const ScoreTable = lazy(() => (
    import('../components/scoreTable')
));

const HighScores = () => {

    // audio
    const fired = new Audio('fired.wav');
    const allFake = new Audio('all-fake.mp3');

    // input ref
    const input = useRef();

    // useForm custom hook
    const [values, handleChange, handleClearForm] = useForm();

    // de-structure values object
    const { search } = values;

    // context
    const { score, clearScore } = useContext(ScoreContext);

    // useScores custom hook
    const [scores, results] = useScores(search);

    // state
    const [scoreRank, setScoreRank] = useArray([]);

    // map the scores array we returned from our useScores custom hook
    const mappedScores = scores.map((score, index) => (
        <tr key={score._id}>
            <th scope="row">{index + 1}</th>
            <td>{score.initials}</td>
            <td>{score.score}</td>
        </tr>
    ));

    // map the results array we returned from our useScores custom hook
    const mappedResults = results.map((result, index) => (
        <tr key={result._id}>
            <th scope="row">{index + 1}</th>
            <td>{result.initials}</td>
            <td>{result.score}</td>
        </tr>
    ));

    // filter the scores to return all scores that are less than or equal to the current player score
    useEffect(() => {
        const filteredScores = scores.filter(item => item.score >= score);
        setScoreRank(filteredScores);
        input.current.focus();
    }, [score, scores, setScoreRank]);

    // play a sound based on if the player has the highest score or not 
    useEffect(() => {
        if (scores[1] && score !== 0 && score < scores[1].score) {
            fired.play()
        }
        if (scores[1] && score !== 0 && score > scores[1].score) {
            allFake.play();
        }
    }, [fired, allFake, score, scores]);

    // handle gamepad controls
    const connectHandler = gamepadIndex => {
        // setGamepadConnected(true);
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
    };

    const disconnectHandler = gamepadIndex => {
        //   setGamepadConnected(false);
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
    };

    const backHandler = () => {
        window.location = "/";
    };

    const startHandler = () => {
        window.location = "/instructions";
    };

    return (
        <PageContainer className="home-earth">
            <Gamepad
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
                onStart={startHandler}
                onBack={backHandler}>
                <div />
            </Gamepad>
            <Title>{
                score !== 0 &&
                    scores[1] &&
                    score > scores[1].score ?
                    "New High Score!" :
                    score !== 0 &&
                        scores[1] &&
                        score < scores[1].score ?
                        "You're Fired!!!" :
                        "High Scores"
            }
            </Title>
            <CenteredColumn>
                <div>
                    <small>
                        <label className="text-white" htmlFor="search">Search by minimum score or initials...</label>
                    </small>
                </div>
                <div style={
                    score !== 0 &&
                        scoreRank.length ?
                        { display: "block" } :
                        score !== 0 &&
                            !scoreRank.length ?
                            { display: "block" } :
                            { display: "none" }
                }
                    id="shame-alert"
                    className="alert alert-warning alert-dismissible fade show container" role="alert">
                    <div className="row">
                        <div className="col">
                            <img style={{ width: 150, height: 150 }} className="img-fluid" src="trump-kiss.png" alt="Trump" />
                        </div>
                        <div className="col">
                            <small>{
                                score !== 0 &&
                                    scores[1] &&
                                    score <= scores[1].score ?
                                    `"${scoreRank.length} people scored better than you. I don't do business with losers... YOU'RE FIRED!"` :
                                    score !== 0 &&
                                        scores[1] &&
                                        score > scores[1].score ?
                                        "\"It's all fake news. Nobody wins but me...\"" : ""
                            }
                            </small>
                        </div>
                    </div>
                </div>
                <div className="input-group sticky-top bg-dark">
                    <input
                        ref={input}
                        id="search"
                        name="search"
                        value={search || ""}
                        onChange={handleChange}
                        type="search"
                        className="form-control"
                        placeholder="search..."
                        aria-label="Search Scores"
                        aria-describedby="button-search"
                        autoComplete="off"
                    />
                    <div className="input-group-append">
                        <Btn onClick={handleClearForm} id="button-addon2">
                            Reset
                        </Btn>
                    </div>
                </div>
                <Suspense fallback={<div className="spinner-border text-white" role="status" aria-hidden="true" />}>
                    <ScoreTable
                        scores={scores}
                        results={results}
                        mappedScores={mappedScores}
                        mappedResults={mappedResults}
                        search={search}
                    />
                </Suspense>
            </CenteredColumn>
            <NavBtn onClick={() => clearScore} to="/">Home</NavBtn>
        </PageContainer>
    );
};

export default HighScores;