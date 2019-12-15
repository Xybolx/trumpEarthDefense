import React from 'react';

const ScoreTable = props => {

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
                {props.children}
            </tbody>
        </table>
    );
};

export default ScoreTable;