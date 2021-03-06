import React, { useState, useRef, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import ScoreContext from '../context/scoreContext';
import SpecialContext from '../context/specialContext';
import useTimeout from '../hooks/useTimeout';
import useForm from '../hooks/useForm';
import useValidate from '../hooks/useValidate';
import PageContainer from '../components/pageContainer';
import Title from '../components/title';
import SubmitBtn from '../components/buttons/SubmitBtn';
import "./initials.css";

const Initials = () => {

    // refs
    const earth = useRef();
    const trump = useRef();
    const input = useRef();
    const form = useRef();

    // context
    const { score } = useContext(ScoreContext);
    const { clearSpecial } = useContext(SpecialContext);

    // handleSubmit
    const submitInitials = () => {
        
        const initialsAndScore = {initials, score};

        API.saveScore(initialsAndScore)       
          .then(() => resetValidate())
          .then(() => handleClearForm())
          .then(() => clearSpecial())
          .then(() => setIsSubmitted(true))
          .catch(err => console.log(err));
    };

    // useForm
    const { values, handleChange, handleSubmit, handleClearForm } = useForm(submitInitials);

    // de-structure values object
   const { initials } = values;

    // useValidate
    const [errors, resetValidate] = useValidate(initials);

    // de-structure errors object
    const { isValidInitials } = errors;

    // local state
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // audio
    const splode = new Audio('splode.mp3');
    const rich = new Audio('rich.mp3');

    // useTimeout
    useTimeout(() => {
        setIsLoaded(true);
    }, 3000);

    useEffect(() => {
            form.current.style.display = "none";
            trump.current.style.display = "none";
    }, []);

    useEffect(() => {
        const loadStyle = () => {
            earth.current.style.display = "none";
            trump.current.style.display = "block";
            form.current.style.display = "block";
            input.current.focus();
            rich.play();
            setIsLoaded(false);
        };
        if (isLoaded) {
            const loadTimer = setTimeout(loadStyle, 350);
            splode.play();
            return () => {
                clearTimeout(loadTimer);
            };
        }
    }, [isLoaded, splode, rich]);

    if (isSubmitted) {
        return <Redirect to="/scores" />
    }

    return (
        <PageContainer className="initial">
            <Title>Game Over</Title>
            <p className="text-white">Good job jerk, Trump blew up the Earth!</p>
            <div style={{ width: 400, height: 400 }} className="container-fluid">
                <img ref={earth} className="img-fluid" alt="EARTH" src={isLoaded ? "splode.gif" : "earth.png"} />
                <img ref={trump} className="img-fluid" alt="trump" src="trump-kiss.png" />
            </div>
            <div ref={form} className="form-group">
                    <label htmlFor="initials-input">Enter Initials</label>
                    <div style={initials && !isValidInitials ? { display: "block", color: "red" } : { display: "none" }}>Initials must be 3 characters!</div>
                    <div style={initials && isValidInitials ? { display: "block", color: "lawngreen" } : { display: "none" }}>Valid initials!</div>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={input}
                        id="initial-input"
                        type="text"
                        name="initials"
                        value={initials || ""}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <SubmitBtn />
                </form>
            </div>
        </PageContainer>
    );
};

export default Initials;