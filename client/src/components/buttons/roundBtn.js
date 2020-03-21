import React from "react";
import "./Btn.css";

const RoundBtn = ({ isPressed, onClick, onMouseUp, onMouseDown, children }) => {

    return (
        <div className="rounded-circle">
            <button
                className={
                    isPressed ? 
                    "small-button-background pressed" :
                    "small-button-background"
                }
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}>
                {/* <img className="img-fluid" src={isPressed ? "../../arcade-pressed.png" : "../../arcade-button.png"} alt="arcade button" /> */}
                <div>
                    &nbsp;&nbsp;I'm Ready!
                </div>
            </button>
            {/* <div className="instant" style={{ position: "relative" }}>
                <div className="circle small-button-background" style={{ backgroundColor: "red" }}></div>
                <div className="small-button" onMouseDown={ev => toggleIsPressed(ev)} onMouseUp={ev => toggleIsPressed(ev)}>CLICK ME</div>
                <div className="small-button-shadow" style={{ marginBottom: "5px" }}></div>
                <div style={{ margin: "10px 0" }}></div>
            </div> */}
        </div>
    );
};

export default RoundBtn;