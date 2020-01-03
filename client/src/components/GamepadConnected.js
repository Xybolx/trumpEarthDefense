import React, { useContext } from 'react';
import ConnectedContext from '../context/connectedContext';
import Gamepad from 'react-gamepad';

const GamepadConnected = props => {

    const { gamepadConnected, toggleGamepadConnected } = useContext(ConnectedContext);

    const connectHandler = gamepadIndex => {
        toggleGamepadConnected();
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
      };
     
      const disconnectHandler = gamepadIndex => {
        toggleGamepadConnected();
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
      };

    return (
        <div>
            <Gamepad
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
                onUp={props.onUp}
                onDown={props.onDown}
                onRT={props.onRT}>
                <div />
            </Gamepad>
            <div className="badge mt-3 text-left" style={{ height: 35 }}>
                <span style={{ fontSize: "small" }}><i className="fas fa-gamepad fa-fw fa-2x text-white" /> {gamepadConnected ? "Connected" : "Not Connected"}</span> 
            </div>
        </div>
    );
};

export default GamepadConnected;
