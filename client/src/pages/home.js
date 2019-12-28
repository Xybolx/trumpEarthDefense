import React from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import Gamepad from 'react-gamepad';

const Home = () => {

    // state
    const fake = new Audio('fake.mp3');
    const allFake = new Audio('all-fake.mp3');

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
                onBack={() => {}}
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
            <Title>Trump Earth Defense</Title>
            <CenteredColumn className="home-controls">
                <p>Ready to make Earth great again?</p>
                <NavBtn to="/instructions"><span onClick={() => fake.play()}>I'm Ready!</span></NavBtn>
                <NavBtn to="/scores"><span onClick={() => allFake.play()}>High Scores</span></NavBtn>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;