import React, { forwardRef } from "react";
import "./specialMissle.css";

const SpecialMissle = forwardRef(({ children }, specialMissleRef) => (
    <div className="specialMissle" ref={specialMissleRef}>
        { children }
    </div>
));

export default SpecialMissle;