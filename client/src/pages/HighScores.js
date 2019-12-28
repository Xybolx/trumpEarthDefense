import React, { useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';
import useScores from '../hooks/useScores';
import PageContainer from '../components/pageContainer';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import Gamepad from 'react-gamepad';
import './HighScores.css';

const ScoreTable = React.lazy(() => (
    import('../components/scoreTable')
));

const HighScores = () => {

    // input ref
    const input = useRef();

    // useForm custom hook
    const [values, handleChange, handleClearForm] = useForm();

    // de-structure values object
    const { search } = values;

    // useScores custom hook
    const [scores, results] = useScores(search);

    // map the scores array we returned from our useScores custom hook
    const mappedScores = scores.map((score, index) => (
        <tr key={score._id}>
            <th scope="row">{index + 1}</th>
            <td>{score.initials}</td>
            <td>{score.score}</td>
        </tr>
    ));

    const mappedResults = results.map((result, index) => (
        <tr key={result._id}>
            <th scope="row">{index + 1}</th>
            <td>{result.initials}</td>
            <td>{result.score}</td>
        </tr>
    ));

    useEffect(() => {
        input.current.focus();
    }, []);

    // handle gamepad controls
    const connectHandler = gamepadIndex => {
        // setGamepadConnected(true);
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
      };
     
      const disconnectHandler = gamepadIndex => {
        //   setGamepadConnected(false);
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
      };
     
      const buttonChangeHandler = (buttonName, down) => {
        console.log(buttonName, down)
      };
     
      const axisChangeHandler = (axisName, value, previousValue) => {
        console.log(axisName, value)
      };
     
      const buttonDownHandler = buttonName => {
        console.log(buttonName, 'down')
      };
     
      const buttonUpHandler = buttonName => { 
        console.log(buttonName, 'up')
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
                onButtonDown={buttonDownHandler}
                onButtonUp={buttonUpHandler}
                onButtonChange={buttonChangeHandler}
                onAxisChange={axisChangeHandler}
                onA={() => {}}
                onB={() => {}}
                onX={() => {}}
                onY={() => {}}
                onStart={startHandler}
                onBack={backHandler}
                onLT={() => {}}
                onRT={() => {}}
                onLB={() => {}}
                onRB={() => {}}
                onLS={() => {}}
                onRS={() => {}}
                onUp={() => {}}
                onDown={() => {}}
                onLeft={() => {}}
                onRight={() => {}}>
                <div />
            </Gamepad>
            <Title>High Scores</Title>
            <div className="col-md-6 offset-md-3 table-responsive">
                <div>
                    <small>
                        <label className="text-white" htmlFor="search">Search by minimum score or initials...</label>
                    </small>
                </div>
                <div className="input-group sticky-top bg-dark">
                    <input ref={input} id="search" name="search" value={search || ""} onChange={handleChange} type="search" className="form-control" placeholder="search..." aria-label="Search Scores" aria-describedby="button-search" autoComplete="off" />
                    <div className="input-group-append">
                        <button onClick={handleClearForm} className="btn btn-outline-light" type="button" id="button-addon2">&nbsp;&nbsp;Reset&nbsp;&nbsp;</button>
                    </div>
                </div>
                <React.Suspense fallback={<div className="spinner-border text-white" role="status" aria-hidden="true" />}>
                    <ScoreTable 
                        scores={scores} 
                        results={results} 
                        mappedScores={mappedScores} 
                        mappedResults={mappedResults}
                        search={search} 
                    />
                </React.Suspense>
            </div>
            <div style={{ marginTop: 10 }}>
                <NavBtn to="/">Home</NavBtn>
            </div>
        </PageContainer>
    );
};

export default HighScores;