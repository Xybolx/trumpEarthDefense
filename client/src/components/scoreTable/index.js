import React from 'react';

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
                        mappedResults : <tr className="spinner-grow" role="status" aria-hidden="true"><td className="spinner-text"><img className="img-fluid" src="red_cloud.gif" alt="loading..." /></td></tr>}
            </tbody>
        </table>
    );
};

export default ScoreTable;