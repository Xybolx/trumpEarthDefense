import React from "react";
import "./Btn.css";

const Btn = props => {

    return (
        <button
            className="btn btn-outline-light"
            onClick={props.onClick}>
            &nbsp;&nbsp;{props.children}&nbsp;&nbsp;
        </button>
    );
};

export default Btn;