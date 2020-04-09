import React, { forwardRef } from "react";
import "./enemy.css";

export const Enemy = forwardRef(({ children }, enemyRef) => (
    <div id="enemy1" ref={enemyRef} style={{ right: -300, height: 155, width: 155 }} className="target">
        { children }
    </div>
));

export const Enemy2 = forwardRef(({ children }, enemy2Ref) => (
    <div id="enemy2" ref={enemy2Ref} style={{ right: -200, height: 150, width: 150 }} className="target2">
        { children }
    </div>
));

export const Enemy3 = forwardRef(({ children }, enemy3Ref) => (
    <div id="enemy3" ref={enemy3Ref} style={{ right: -100, height: 165, width: 165 }} className="target3">
        { children }
    </div>
));

export const Enemy4 = forwardRef(({ children }, enemy4Ref) => (
    <div ref={enemy4Ref} style={{ right: "0%", height: 300, width: 300 }} className="target4">
        { children }
    </div>
));