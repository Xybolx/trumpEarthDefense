import React, { useEffect, useRef, useContext, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useArray from '../hooks/useArray';
import useScores from '../hooks/useScores';
import ScoreContext from '../context/scoreContext';
import PageContainer from '../components/pageContainer';
import ShameAlert from '../components/alerts/ShameAlert';
import useGamepad from '../hooks/useGamepad';
import Title from '../components/title';
import CenteredColumn from '../components/centeredColumn';
import NavBtn from '../components/buttons/NavBtn';
import HighScoresForm from '../components/forms/HighScoresForm';
import './HighScores.css';

// lazy loaded component
const ScoreTable = lazy(() => (
    import('../components/scoreTable')
));

const HighScores = () => {

    // handle gamepad controls
    const backHandler = () => {
        history.goBack("/");
      };
      
      const startHandler = () => {
        history.push("/instructions");
      };

    const { gamepad } = useGamepad(startHandler, backHandler);

    // new useHistory hook from react router
    let history = useHistory();

    // audio
    const fired = new Audio('fired.wav');
    const allFake = new Audio('all-fake.mp3');

    // refs
    const inputRef = useRef();

    // useForm custom hook
    const [values, handleChange, handleSubmit, handleClearForm] = useForm();

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

    // map the results array we returned from our useScores custom hook
    const mappedScoreRank = scoreRank.map((result, index) => (
        <tr key={result._id}>
            <th scope="row">{index + 1}</th>
            <td>{result.initials}</td>
            <td>{result.score}</td>
        </tr>
    ));

    // focus on the search input on mount
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // filter the scores to find the scores that are higher than the current player score
    useEffect(() => {
        const filteredScores = scores.filter(item => item.score >= score);
        setScoreRank(filteredScores);
    }, [score, scores, setScoreRank]);

    // play a sound based on if the player has the highest score or not 
    useEffect(() => {
        if (scores[0] && score !== null && score < scores[0].score) {
            fired.play()
        }
        if (scores[0] && score !== null && score >= scores[0].score) {
            allFake.play();
        }
    }, [fired, allFake, score, scores]);

    // useEffect(() => {
    //     if (scores && score === null) {
    //         fake.play();
    //     }
    // }, [fake, score, scores]);

    // function to redirect when the back button is clicked
    const redirect = () => {
        clearScore();
        history.replace("/");
    };

    return (
        <PageContainer className="home-earth">
            {gamepad}
            <CenteredColumn>
                <Title>{
                    score !== null &&
                        scores[0] &&
                        score >= scores[0].score ?
                        "New High Score!" :
                        score !== null &&
                            scores[0] &&
                            score < scores[0].score ?
                            "You're Fired!!!" :
                            "High Scores"
                }
                </Title>
                <ShameAlert
                    scores={scores}
                    scoreRank={scoreRank}
                />
                <HighScoresForm
                    style={
                        score === null &&
                        scoreRank.length ?
                        { display: "none" } :
                        { display: "block" }
                    }
                    ref={inputRef}
                    scoreRank={scoreRank}
                    search={search}
                    handleChange={handleChange}
                    handleClearForm={handleClearForm} 
                />
                <Suspense fallback={<div className="spinner-border text-white" role="status" aria-hidden="true" />}>
                    <ScoreTable
                        scores={scores}
                        results={results}
                        mappedScores={mappedScores}
                        mappedResults={mappedResults}
                        mappedScoreRank={mappedScoreRank}
                        search={search}
                    />
                </Suspense>
                <NavBtn 
                    className="mt-3" 
                    onClick={redirect}>
                    Back
                </NavBtn>
                <NavBtn 
                    className="mt-3" 
                    onClick={() => history.push("/instructions")}>
                    I'm Ready!
                </NavBtn> 
            </CenteredColumn>
        </PageContainer>
    );
};

export default HighScores;