import React, { forwardRef } from "react";
import "./missle.css";

const Missle = forwardRef(({ children }, missleRef) => (
    <div className="missle" ref={missleRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        { children }
    </div>
));

export default Missle;