import React from "react";
import "./Title.css";

const Title = ({ children }) => {

    return (
        <h4 className='title'>{ children }</h4>
    );
};

export default Title;