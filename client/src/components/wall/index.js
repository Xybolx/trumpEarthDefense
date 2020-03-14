import React, { forwardRef } from "react";
import './wall.css';

export const Wall = forwardRef(({ children, className }, wallRef) => (
    <div ref={wallRef} style={{ width: 40 }} className={className}>
        { children }
    </div>
));

export const Wall2 = forwardRef(({ children }, wall2Ref) => (
    <div ref={wall2Ref} style={{ width: 40 }} className="wall2">
        { children }
    </div>
));