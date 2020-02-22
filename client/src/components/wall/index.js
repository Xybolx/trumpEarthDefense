import React, { forwardRef } from "react";
import './wall.css';

export const Wall = forwardRef(({ children }, wallRef) => (
    <div ref={wallRef} style={{ height: 200, width: 40 }} className="wall">
        { children }
    </div>
));

export const Wall2 = forwardRef(({ children }, wall2Ref) => (
    <div ref={wall2Ref} style={{ height: 200, width: 40 }} className="wall2">
        { children }
    </div>
));