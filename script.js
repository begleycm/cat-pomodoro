window.onload = function () {
  console.log("page loaded!");
  // call windows to auto close them
  settings();
  about();
  audioSettings()
  reset(); // reset to default each opening
};

// Default times:
var studyT = 25;
var shortT = 5;
var longT = 10;

// General variables:
var title = document.getElementById('title'); // string
var play = document.getElementById("start"); // string
var timerInterval; // store a ref to a timer variable
var isBreak = false; // bool for if a break is active
var isPaused = true; // true at start, true if timer isn't moving
var doesRepeat = true;

var counter = 0;
var countertext = document.getElementById('countertext');

var isRain = true;

/**
* Handles timer related things like ticking it down as needed, switching
* to a break, and playing audio when the timer finishes. 
* Increments timer by 1 second until 0.
*/
function timer() {
  var timertext = document.getElementById('timertext');
  var time = timertext.innerText.split(':');
  var splitCounter = countertext.innerText.split(' ');
  var minutes = parseInt(time[0]);
  var seconds = parseInt(time[1]);
  counter = parseInt(splitCounter[2]);


  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0 && seconds == 0) {
    seconds = 59;
    minutes--;
  }

  timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  changeTimerTitle();

  if (minutes == 0 && seconds == 0) {
    if (doesRepeat) {
      if (!isBreak) { // If not a break, start one
        counter++;
        isBreak = true
        minutes = shortT
        seconds = 0
        timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        countertext.innerText = `Completed pomodoros: ${String(counter)}`;
      } else { // If there is a break, reset the timer
        minutes = studyT
        seconds = 0
        isBreak = false
        timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    } else {
      if (!isBreak) { // If not a break, start one
        counter++;
        isBreak = true
        minutes = shortT
        seconds = 0
        timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        countertext.innerText = `Completed pomodoros: ${String(counter)}`;
        pause()
      } else { // If there is a break, reset the timer
        minutes = studyT
        seconds = 0
        isBreak = false
        timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        pause()
      }
    }
    playAlarm()
  }
}

// Rain noise stuff:
var passiveRain = new Audio("sounds/passive_rain.mp3");
passiveRain.loop = true;

function start() {
  if (isPaused) {
    if (isRain) {
      passiveRain.play();
    }
    if (timerInterval == undefined) {
      timerInterval = setInterval(timer, 1000);
    }
    isPaused = false;
    play.innerText = "Pause";
  } else {
    pause();
  }
}

function pause() {
  passiveRain.pause();
  stopInterval();
  play.innerText = "Start";
  isPaused = true;
}

function reset() {
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
  title.innerText = "Pomodoro timer!";
  counter = 0;
  countertext.innerText = `Completed pomodoros: ${String(counter)}`;
}

function resetNotCounter() {
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
  title.innerText = "Pomodoro timer!";
}

function study() {
  handleModeSelect("study");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
}

function short_break() {
  handleModeSelect("break");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(shortT).padStart(2, '0')}:00`;
  pause();
  isBreak = true;
}

function long_break() {
  handleModeSelect("long_break");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(longT).padStart(2, '0')}:00`;
  pause();
  isBreak = true;
}

function stopInterval() {
  clearInterval(timerInterval);
  timerInterval = undefined;
}

function changeTimerTitle() {
  var timertext = document.getElementById('timertext');
  title.innerText = timertext.innerText;
}

function defaultTitle() {
  title.innerText = "Pomodoro timer!";
}

// this may be diabolical idk
function handleModeSelect(mode) {
  const studyBtn = document.getElementById("studytab");
  const breakBtn = document.getElementById("breaktab");
  const longBreakBtn = document.getElementById("longbreaktab");

  if (typeof (mode) != "string") {
    console.log("ERROR: mode needs to be a string")
    return;
  }
  switch (mode) {
    case "study":
      studyBtn.classList.add("active_tab")
      breakBtn.classList.remove("active_tab")
      longBreakBtn.classList.remove("active_tab")
      break;
    case "break":
      studyBtn.classList.remove("active_tab")
      breakBtn.classList.add("active_tab")
      longBreakBtn.classList.remove("active_tab")
      break;
    case "long_break":
      studyBtn.classList.remove("active_tab")
      breakBtn.classList.remove("active_tab")
      longBreakBtn.classList.add("active_tab")
      break;
    default:
      break;
  }
}

/////////////// Audio ///////////////

var alarmString = "simple"
var clickAudio = new Audio("sounds/mixkit-interface-click-1126.wav"); // click button sound
var soundOn = true; // bool for if sound should be on

