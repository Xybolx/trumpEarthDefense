import React, { useContext, useEffect } from 'react';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import CenteredColumn from '../components/centeredColumn';
import Gamepad from 'react-gamepad';
import './instructions.css';

const Instructions = () => {

    // context
    const { clearScore } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    useEffect(() => {
        clearScore();
        clearSpecial();
    }, [clearScore, clearSpecial]);

    // handle gamepad controls
      const startHandler = () => {
        window.location = "/game";
      };

      const backHandler = () => {
        window.location = "/";
      };

    return (
        <div className="container text-center home-earth">
            <Gamepad
                onStart={startHandler}
                onBack={backHandler}>
                <div />
            </Gamepad>
            <Title>How To Play</Title>
            <div className="instructions-wrapper">    
                <CenteredColumn className="instructions">
                    <p style={{ fontSize: "small" }} className="text-white border-bottom"><i className="fas fa-gamepad fa-fw fa-2x" /> Controls</p>
                    <p style={{ fontSize: "small", color: "yellow" }} className="mt-2"><span className="fas fa-long-arrow-alt-up fa-fw fa-2x text-white"></span>= <small className="text-white">Scroll Wheel Up or DpadUp</small></p>
                    <p style={{ fontSize: "small", color: "yellow" }} className="mt-2"><span className="fas fa-long-arrow-alt-down fa-fw fa-2x text-white"></span>= <small className="text-white">Scroll Wheel Down or DpadDown</small></p>
                    <p style={{ fontSize: "small" }} className="mt-2 text-white">Fire <span style={{ color: "yellow" }}>=</span> <small className="text-white">Mouse Click or RT</small></p>
                    <p style={{ fontSize: "small" }} className="text-white">(fires special when bar is full)</p>
                    <p style={{ fontSize: "small" }} className="text-white border-bottom"><i className="fas fa-poll-h fa-fw fa-2x" /> Stat Bars</p>
                    <p style={{ fontSize: "small" }} className="text-white border-bottom">Earth</p>
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
                    <p style={{ fontSize: "small" }} className="text-white border-bottom">Laser</p>
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
                    <p style={{ fontSize: "small" }} className="text-white border-bottom">Special</p>
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
                </CenteredColumn>
            </div>
            <NavBtn className="mt-3" to="/">Back</NavBtn>
            <NavBtn className="mt-3" to="/game">Start</NavBtn>
        </div>
    );
};

export default Instructions;