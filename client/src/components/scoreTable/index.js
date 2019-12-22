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
            <tbody>
            {scores.length && !search ?
                        mappedScores :
                        results.length && search ?
                        mappedResults : <tr className="spinner-grow" role="status" aria-hidden="true"><td className="spinner-text">Loading...</td></tr>}
            </tbody>
        </table>
    );
};

export default ScoreTable;