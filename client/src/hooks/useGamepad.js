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

    const gamepad = <Gamepad
                        onConnect={connectHandler}
                        onDisconnect={disconnectHandler}
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
