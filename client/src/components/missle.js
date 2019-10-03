import React, { forwardRef } from "react";
import "./missle.css";

const Missle = forwardRef((props, missleRef) => (
    <div className="missle" ref={missleRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        {props.children}
    </div>
));

export default Missle;