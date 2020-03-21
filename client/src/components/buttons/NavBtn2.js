import React from "react";
import useToggle from "../../hooks/useToggle";
import "./Btn.css";

const NavBtn2 = ({ className, onClick, children }) => {

    const [isPressed, toggleIsPressed] = useToggle();

    return (
        <button
            className={
                isPressed ? 
                "btn btn-outline-light pressed two" :
                !isPressed ? 
                "btn btn-outline-light two" :
                "btn btn-outline-light two"
            }
            onMouseDown={ev => toggleIsPressed(ev)}
            onMouseUp={ev => toggleIsPressed(ev)}
            onClick={onClick}>
                <small>
                    &nbsp;&nbsp;{children}&nbsp;&nbsp;
                </small>
        </button>
    );
};

export default NavBtn2;