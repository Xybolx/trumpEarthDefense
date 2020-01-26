import React, { forwardRef } from "react";
import "./specialMissile.css";

const SpecialMissile = forwardRef(({ children }, specialMissileRef) => (
    <div className="specialMissile" ref={specialMissileRef}>
        { children }
    </div>
));

export default SpecialMissile;