function playAlarm() {
  var alarmSound = new Audio("sounds/" + alarmString + ".mp3");
  alarmSound.volume = alarmVolume
  if (soundOn) {
    alarmSound.play();
  }
}

///////////////////////////// Window stuff ///////////////////////////////

const titleBars = document.querySelectorAll(".titlebar");
var selection = null;

function onMouseDrag({ movementX, movementY }) {
  if (selection) {
    let myParent = selection.closest(".fauxwindow");
    let getStyle = window.getComputedStyle(myParent);
    let leftValue = parseInt(getStyle.left);
    let topValue = parseInt(getStyle.top);

    let leftFuture = leftValue + movementX;
    let topFuture = topValue + movementY;

    let parentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let parentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (leftFuture + (parseInt(getStyle.width) / 2) < parentWidth && leftFuture > (parseInt(getStyle.width) / 2)) {
      myParent.style.left = `${leftFuture}px`;
    }

    if (topFuture + (parseInt(getStyle.height)) < parentHeight && topFuture > 0) {
      myParent.style.top = `${topFuture}px`;
    } else {
      console.log("not workin son:", topFuture);
    }
  }
}

document.addEventListener("mousemove", onMouseDrag);

titleBars.forEach(titleBar => {
  titleBar.addEventListener("mousedown", (event) => {
    selection = event.target;
  });
});

document.addEventListener("mouseup", () => {
  selection = null;
});

function about() {
  let aboutVis = document.getElementById("about_menu");

  if (aboutVis.style.visibility === "hidden") {
    aboutVis.style.visibility = "visible";
  } else {
    aboutVis.style.visibility = "hidden";
  }
}

var buttons = document.getElementsByClassName("control_button");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    console.log("click sound action");
    clickAudio.play();
  });
}

var modes = document.getElementsByClassName("mode_tab");

for (var i = 0; i < modes.length; i++) {
  modes[i].addEventListener("click", function () {
    console.log("click sound action");
    clickAudio.play();
  });
}

function settings() {
  let menu = document.getElementById("settings_menu");

  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  } else {
    menu.style.visibility = "hidden";
  }
}

function audioSettings() {
  let audioVis = document.getElementById("audio_settings_menu");

  if (audioVis.style.visibility === "hidden") {
    audioVis.style.visibility = "visible";
  } else {
    audioVis.style.visibility = "hidden";
  }
}

function saveSettings() {
  var studyTime = document.getElementById("studyTime").value;
  var shortTime = document.getElementById("shortTime").value;
  var longTime = document.getElementById("longTime").value;
  var timerRepeats = document.getElementById("timerRepeats");
  //let soundCheck = document.getElementById("soundCheckBox");

  if (studyTime != "") {
    studyT = studyTime;
  } else {
    studyT = 25;
  }
  if (shortTime != "") {
    shortT = shortTime;
  } else {
    shortT = 5;
  }
  if (longTime != "") {
    longT = longTime;
  } else {
    longT = 10;
  }
  doesRepeat = timerRepeats.checked; // True if checked, false if not

  resetNotCounter();
}

const rainVolumeSlider = document.getElementById("rain-volume-slider");
const alarmVolumeSlider = document.getElementById("alarm-volume-slider");
const rainDisplay = document.getElementById("rain-volume-display");
const alarmDisplay = document.getElementById("alarm-volume-display");
var alarmVolume = 0.5;

passiveRain.volume = rainVolumeSlider.value

rainVolumeSlider.addEventListener("input", () => {
  passiveRain.volume = rainVolumeSlider.value;
  updateRainVolumeDisplay();
});

alarmVolumeSlider.addEventListener("input", () => {
  alarmVolume = alarmVolumeSlider.value;
  updateAlarmVolumeDisplay();
});

function updateRainVolumeDisplay() {
  rainDisplay.textContent = `Rain volume: ${Math.floor(passiveRain.volume * 100)}%`;
}

function updateAlarmVolumeDisplay() {
  alarmDisplay.textContent = `Alarm volume: ${Math.floor(alarmVolume * 100)}%`;
}

function changeAlarm() {
  var x = document.getElementById("mySelect");
  var i = x.selectedIndex;
  alarmString = x.options[i].text
  console.log(alarmString)
}

function five() {
  document.getElementById('timertext').innerText = `${String(0).padStart(2, '0')}:05`;
}

rainOn.addEventListener("change", () => {
  isRain = document.getElementById('rainOn').checked;
  if (isRain && !isPaused) {
    passiveRain.play();
  } else {
    passiveRain.pause();
  }
  console.log(isRain);
});

alarmOn.addEventListener("change", () => {
  soundOn = document.getElementById('alarmOn').checked;
  console.log(soundOn);
});
