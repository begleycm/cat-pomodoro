// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!");
  // Auto close window:
  settings();
  about();
  reset(); // reset to default each opening
};

// Timer minutes and seconds:
var wm = document.getElementById('w_minutes'); // int
var ws = document.getElementById('w_seconds'); // int

// Default times:
var studyT = 25
var shortT = 5
var longT = 10

// General variables:
var title = document.getElementById('title') // string
var play = document.getElementById("start") // string
var timerInterval; // store a ref to a timer variable
var isBreak = false; // bool for if a break is active
var isPaused = true; // true at start, true if timer isn't moving

/**
 * Handles timer related things like ticking it down as needed, switching
 * to a break, and playing audio when the timer finishes. 
 * Increments timer by 1 second until 0.
 */
function timer() {
  if(ws.innerText != 0) {
    if (parseInt(ws.innerText) < 10) {
      String(ws.innerText).padStart(2, '0');
    }
    ws.innerText--; // -1 each second
    changeTimerTitle() // change title for each second passed
  } else if (wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59; // -1 minute
    wm.innerText--;
  }

  // If reaches 0 and there's no break active, go to 5
  if(wm.innerText == 0 && ws.innerText == 0 && !isBreak) {
    wm.innerText = shortT;
    ws.innerText = "00";

    document.getElementById('counter').innerText++; // +1 to counter
    isBreak = true; // break now active
    playAlarm()

  // If reaches 0 and there is a break, reset to default study time
  } else if (wm.innerText == 0 && ws.innerText == 0 && isBreak) {
    wm.innerText = studyT;
    ws.innerText = "00";

    isBreak = false; // break no longer active
    playAlarm()
  }
}

/**
 * Starts the timer from whatever time it is at. Basically a play button.
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
  stopInterval()
  play.innerText = "Start"
  isPaused = true;
}

/**
 * Resets the timer, and the title. Does reset the counter.
 */
function reset() { 
  wm.innerText = studyT;
  ws.innerText = "00";
  document.getElementById('counter').innerText = 0;
  
  pause();
  isBreak = false;
  title.innerText = "Pomodoro timer!"
}

/**
 * Resets the timer, and the title. Does NOT reset the counter.
 */
function resetNotCounter() { 
  wm.innerText = studyT;
  ws.innerText = "00";
  
  pause();
  isBreak = false;
  title.innerText = "pomodoro timer!"
}

/**
 * Sets the timer to a short break.
 */
function short_break() {
  defaultTitle()
  wm.innerText = shortT;
  ws.innerText = "00";

  pause();
  isBreak = true;
}

/**
 * Sets the timer to a long break.
 */
function long_break() {
  defaultTitle()
  wm.innerText = longT;
  ws.innerText = "00";

  pause();
  isBreak = true;
}

/**
 * Stops the calculator.
 */
function stopInterval() {
  clearInterval(timerInterval)
  timerInterval = undefined;
}

// Audio stuff:
var alarmSound = new Audio("sounds/Ding.mp3")
var clickAudio = new Audio("sounds/mixkit-interface-click-1126.wav")  // click button sound
var soundOn = true; // bool for if sound should be on

/**
 * Plays the alarm sound.
 */
function playAlarm() {
  if (soundOn) {
    alarmSound.play()
  }
}

/**
 * Changes the title of the tab as the timer counts down.
 */
function changeTimerTitle() {
  title.innerText = wm.textContent + ":" + ws.textContent
}

/**
 * Changes the title of the tab as the timer counts down.
 */
function defaultTitle() {
  title.innerText = "Pomodoro timer!"
}

///////////////////////////// Window stuff ///////////////////////////////

// making draggable window (this code is just diabolical im sorry)
const titleBars = document.querySelectorAll(".titlebar");
var selection = null

function onMouseDrag({ movementX, movementY }) {
  if (selection){
    // setting myParent to the greater window ancestor
    let myParent = selection.closest(".fauxwindow")
    // getting a computed value of the style (position) of the window
    let getStyle = window.getComputedStyle(myParent);
    // getting the distance from the left and top of the screen
    let leftValue = parseInt(getStyle.left);
    let topValue = parseInt(getStyle.top);

    let leftFuture = leftValue + movementX;
    let topFuture = topValue + movementY;

    // get the parent window dimensions
    let parentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let parentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // adjusting the window style values to be the new x and y values

    if (leftFuture + (parseInt(getStyle.width) / 2) < parentWidth && leftFuture > (parseInt(getStyle.width) / 2)){
      myParent.style.left = `${leftFuture}px`;
    }


    if (topFuture + (parseInt(getStyle.height)) < parentHeight && topFuture > 0){
      myParent.style.top = `${topFuture}px`;
    }
    else {
      console.log("not workin son:", topFuture)
    }
    
    
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

// volume slider code from w3schools, this might be sus.

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
} 

/**
 * Opens and closes the about menu.
 */
function about() {
  let aboutVis = document.getElementById("about_menu")
  
  if (aboutVis.style.visibility === "hidden") {
    aboutVis.style.visibility = "visible";
  }
  else {
    aboutVis.style.visibility = "hidden"
  }
}

// Get all elements with the class "control_button"
var buttons = document.getElementsByClassName("control_button");

// Iterate over each button and add an event listener for audio
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        console.log("click sound action");
        clickAudio.play();
    });
}


////////////////////// Settings stuff //////////////////////

/**
 * Opens and closes the settings menu.
 */
function settings() {
  let menu = document.getElementById("settings_menu")
  
  
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  }
  else {
    menu.style.visibility = "hidden"
  }
}

/**
 * Saves all settings once the "Save" button is clicked.
 */
function saveSettings() {
  var studyTime = document.getElementById("studyTime").value
  var shortTime = document.getElementById("shortTime").value
  var longTime = document.getElementById("longTime").value
  let soundCheck = document.getElementById("soundCheckBox")

  if (studyTime != "") {
    studyT = studyTime
  } else {
    studyT = 25
  }
  if (shortTime != "") {
    shortT = shortTime
  } else {
    shortT = 5
  }
  if (longTime != "") {
    longT = longTime
  } else {
    longT = 10
  }
  soundOn = soundCheck.checked // True if checked, false if not
  alarmSound.volume = slider.value / 100 // set sound to toggle bar in settings
  clickAudio.volume = slider.value / 100 // click audio

  resetNotCounter()
}
