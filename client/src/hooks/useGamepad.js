import React, { useContext } from 'react';
import ConnectedContext from '../context/connectedContext';
import Gamepad from '../components/gamepad/Gamepad';

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
      // console.log(buttonName, 'down');
    };
    
    const buttonUpHandler = buttonName => {
      // console.log(buttonName, 'up');
    };

    const upDownHandler = buttonName => {
      if (buttonName === 'DpadUp') {
        upHandler();
        console.log(buttonName, 'down');
      }
    };
    
    const upUpHandler = buttonName => {
      if (buttonName === 'DpadUp') {
        console.log(buttonName, 'up');
      }
    };

    const downUpHandler = buttonName => {
      if (buttonName === 'DpadDown') {
        console.log(buttonName, 'up');
      }
    };
    
    const downDownHandler = buttonName => {
      if (buttonName === 'DpadDown') {
        downHandler();
        console.log(buttonName, 'down');
      }
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
                        onUpDown={upDownHandler}
                        onUpUp={upUpHandler}
                        onDownUp={downUpHandler}
                        onDownDown={downDownHandler}
                        onLeft={() => { }}
                        onRight={() => { }}>
                        <div />
                    </Gamepad>

    return { gamepad, connected };
};

export default useGamepad;
