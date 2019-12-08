import React, { forwardRef } from "react";

const Lightning = forwardRef(({ children }, lightningRef) => (
    <div className="lightning" ref={lightningRef}>
        { children }
    </div>
));

export default Lightning;