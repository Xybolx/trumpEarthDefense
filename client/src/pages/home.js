import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import ScoreContext from '../context/scoreContext';
import useGamepad from '../hooks/useGamepad';

const Home = () => {

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
      history.push("/scores");
    };

    const redirect = () => {
      fake.play();
      history.push("/scores");
    };
    
    const { gamepad } = useGamepad(startHandler);
    
    return (
        <PageContainer className="home-earth">
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