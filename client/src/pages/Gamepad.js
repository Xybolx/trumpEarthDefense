import React from 'react';

const Gamepad = props => {

let haveEvents = 'ongamepadconnected' in window;
let controllers = {};

const laser = new Audio('laser.mp3');

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function addgamepad(gamepad) {
  console.log("gamepad connected")
  controllers[gamepad.index] = gamepad;

  let d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);

  let t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);

  let b = document.createElement("div");
  b.className = "buttons";
  for (let i = 0; i < gamepad.buttons.length; i++) {
    let e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }

  d.appendChild(b);

  let a = document.createElement("div");
  a.className = "axes";

  for (let i = 0; i < gamepad.axes.length; i++) {
    let p = document.createElement("progress");
    p.className = "axis";
    //p.id = "a" + i;
    p.setAttribute("max", "2");
    p.setAttribute("value", "1");
    p.innerHTML = i;
    a.appendChild(p);
  }

  d.appendChild(a);

  // See https://github.com/luser/gamepadtest/blob/master/index.html
  let start = document.getElementById("start");
  if (start) {
    start.style.display = "none";
  }

  document.body.appendChild(d);
  requestAnimationFrame(updateStatus);
}

function removegamepad(gamepad) {
  console.log("gamepad disconnected")
  let d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  let i = 0;
  let j;

  for (j in controllers) {
    let controller = controllers[j];
    let d = document.getElementById("controller" + j);
    let buttons = d.getElementsByClassName("button");

    for (i = 0; i < controller.buttons.length; i++) {
      let b = buttons[i];
      let val = controller.buttons[i];
      let pressed = val === 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      
      let pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;

      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    let axes = d.getElementsByClassName("axis");
    for (i = 0; i < controller.axes.length; i++) {
      let a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
  }

    if(navigator.webkitGetGamepads) {
      var gp = navigator.webkitGetGamepads()[0];
  
      if(gp.buttons[0] == 1) {
        setIsFlying(true);
            setCharge(0);
            laser.volume = .25;
            laser.play();
      } else if(gp.buttons[1] == 1) {
        a++;
      } else if(gp.buttons[2] == 1) {
        b++;
      } else if(gp.buttons[3] == 1) {
        a--;
      }
    } else {
      var gp = navigator.getGamepads()[0];
  
      if(gp.buttons[0].value > 0 || gp.buttons[0].pressed == true) {
        b--;
      } else if(gp.buttons[1].value > 0 || gp.buttons[1].pressed == true) {
        a++;
      } else if(gp.buttons[2].value > 0 || gp.buttons[2].pressed == true) {
        b++;
      } else if(gp.buttons[3].value > 0 || gp.buttons[3].pressed == true) {
        a--;
      }
    }
  
    var start = rAF(gameLoop);
  };

  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}


window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
  setInterval(scangamepads, 500);
}

    return (
        <div>
            <h2 id="start">Press a button on your controller to start</h2>
      <a href="https://github.com/luser/gamepadtest"><img style={{ position: "absolute", top: 0, right: 0, border: 0 }} src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub" /></a>
        </div>
    );
};

export default Gamepad;