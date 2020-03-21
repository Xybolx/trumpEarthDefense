import React from "react";
import useToggle from "../../hooks/useToggle";
import "./Btn.css";

const Btn = ({ className, onClick, children }) => {

    const [isPressed, toggleIsPressed] = useToggle();

    return (
        <button
            className={
                isPressed ? 
                "btn btn-outline-light pressed" :
                !isPressed ? 
                "btn btn-outline-light" :
                "btn btn-outline-light"
            }
            onMouseDown={e => toggleIsPressed(e)}
            onMouseUp={e => toggleIsPressed(e)}
            onClick={onClick}>
            <img className="img-fluid" src="transparent-button.png" alt="button" />
            <small>
                &nbsp;&nbsp;{children}&nbsp;&nbsp;
            </small>
        </button>
    );
};

export default Btn;