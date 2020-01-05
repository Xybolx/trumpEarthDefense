import React, { useContext } from "react";
import ScoreContext from '../../context/scoreContext';
import SpecialContext from '../../context/specialContext';
import "./stats.css";

const Stats = ({ charge, lives }) => {

    // context
    const { score } = useContext(ScoreContext);
    const { special } = useContext(SpecialContext);

    return (
        <div className="col-md-6 text-left">
                Score <span className="text-white">{score}</span>
                <div className="progress badge" style={{ height: 30 }}>
                    <i className="fas fa-globe-americas fa-fw fa-2x text-light border" />
                    <div className={lives === 3 ? "progress-bar bg-success" : lives === 2 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${lives}` / 3 * 100 + "%" }} aria-valuenow={lives / 3 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
                <div className="progress badge" style={{ height: 30 }}>
                    <i className="fas fa-bolt fa-fw fa-2x text-light border" />
                    <div className={charge === 3 ? "progress-bar bg-success" : charge === 2 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${charge}` / 3 * 100 + "%" }} aria-valuenow={charge / 3 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
                <div className="progress badge" style={{ height: 30 }}>
                    <i className="fas fa-star fa-fw fa-2x text-light border" />
                    <div className={special === 5 ? "progress-bar bg-flash" : special >= 3 ? "progress-bar bg-warning" : "progress-bar bg-danger"} role="progressbar" style={{ width: `${special}` / 5 * 100 + "%" }} aria-valuenow={special / 5 * 100} aria-valuemin="0" aria-valuemax="100" />
                </div>
        </div>
    );
};

export default Stats;