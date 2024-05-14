// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!");
  settings(); // this just auto closes the window, theres probably a better way to do this.
  about();
};

var wm = document.getElementById('w_minutes'); // int
var ws = document.getElementById('w_seconds'); // int
var title = document.getElementById('title') // string?
var play = document.getElementById("start") // string

var timerInterval; // store a ref to a timer variable
var isBreak = false; // boolean for if a break is active
var isPaused = true; // true at start, true if timer isn't moving

var alarmSound = new Audio("sounds/Ding.mp3")

/**
 * Handles timer related things like ticking it down as needed, switching
 * to a break, and playing audio when the timer finishes.
 */
function timer() { // Increments timer by 1 second until 0
  if(ws.innerText != 0) {
    console.log(ws);
    console.log(typeof(ws));
    if (parseInt(ws.innerText) < 10) {
      String(ws.innerText).padStart(2, '0');
    }
    ws.innerText--; // decrement by one
    changeTimerTitle() // change title, after decrement so they match
  } else if (wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }

  // If reaches 0 and there's no break, go to 5
  if(wm.innerText == 0 && ws.innerText == 0 && !is_break) {
    wm.innerText = 5;
    ws.innerText = "00";

    document.getElementById('counter').innerText++; // +1 to counter
    isBreak = true;

     playAlarm() // plays a ding


  } else if (wm.innerText == 0 && ws.innerText == 0 && is_break) {
    // If break finishes, go back to 25, don't increment counter
    wm.innerText = 25;
    ws.innerText = "00";

    isBreak = false;
    playAlarm() // plays a ding
  }
}

/**
 * Starts the timer from whatever time it is at.
 */
function start() { 
  if (isPaused) {
    if(timerInterval == undefined){
      timerInterval = setInterval(timer, 1000);
    } else {
      alert("Timer is already running");
    } 
    isPaused = false;
    play.innerText = "Pause";
    
  } else {
    pause()
  }
}

/**
 * Pauses the timer.
 */
function pause() { 
  if (timerInterval == undefined) {
    alert("You need to hit start!");
  }
  stopInterval()
  play.innerText = "Start"
  isPaused = true;
}

/**
 * Resets the timer, and the title. Currently does NOT reset the counter.
 */
function reset() { 
  wm.innerText = 25;
  ws.innerText = "00";

  pause();
  isBreak = false;
  title.innerText = "pomodoro timer!"
}

function short_break() { // Change to 5:00
  wm.innerText = 5;
  ws.innerText = "00";
  title.innerText = "5:00"

  pause();
  isBreak = true;
}

function long_break() { // Change to 10:00
  wm.innerText = 10;
  ws.innerText = "00";
  title.innerText = "10:00"

  pause();
  isBreak = true;
}

function stopInterval() { // Stops the calculator
  clearInterval(timerInterval)
  timerInterval = undefined;
}

function set3() { // test func(delete later)
  wm.innerText = 0;
  ws.innerText = "03";
}

function playAlarm() { // plays alarm
  alarmSound.volume = 0.35 // set sound to 35/100
  alarmSound.play()
}

/**
 * Changes the title of the tab as the timer counts down.
 */
function changeTimerTitle() {
  title.innerText = wm.textContent + ":" + ws.textContent
}

///////////////////////////// Menu stuff /////////////////////////////

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

















function settings() {
  let menu = document.getElementById("settings_menu")
  
  
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  }
  else {
    menu.style.visibility = "hidden"
  }


}

function about() {
  let aboutVis = document.getElementById("about_menu")
  
  if (aboutVis.style.visibility === "hidden") {
    aboutVis.style.visibility = "visible";
  }
  else {
    aboutVis.style.visibility = "hidden"
  }
}

// Event listener for the close button in the about menu
document.getElementById("about_menu").getElementsByClassName("closebutton")[0].addEventListener("click", function() {
  about()
});

// Event listener for the close button in the settings menu
document.getElementById("settings_menu").getElementsByClassName("closebutton")[0].addEventListener("click", function() {
  settings()
});
