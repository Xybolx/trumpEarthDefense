import React, { useState, useContext, useEffect } from 'react';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import CenteredColumn from '../components/centeredColumn';
import Gamepad from 'react-gamepad';

const Instructions = () => {

    // context
    const { clearScore } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    // state
    const [gamepadConnected, setGamepadConnected] = useState(false);

    useEffect(() => {
        clearScore();
        clearSpecial();
    }, [clearScore, clearSpecial]);

    // handle gamepad controls
    const connectHandler = gamepadIndex => {
        setGamepadConnected(true);
        console.log(`Gamepad ${gamepadIndex + 1} connected !`);
      };
     
      const disconnectHandler = gamepadIndex => {
          setGamepadConnected(false);
        console.log(`Gamepad ${gamepadIndex + 1} disconnected !`);
      };
     
      const startHandler = () => {
        window.location = "/game";
      };

      const backHandler = () => {
        window.location = "/";
      };

    return (
        <div className="container text-center home-earth">
            <Gamepad
                onConnect={connectHandler}
                onDisconnect={disconnectHandler}
                onStart={startHandler}
                onBack={backHandler}>
                <div />
            </Gamepad>
            <Title>How To Play</Title>
            <CenteredColumn className="instructions">
                <p className="text-white border-bottom"><i className="fas fa-gamepad fa-fw fa-2x" /> Controls</p>
                <p className="mt-2" style={{ color: "yellow" }}><span className="fas fa-long-arrow-alt-up fa-fw fa-2x text-white"></span>= <span className="text-white">Scroll Wheel Up or DpadUp</span></p>
                <p className="mt-2" style={{ color: "yellow" }}><span className="fas fa-long-arrow-alt-down fa-fw fa-2x text-white"></span>= <span className="text-white">Scroll Wheel Down or DpadDown</span></p>
                <p className="mt-2 text-white">Fire <span style={{ color: "yellow" }}>=</span> <span className="text-white">Mouse Click or RT</span></p>
                <p className="text-white">(fires special when bar is full)</p>
                <p className="text-white border-bottom"><i className="fas fa-poll-h fa-fw fa-2x" /> Stat Bars</p>
                <p className="text-white border-bottom"><i className="fas fa-gamepad fa-fw fa-2x text-white" /> Gamepad</p>
                <div className="badge mb-3" style={{ height: 30 }}>
                    <span style={{ fontSize: "small" }}><i className="fas fa-gamepad fa-fw fa-2x text-white" /> {gamepadConnected ? "Connected" : "Not Connected"}</span> 
                </div>
                <p className="text-white border-bottom">Earth</p>
                <div className="progress mb-3">
                    <i className="fas fa-globe-americas fa-fw fa-2x text-white" />
                    <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Danger!
                    </div>
                    <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Warning!
                    </div>
                    <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Safe!
                    </div>
                </div>
                <p className="text-white border-bottom">Laser</p>
                <div className="progress mb-3">
                    <i className="fas fa-bolt fa-fw fa-2x text-white" />
                    <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Empty!
                    </div>
                    <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Charging!
                    </div>
                    <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Fire!
                    </div>
                </div>
                <p className="text-white border-bottom">Special</p>
                <div className="progress mb-3">
                    <i className="fas fa-star fa-fw fa-2x text-white" />
                    <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Empty!
                    </div>
                    <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Charging!
                    </div>
                    <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: "33%" }} 
                        aria-valuenow="33" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                            Fire!
                    </div>
                </div>
                <NavBtn to="/">Back</NavBtn>
                <NavBtn to="/game">Start</NavBtn>
            </CenteredColumn>
        </div>
    );
};

export default Instructions;