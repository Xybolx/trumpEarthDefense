import React from "react";
import useToggle from "../../hooks/useToggle";
import "./Btn.css";

const SubmitBtn = () => {

    const [isPressed, toggleIsPressed, toggleTrue, toggleFalse] = useToggle();

    return (
        <button
            type="submit"
            className={
                isPressed ? 
                "light pressed" :
                !isPressed ? 
                "light" :
                "light"
            }
            onMouseDown={ev => toggleTrue(ev)}
            onMouseUp={ev => toggleFalse(ev)}>
            <small>
                &nbsp;&nbsp;Submit&nbsp;&nbsp;
            </small>
        </button>
    );
};

export default SubmitBtn;