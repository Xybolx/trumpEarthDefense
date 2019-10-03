import React, { forwardRef } from "react";
import "./enemy.css";

const Enemy2 = forwardRef((props, enemy2Ref) => (
    <div ref={enemy2Ref} style={{ right: "0%", height: 150, width: 150 }} className="target2">
        {props.children}
    </div>
));

export default Enemy2;