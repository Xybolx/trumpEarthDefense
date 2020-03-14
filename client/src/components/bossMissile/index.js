import React, { forwardRef } from "react";
import "../missile/missile.css";

export const BossMissile = forwardRef(({ children }, bossMissileRef) => (
    <div className="missile" ref={bossMissileRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        { children }
    </div>
));

export const Boss2Missile = forwardRef(({ children }, boss2MissileRef) => (
    <div className="missile" ref={boss2MissileRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        { children }
    </div>
));

export const Boss3Missile = forwardRef(({ children }, boss3MissileRef) => (
    <div className="missile" ref={boss3MissileRef} style={{ position: "absolute", top: "37%", left: "25%", height: 30, width: 50 }}>
        { children }
    </div>
));
