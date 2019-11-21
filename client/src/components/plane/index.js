import React, { forwardRef } from "react";
import "./plane.css";

const Plane = forwardRef((props, planeRef) => (
    <div className="plane" ref={planeRef} style={{ top: "50%", left: 100, height: 100, width: 100 }}>
        {props.children}
    </div>
));

export default Plane;