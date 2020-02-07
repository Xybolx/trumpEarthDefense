import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import CenteredColumn from '../components/centeredColumn';
// import useGamepad from '../hooks/useGamepad';
import './instructions.css';

const Instructions = () => {

    let history = useHistory();

    // handle gamepad controls
    const backHandler = () => {
        history.goBack();
      };
      
      const startHandler = () => {
        history.push("/game");
      };

    // const { gamepad } = useGamepad(startHandler, backHandler);

    // context
    const { clearScore } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    useEffect(() => {
        // audio
        const cheer = new Audio('trump-cheer.mp3');
        cheer.volume = .40;
        cheer.play();
    }, []);

    useEffect(() => {
        clearScore();
        clearSpecial();
    }, [clearScore, clearSpecial]);

    return (
        <div className="container text-center home-earth">
            {/* {gamepad} */}
            <div className="instructions-wrapper">    
                <CenteredColumn className="instructions">
                    <Title>How To Play</Title>
                    <p style={{ fontSize: "small" }} className="text-white"><i className="fas fa-gamepad fa-fw fa-2x border" /> Controls</p>
                    <p style={{ fontSize: "small", color: "yellow" }} className="mt-2"><span className="fas fa-long-arrow-alt-up fa-fw fa-2x text-white"></span>= <small className="text-white">Scroll Wheel Up or DpadUp</small></p>
                    <p style={{ fontSize: "small", color: "yellow" }} className="mt-2"><span className="fas fa-long-arrow-alt-down fa-fw fa-2x text-white"></span>= <small className="text-white">Scroll Wheel Down or DpadDown</small></p>
                    <p style={{ fontSize: "small" }} className="mt-2 text-white">Fire <span style={{ color: "yellow" }}>=</span> <small className="text-white">Mouse Click or RT</small></p>
                    <p style={{ fontSize: "small" }} className="text-white"><small>(fires special when bar is full)</small></p>
                    <p style={{ fontSize: "small" }} className="text-white"><i className="fas fa-poll-h fa-fw fa-2x border" /> Stat Bars</p>
                    <p style={{ fontSize: "small" }} className="text-white p-head">Earth</p>
                    <div className="progress mb-3">
                        <i className="fas fa-globe-americas fa-fw fa-2x text-white border" />
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
                    <p style={{ fontSize: "small" }} className="text-white p-head">Laser</p>
                    <div className="progress mb-3">
                        <i className="fas fa-bolt fa-fw fa-2x text-white border" />
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
                    <p style={{ fontSize: "small" }} className="text-white p-head">Special</p>
                    <div className="progress mb-3">
                        <i className="fas fa-star fa-fw fa-2x text-white border" />
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
            <NavBtn className="mt-3" onClick={backHandler}>Back</NavBtn>
            <NavBtn className="mt-3" onClick={() => history.push("/game")}>I'm Ready!</NavBtn>
        </div>
    );
};

export default Instructions;