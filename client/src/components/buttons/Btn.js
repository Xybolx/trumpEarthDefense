import React from "react";
import "./Btn.css";

const Btn = ({ className, onClick, children }) => {

    return (
        <button
            className={`btn btn-outline-light btn-sm ${className}`}
            onClick={onClick}>
            <small>
                &nbsp;&nbsp;{children}&nbsp;&nbsp;
            </small>
        </button>
    );
};

export default Btn;