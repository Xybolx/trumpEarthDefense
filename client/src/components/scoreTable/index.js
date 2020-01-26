import React from 'react';
import Spinner from '../spinner';
import './scoreTable.css';

const ScoreTable = ({ scores, results, mappedScores, mappedResults, mappedScoreRank, search }) => {

    return (
        <div className="score-table">
            <table className="table table-borderless">
                <thead className="th-row">
                    <tr className="text-white">
                        <th className="score-table-head">#</th>
                        <th className="score-table-head">Initials</th>
                        <th className="score-table-head">Score</th>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>DJT</td>
                        <td><i className="fas fa-infinity" /></td>
                    </tr>
                </thead>
                <tbody style={{ color: "yellow" }}>
                {
                    scores.length && 
                    !search ?
                    mappedScores :
                    results.length && 
                    search ?
                    mappedResults : 
                    !results.length && 
                    !scores.length &&
                    !search ?
                    mappedScoreRank :
                    <Spinner text="Loading..." />
                }
                </tbody>
            </table>
        </div>
    );
};

export default ScoreTable;