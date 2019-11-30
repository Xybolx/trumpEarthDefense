import React, { forwardRef } from "react";
import "./specialMissle.css";

const SpecialMissle = forwardRef((props, specialMissleRef) => (
    <div className="specialMissle" ref={specialMissleRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        {props.children}
    </div>
));

export default SpecialMissle;