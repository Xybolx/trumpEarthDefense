import React, { useEffect, useRef, useContext, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
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

    let history = useHistory();

    // audio
    const fired = new Audio('fired.wav');
    const allFake = new Audio('all-fake.mp3');

    // refs
    const input = useRef();
    const alert = useRef();

    // useForm custom hook
    const [values, handleChange, handleClearForm] = useForm();

    // de-structure values object
    const { search } = values;

    // context
    const { score, clearScore } = useContext(ScoreContext);

    // useScores custom hook
    const [scores, results] = useScores(search);

    // useArray custom hook
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
        if (scores[0] && score !== 0 && score < scores[0].score) {
            fired.play()
        }
        if (scores[0] && score !== 0 && score >= scores[0].score) {
            allFake.play();
        }
    }, [fired, allFake, score, scores]);

    // handle gamepad controls
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
            <CenteredColumn>
                <Title>{
                    score !== 0 &&
                        scores[0] &&
                        score >= scores[0].score ?
                        "New High Score!" :
                        score !== 0 &&
                            scores[0] &&
                            score < scores[0].score ?
                            "You're Fired!!!" :
                            "High Scores"
                }
                </Title>
                <div style={
                    score !== 0 &&
                        scoreRank.length ?
                        { display: "block" } :
                        score !== 0 &&
                            !scoreRank.length ?
                            { display: "block" } :
                            { display: "none" }
                }
                    ref={alert}
                    id="shame-alert"
                    role="alert"
                    className="alert alert-warning alert-dismissible fade show container">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    <div className="row">
                        <div className="col">
                            <img style={{ width: 80, height: 80 }} className="img-fluid" src="suprise.png" alt="Trump" />
                        </div>
                        <div className="col">
                            <small style={{ width: 80, height: 80 }}>{
                                score !== 0 &&
                                    scores[0] &&
                                    score < scores[0].score ? 
                                    `"${scoreRank.length - 1} player(s) had a better score...YOU'RE FIRED!"` :
                                    score !== 0 &&
                                    scores[0] &&
                                    score >= scores[0].score ?
                                        "\"It's all fake news. Nobody wins but me...\"" : ""
                            }
                            </small>
                        </div>
                    </div>
                </div>
                <div className="input-group input-group-sm sticky-top bg-dark">
                    <input
                        style={
                            score !== 0 &&
                            scoreRank.length ?
                            { display: "none" } :
                            { display: "block" }
                        }
                        ref={input}
                        id="search"
                        name="search"
                        value={search || ""}
                        onChange={handleChange}
                        type="search"
                        className="form-control"
                        placeholder="initials or minimum score"
                        aria-label="Search Scores"
                        aria-describedby="button-search"
                        autoComplete="off"
                    />
                    <div style={
                            score !== 0 &&
                            scoreRank.length ?
                            { display: "none" } :
                            { display: "block" }
                        }
                        className="input-group-append">
                        <Btn 
                            id="button-addon2"
                            onClick={handleClearForm}>
                            Reset
                        </Btn>
                    </div>
                </div>
                <div className="score-table">
                    <Suspense fallback={<div className="spinner-border text-white" role="status" aria-hidden="true" />}>
                        <ScoreTable
                            scores={scores}
                            results={results}
                            mappedScores={mappedScores}
                            mappedResults={mappedResults}
                            search={search}
                        />
                    </Suspense>
                </div>
            <NavBtn className="mt-3" onClick={() => clearScore} to="/">Home</NavBtn>
            </CenteredColumn>
        </PageContainer>
    );
};

export default HighScores;