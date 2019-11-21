import React, { forwardRef } from "react";
import "./enemy.css";

export const Enemy = forwardRef((props, enemyRef) => (
    <div ref={enemyRef} style={{ right: -300, height: 150, width: 150 }} className="target">
        {props.children}
    </div>
));

export const Enemy2 = forwardRef((props, enemy2Ref) => (
    <div ref={enemy2Ref} style={{ right: -200, height: 150, width: 150 }} className="target2">
        {props.children}
    </div>
));

export const Enemy3 = forwardRef((props, enemy3Ref) => (
    <div ref={enemy3Ref} style={{ right: -100, height: 150, width: 150 }} className="target3">
        {props.children}
    </div>
));

export const Enemy4 = forwardRef((props, enemy4Ref) => (
    <div ref={enemy4Ref} style={{ right: "0%", height: 150, width: 150 }} className="target4">
        {props.children}
    </div>
));