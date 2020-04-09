import React from "react";
import useToggle from "../../hooks/useToggle";
import "./Btn.css";

const NavBtn = ({ onClick, children }) => {

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
            // onMouseEnter={ev => toggleTrue(ev)}
            // onMouseLeave={ev => toggleFalse(ev)}
            onClick={onClick}>
            <div className="button-text">
                &nbsp;&nbsp;{children}
            </div>
        </button>
    );
};

export default NavBtn;