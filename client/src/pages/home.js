import React, { useState, useEffect, useContext } from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import Gamepad from 'react-gamepad';
import ScoreContext from '../context/scoreContext';

const Home = () => {

    // context
    const { clearScore } = useContext(ScoreContext);

    // clear score on mount
    useEffect(() => {
      clearScore();
    }, [clearScore]);

    // state
   const [gamepadConnected, setGamepadConnected] = useState(false);

    // audio
    const fake = new Audio('fake.mp3');

    const numbers = useFizzBuzz(200);

    console.log(numbers);

    // handle gamepad controls
    const connectHandler = gamepadIndex => {
        setGamepadConnected(true);
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
      };
     
      const disconnectHandler = gamepadIndex => {
          setGamepadConnected(false);
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
      };

      const backHandler = () => {
        window.location = "/scores";
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
            <Title>Trump Earth Defense</Title>
            <CenteredColumn className="home-controls">
                <p className="mb-3">Ready to make Earth great again?</p>
                <NavBtn className="mt-3" onClick={() => fake.play()} to="/instructions">I'm Ready!</NavBtn>
                <NavBtn className="mt-3" onClick={() => fake.play()} to="/scores">High Scores</NavBtn>
                <div className="badge mt-3" style={{ height: 30 }}>
                    <span style={{ fontSize: "small" }}><i className="fas fa-gamepad fa-fw fa-2x text-white" /> {gamepadConnected ? "Connected" : "Not Connected"}</span> 
                </div>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;