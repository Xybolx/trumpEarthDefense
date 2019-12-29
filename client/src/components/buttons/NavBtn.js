import React from "react";
import { Link } from "react-router-dom";
import "./Btn.css";

const NavBtn = props => {

    return (
        <Link
            className="btn btn-outline-light"
            onClick={props.onClick}
            to={props.to}>
            &nbsp;&nbsp;{props.children}&nbsp;&nbsp;
        </Link>
    );
};

export default NavBtn;