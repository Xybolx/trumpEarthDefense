import React, { forwardRef } from "react";
import "./enemy.css";

const Enemy3 = forwardRef((props, enemy3Ref) => (
    <div ref={enemy3Ref} style={{ right: "0%", height: 150, width: 150 }} className="target3">
        {props.children}
    </div>
));

export default Enemy3;