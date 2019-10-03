import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

const HighScores = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        API.getScores()
            .then(res => setScores(res.data))
            .catch(err => console.log(err));
    }, []);

    const mappedScores = scores.map((score, index) => (
        <tr key={score._id}>
            <th scope="row">{index + 1}</th>
            <td>{score.initials}</td>
            <td>{score.score}</td>
        </tr>
    ));

    return (
        <div style={{ marginTop: 100 }}>
            <div className="container text-center home-earth">
                <h2 className='title'>High Scores</h2>
                <div className="col-md-6 offset-md-3 table-responsive">
                    <table className="table table-borderless">
                        <thead className="th-row">
                            <tr>
                                <th>#</th>
                                <th>Initials</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.length ? 
                            mappedScores : 
                                <tr className="d-flex align-items-center">
                                    <td>
                                        Loading...
                                        <div className="spinner-border" role="status" aria-hidden="true" />
                                    </td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: 10 }}>
                    <Link className="btn btn-link btn-lg" to='/'>&nbsp;&nbsp;Home&nbsp;&nbsp;</Link>
                </div>
            </div>
        </div>
    );
};

export default HighScores;