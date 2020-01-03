import React from "react";
import "./Btn.css";

const NavBtn = props => {

    return (
        <button
            className={`btn btn-outline-light btn-sm ${props.className}`}
            onClick={props.onClick}>
            &nbsp;&nbsp;{props.children}
        </button>
    );
};

export default NavBtn;