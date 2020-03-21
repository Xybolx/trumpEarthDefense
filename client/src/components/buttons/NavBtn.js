import React from "react";
import useToggle from "../../hooks/useToggle";
import "./Btn.css";

const NavBtn = ({ className, onClick, children }) => {

    const [isPressed, toggleIsPressed, toggleTrue, toggleFalse] = useToggle();

    return (
        <button
            className={
                isPressed ? 
                "light pressed" :
                !isPressed ? 
                "light" :
                "light"
            }
            onMouseDown={ev => toggleTrue(ev)}
            onMouseUp={ev => toggleFalse(ev)}
            onClick={onClick}>
            <small>
                &nbsp;&nbsp;{children}
            </small>
        </button>
    );
};

export default NavBtn;