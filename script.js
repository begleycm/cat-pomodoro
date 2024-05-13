// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!");
  settings(); // this just auto closes the window, theres probably a better way to do this.
};

var wm = document.getElementById('w_minutes'); // int
var ws = document.getElementById('w_seconds'); // int

var timerInterval; // store a ref to a timer variable
var is_break = false; // boolean for if a break is active

var alarmSound = new Audio("sounds/Ding.mp3")


function start() { // starts timer
  if(timerInterval == undefined){
    timerInterval = setInterval(timer, 1000);
  } else {
    alert("Timer is already running");
  } 
}

function timer() { // Increments timer by 1 second until 0
  if(ws.innerText != 0) {
    console.log(ws);
    console.log(typeof(ws));
    if (parseInt(ws.innerText) < 10) {
      String(ws.innerText).padStart(2, '0');
    }
    ws.innerText--;
  } else if (wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }

  // If reaches 0 and there's no break, go to 5
  if(wm.innerText == 0 && ws.innerText == 0 && !is_break) {
    wm.innerText = 5;
    ws.innerText = "00";

    document.getElementById('counter').innerText++; // +1 to counter
    is_break = true;

     playAlarm() // plays a ding


  } else if (wm.innerText == 0 && ws.innerText == 0 && is_break) {
    // If break finishes, go back to 25, don't increment counter
    wm.innerText = 25;
    ws.innerText = "00";

    is_break = false;
    playAlarm() // plays a ding
  }
}

function pause() { // doesn't work
  if (timerInterval == undefined) {
    alert("You need to hit start!");
  }
  stopInterval()
}

function reset() { // doesn't work
  wm.innerText = 25;
  ws.innerText = "00";

  stopInterval()
  is_break = false;
}

function short_break() { // Change to 5:00
  wm.innerText = 5;
  ws.innerText = "00";

  stopInterval();
  is_break = true;
}

function long_break() { // Change to 10:00
  wm.innerText = 10;
  ws.innerText = "00";

  stopInterval();
  is_break = true;
}

function stopInterval() { // Stops the calculator
  clearInterval(timerInterval)
  timerInterval = undefined;
}

function set3() { // test func that sets the timer to 0:03
  wm.innerText = 0;
  ws.innerText = "03";
}

function playAlarm() { // plays alarm
  alarmSound.volume = 0.35 // set sound to 35/100
  alarmSound.play()
}


function settings() {
  let menu = document.getElementById("settings_menu")
  
  
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  }
  else {
    menu.style.visibility = "hidden"
  }

  
}

// making draggable window
const titleBars = document.querySelectorAll(".titlebar");
var selection = null

function onMouseDrag({ movementX, movementY }) {
  if (selection){
    let myParent = selection.closest(".fauxwindow")
    let getTitleBarStyle = window.getComputedStyle(myParent);
    let leftValue = parseInt(getTitleBarStyle.left);
    let topValue = parseInt(getTitleBarStyle.top);
    myParent.style.left = `${leftValue + movementX}px`;
    myParent.style.top = `${topValue + movementY}px`;
  }
}

document.addEventListener("mousemove", onMouseDrag)

titleBars.forEach(titleBar => {
  titleBar.addEventListener("mousedown", (event) => {
      selection = event.target;
  });
});

document.addEventListener("mouseup", () => {
    selection = null;
});