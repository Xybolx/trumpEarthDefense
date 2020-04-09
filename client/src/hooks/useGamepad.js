import React, { useContext } from 'react';
import ConnectedContext from '../context/connectedContext';
import Gamepad from '../components/gamepad/Gamepad';
import GamepadConnected from '../components/gamepad/GamepadConnected';

const useGamepad = (startHandler, backHandler, fireHandler, upHandler, downHandler) => {

    const { toggleTrue, toggleFalse } = useContext(ConnectedContext);

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
        if (value > 0 && axisName === "LeftStickY") {

          console.log(axisName, value, previousValue);
        }

        if (value < 0 && axisName === "LeftStickY") {
          console.log(axisName, value, previousValue);
        }
    };

    const gamepadConnected = <GamepadConnected />

    const gamepad = <Gamepad
                        onConnect={connectHandler}
                        onDisconnect={disconnectHandler}
                        onButtonDown={buttonDownHandler}
                        onButtonUp={buttonUpHandler}
                        onButtonChange={buttonChangeHandler}
                        onAxisChange={axisChangeHandler}
                        onA={fireHandler}
                        onB={() => { }}
                        onX={() => { }}
                        onY={() => { }}
                        onStart={startHandler}
                        onBack={backHandler}
                        onLT={() => { }}
                        onRT={fireHandler}
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

    return { gamepad, gamepadConnected };
};

export default useGamepad;
