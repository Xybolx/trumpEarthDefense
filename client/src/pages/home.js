import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import ScoreContext from '../context/scoreContext';
import useGamepad from '../hooks/useGamepad';
import useInterval from '../hooks/useInterval';

const Home = () => {

    const earthRef = useRef();

    useInterval(() => {
      earthRef.current.className = "alternate";
  }, 2500);

    useInterval(() => {
      earthRef.current.className = "home-earth";
  }, 5000);

    let history = useHistory();

    const fake = new Audio("fake.mp3");

    // context
    const { clearScore } = useContext(ScoreContext);
    
    // clear score on mount
    useEffect(() => {
      clearScore();
    }, [clearScore]);
    
    // handle gamepad controls
    const startHandler = () => {
      history.push("/instructions");
    };

    const aHandler = () => {
      console.log('home a press!');
    };

    const redirect = () => {
      fake.play();
      history.push("/scores");
    };
    
    const { gamepad } = useGamepad(startHandler, aHandler);
    
    return (
        <PageContainer ref={earthRef} className="home-earth">
          {gamepad}
            <CenteredColumn>
              <Title>Trump Earth Defense</Title>
            </CenteredColumn>
            <CenteredColumn className="home-controls">
                <small className="m-3">Ready to make Earth great again?</small>
                <div className="text-center">
                  <NavBtn className="mt-3" onClick={startHandler}>I'm Ready!</NavBtn>
                  <NavBtn className="mt-3" onClick={redirect}>High Scores</NavBtn>
                </div>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;