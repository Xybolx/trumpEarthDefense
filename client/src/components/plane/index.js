import React, { forwardRef } from "react";
import "./plane.css";

const Plane = forwardRef(({ children }, planeRef) => (
    <div className="plane" ref={planeRef} style={{ top: "50%", left: 100, height: 100, width: 100 }}>
        { children }
    </div>
));

export default Plane;