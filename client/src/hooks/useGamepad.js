import React, { useContext } from 'react';
import ConnectedContext from '../context/connectedContext';
import Gamepad from 'react-gamepad';

const useGamepad = (startHandler, backHandler, aHandler, upHandler, downHandler) => {

    const { connected, toggleTrue, toggleFalse } = useContext(ConnectedContext);

    const connectHandler = gamepadIndex => {
        toggleTrue();
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
      };
     
    const disconnectHandler = gamepadIndex => {
        toggleFalse();
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
      };
    
    const buttonDownHandler = buttonName => {
      console.log(buttonName, 'down');
    };
    
    const buttonUpHandler = buttonName => {
      console.log(buttonName, 'up');
    };

    const buttonChangeHandler = (buttonName, down) => {
      console.log(buttonName, down);
    };
    
    const axisChangeHandler = (axisName, value, previousValue) => {
        console.log(axisName, value, previousValue);
    };

    const gamepad = <Gamepad
                        onConnect={connectHandler}
                        onDisconnect={disconnectHandler}
                        onButtonDown={buttonDownHandler}
                        onButtonUp={buttonUpHandler}
                        onButtonChange={buttonChangeHandler}
                        onAxisChange={axisChangeHandler}
                        onA={aHandler}
                        onB={() => { }}
                        onX={() => { }}
                        onY={() => { }}
                        onStart={startHandler}
                        onBack={backHandler}
                        onLT={() => { }}
                        onRT={aHandler}
                        onLB={() => { }}
                        onRB={() => { }}
                        onLS={() => { }}
                        onRS={() => { }}
                        onUp={upHandler}
                        onDown={downHandler}
                        onLeft={() => { }}
                        onRight={() => { }}>
                        <div />
                    </Gamepad>

    return { gamepad, connected };
};

export default useGamepad;
