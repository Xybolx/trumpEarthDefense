import React, { useEffect, useContext } from 'react';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';

const Instructions = () => {

    const { clearScore } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    useEffect(() => {
        clearScore();
        clearSpecial();
    }, [clearScore, clearSpecial]);

    return (
        <div className="container text-center home-earth">
            <Title>How To Play</Title>
            <div className="instructions col-md-6 offset-md-3">
                <p className="text-white border-bottom"><i className="fas fa-gamepad fa-fw fa-2x" /> Controls</p>
                <p className="text-white">Move Up <span className="fas fa-long-arrow-alt-up fa-fw fa-2x"></span> <span style={{ color: "yellow" }}>Scroll Wheel Up</span></p>
                <p className="text-white">Move Down <span className="fas fa-long-arrow-alt-down fa-fw fa-2x"></span> <span style={{ color: "yellow" }}>Scroll Wheel Down</span></p>
                <p className="text-white mb-3">Fire Laser <span className="far fa-hand-pointer fa-fw fa-2x"></span> <span style={{ color: "yellow" }}>Mouse Click</span></p>
                <div style={{ height: 100, transform: "rotate(90deg)" }} className="container">
                    <img style={{ width: "20%" }} className="img-fluid" src="ship6.png" alt="" />
                </div>
                <p className="text-white border-bottom mt-3"><i className="fas fa-bolt fa-fw fa-2x" /> Laser</p>
                <div className="progress mb-5">
                    <p className="h6 mr-2">Laser</p>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Empty!</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Charging!</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Fire!</div>
                </div>
                <p className="text-white border-bottom"><i className="fas fa-globe-americas fa-fw fa-2x" /> Earth</p>
                <div className="progress mb-5">
                    <p className="h6 mr-2">Earth</p>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Danger!</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Warning!</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Safe!</div>
                </div>
                <NavBtn to="/game">Start</NavBtn>
                <NavBtn to="/">Home</NavBtn>
            </div>
        </div>
    );
};

export default Instructions;