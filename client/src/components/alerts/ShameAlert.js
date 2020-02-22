import React, { useContext } from 'react';
import ScoreContext from '../../context/scoreContext';

const ShameAlert = props => {

    const { score } = useContext(ScoreContext);

    return (
        <div style={
            score !== null &&
                props.scoreRank.length ?
                { display: "block" } :
                score !== null &&
                    !props.scoreRank.length ?
                    { display: "block" } :
                    { display: "none" }
        }
            id="shame-alert"
            role="alert"
            className="alert alert-warning alert-dismissible fade show container">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            <div className="row">
                <div className="col-md-6 alert-img">
                    <img style={{ width: 80, height: 80 }} className="img-fluid" src="suprise.png" alt="Trump" />
                </div>
                <div className="col-md-6">
                    <small style={{ width: 80, height: 80 }}>{
                        score !== null &&
                            props.scores[0] &&
                            score < props.scores[0].score ? 
                            `"You didn't get the top score!...YOU'RE FIRED!"` :
                            score !== null &&
                            props.scores[0] &&
                            score >= props.scores[0].score ?
                                "\"It's all fake news. Nobody wins but me...\"" : ""
                    }
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ShameAlert
