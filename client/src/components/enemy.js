import React,{ forwardRef } from "react";
import "./enemy.css";

const Enemy = forwardRef((props, enemyRef) => (
    <div ref={enemyRef} style={{ right: "0%", height: 150, width: 150 }} className="target">
        {props.children}
    </div>
));

export default Enemy;