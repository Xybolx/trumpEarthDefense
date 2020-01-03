import React from 'react';
import Spinner from '../spinner';

const ScoreTable = ({ scores, results, mappedScores, mappedResults, search }) => {

    return (
        <table className="table table-borderless">
            <thead className="th-row">
                <tr className="text-white">
                    <th>#</th>
                    <th>Initials</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody style={{ color: "yellow" }}>
            {scores.length && !search ?
                        mappedScores :
                        results.length && search ?
                        mappedResults : <Spinner text="Loading..." />}
            </tbody>
        </table>
    );
};

export default ScoreTable;