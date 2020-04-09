import React, { useContext } from 'react';
import ConnectedContext from '../../context/connectedContext';

const GamepadConnected = props => {

    const { connected } = useContext(ConnectedContext);

    return (
        <div className="badge text-left" style={{ height: 35 }}>
            <span style={{ fontSize: "small" }}><i className="fas fa-gamepad fa-fw fa-2x text-white border" /> {connected ? "Connected" : "Not Connected"}</span> 
        </div>
    );
};

export default GamepadConnected;
