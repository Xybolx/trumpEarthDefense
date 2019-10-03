import React, { useState, useRef, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import ScoreContext from '../context/scoreContext';
import useTimeout from '../hooks/useTimeout';
import useForm from '../hooks/useForm';
import "./initials.css";

const Initials = () => {

    const earth = useRef();

    const input = useRef();

    const { score } = useContext(ScoreContext);

    const [values, handleChange, handleClearForm] = useForm();

    const [isLoaded, setIsLoaded] = useState(false);

    const [isValidInitials, setIsValidInitials] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const splode = new Audio('splode.mp3');

    const { initials } = values;

    const handleSubmit = ev => {
        ev.preventDefault();
        API.saveScore({
            initials,
            score
        })
            .then(() => setIsSubmitted(true))
            .catch(err => console.log(err));
        handleClearForm();
        window.location.pathname = "/scores";
    };

    useTimeout(() => {
        setIsLoaded(true);
    }, 3000);

    useEffect(() => {
        const loadStyle = () => {
            earth.current.style.display = "none";
            setIsLoaded(false);
        };
        if (isLoaded) {
            const loadTimer = setTimeout(loadStyle, 500);
            input.current.focus();
            splode.play();
            return () => {
                clearTimeout(loadTimer);
            };
        }
    }, [isLoaded, splode]);

    useEffect(() => {
        const initialsRegEx = /^(?=[0-9a-zA-Z]{3}$).*/;
        const initialsMatch = initialsRegEx.test(initials);
        if (initials && initialsMatch) {
            setIsValidInitials(true);
        }
        if (!initialsMatch) {
            setIsValidInitials(false);
        }
    }, [initials, setIsValidInitials]);

    if (isValidInitials && isSubmitted) {
        return <Redirect to="/scores" />
    }

    return (
        <div className="container">
            <h2 className='title' style={{ color: 'yellow', marginTop: 100 }}>Game Over</h2>
            <div style={{ width: 400, height: 400 }} className="container-fluid">
                <img ref={earth} className="img-fluid" alt="EARTH" src={isLoaded ? "splode.gif" : "earth.png"} />
                <div className="initials">{initials}</div>
            </div>
            <div className="form-group">
                    <label htmlFor="initials-input">Enter Initials</label>
                    <div style={!isValidInitials ? { display: "block", color: "red" } : { display: "none" }}>Initials must be 3 characters!</div>
                    <div style={isValidInitials ? { display: "block", color: "lawngreen" } : { display: "none" }}>Valid initials!</div>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={input}
                        id="initial-input"
                        type="text"
                        name="initials"
                        value={initials || ""}
                        onChange={handleChange}
                        autoComplete="false"
                    />
                </form>
            </div>
            <div>
                <button onClick={handleSubmit} className="btn btn-link btn-lg">&nbsp;&nbsp;Submit&nbsp;&nbsp;</button>
            </div>
        </div>
    );
};

export default Initials;