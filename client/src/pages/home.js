import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import Gamepad from 'react-gamepad';
import ScoreContext from '../context/scoreContext';

const Home = () => {

    let history = useHistory();

    // context
    const { clearScore } = useContext(ScoreContext);

    // clear score on mount
    useEffect(() => {
      clearScore();
    }, [clearScore]);

    // audio
    const fake = new Audio('fake.mp3');

    // handle gamepad controls
      const backHandler = () => {
        history.push("/scores");
        fake.play();
      };

      const startHandler = () => {
        history.push("/instructions");
        fake.play();
      };
    
    return (
        <PageContainer className="home-earth">
            <Gamepad
                onRB={startHandler}
                onLB={backHandler}>
                <div />
            </Gamepad>
            <CenteredColumn>
              <Title>Trump Earth Defense</Title>
            </CenteredColumn>
            <CenteredColumn className="home-controls">
                <p className="m-3">Ready to make Earth great again?</p>
                <NavBtn className="mt-3" onClick={startHandler}>I'm Ready!</NavBtn>
                <NavBtn className="mt-3" onClick={backHandler}>High Scores</NavBtn>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;