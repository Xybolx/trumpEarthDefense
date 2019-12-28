import React from 'react';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import CenteredColumn from '../components/centeredColumn';

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
            <CenteredColumn className="instructions">
                <p className="text-white border-bottom"><i className="fas fa-gamepad fa-fw fa-2x" /> Controls</p>
                <p className="mt-2" style={{ color: "yellow" }}><span className="fas fa-long-arrow-alt-up fa-fw fa-2x text-white"></span>= <span className="text-white">Scroll Wheel Up</span></p>
                <p className="mt-2" style={{ color: "yellow" }}><span className="fas fa-long-arrow-alt-down fa-fw fa-2x text-white"></span>= <span className="text-white">Scroll Wheel Down</span></p>
                <p className="mt-2 text-white">Fire <span style={{ color: "yellow" }}>=</span> <span className="text-white">Mouse Click</span></p>
                <p className="text-white">(fires special when bar is full)</p>
                <p className="text-white border-bottom"><i className="fas fa-poll-h fa-fw fa-2x" /> Stat Bars</p>
                <p className="text-white">Earth</p>
                <div className="progress mb-3">
                    <i className="fas fa-globe-americas fa-fw fa-2x text-white" />
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Danger!</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Warning!</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Safe!</div>
                </div>
                <p className="text-white">Laser</p>
                <div className="progress mb-3">
                    <i className="fas fa-bolt fa-fw fa-2x text-white" />
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Empty!</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Charging!</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Fire!</div>
                </div>
                <p className="text-white">Special</p>
                <div className="progress mb-3">
                    <i className="fas fa-star fa-fw fa-2x text-white" />
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Empty!</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Charging!</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "33%" }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Fire!</div>
                </div>
                <NavBtn to="/game">Start</NavBtn>
                <NavBtn to="/">Home</NavBtn>
            </CenteredColumn>
        </div>
    );
};

export default Instructions;