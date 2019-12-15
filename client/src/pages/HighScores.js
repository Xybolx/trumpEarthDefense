import React, { useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';
import useScores from '../hooks/useScores';
// import ScoreTable from '../components/scoreTable';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import './HighScores.css';

// lazy loading imports
const ScoreTable = React.lazy(() => 
import("../components/scoreTable"));

const HighScores = () => {

    // input ref
    const input = useRef();

    // useForm custom hook
    const [values, handleChange, handleClearForm] = useForm();

    // de-structure values object
    const { search } = values;

    // useScores custom hook
    const [scores, results] = useScores(search);

    // map the scores array we returned from our useScores custom hook
    const mappedScores = scores.map((score, index) => (
        <tr key={score._id}>
            <th scope="row">{index + 1}</th>
            <td>{score.initials}</td>
            <td>{score.score}</td>
        </tr>
    ));

    const mappedResults = results.map((result, index) => (
        <tr key={result._id}>
            <th scope="row">{index + 1}</th>
            <td>{result.initials}</td>
            <td>{result.score}</td>
        </tr>
    ));

    useEffect(() => {
        input.current.focus();
    }, []);

    return (
        <div className="container text-center home-earth">
            <Title>High Scores</Title>
            <div className="col-md-6 offset-md-3 table-responsive">
                <div>
                    <small>
                        <label className="text-white" htmlFor="search">Search by minimum score or initials...</label>
                    </small>
                </div>
                <div className="input-group sticky-top bg-dark">
                    <input ref={input} id="search" name="search" value={search || ""} onChange={handleChange} type="search" className="form-control" placeholder="search..." aria-label="Search Scores" aria-describedby="button-search" autoComplete="off" />
                    <div className="input-group-append">
                        <button onClick={handleClearForm} className="btn btn-outline-light" type="button" id="button-addon2">&nbsp;&nbsp;Reset&nbsp;&nbsp;</button>
                    </div>
                </div>
                {/* <table className="table table-borderless">
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
                            mappedResults :
                            <tr className="d-flex align-items-center">
                                <td>
                                    Loading...
                                        <div className="spinner-border text-white" role="status" aria-hidden="true" />
                                </td>
                            </tr>}
                    </tbody>
                </table> */}
                <React.Suspense fallback={<div className="spinner-border text-white" role="status" aria-hidden="true" />}>
                    <ScoreTable>
                        {scores.length && !search ?
                        mappedScores :
                        results.length && search ?
                        mappedResults : ""}
                </ScoreTable>
                </React.Suspense>
            </div>
            <div style={{ marginTop: 10 }}>
                <NavBtn to="/">Home</NavBtn>
            </div>
        </div>
    );
};

export default HighScores;