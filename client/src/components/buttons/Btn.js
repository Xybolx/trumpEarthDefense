import React from "react";
import "./Btn.css";

const Btn = props => {

    return (
        <button
            className={`btn btn-outline-light ${props.className}`}
            onClick={props.onClick}>
            &nbsp;&nbsp;{props.children}
        </button>
    );
};

export default Btn;