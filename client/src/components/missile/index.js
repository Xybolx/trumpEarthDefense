import React, { forwardRef } from "react";
import "./missile.css";

const Missile = forwardRef(({ children }, missileRef) => (
    <div className="missile" ref={missileRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        { children }
    </div>
));

export default Missile;