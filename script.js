window.onload = function () {
  // call windows to auto close them
  loadLocal(); // Loads settings from localStorage
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

var rainOn = true;

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

/**
 * Starts the timer and sets the button to say pause.
 */
function start() {
  if (isPaused) {
    if (rainOn) {
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

/**
 * Pauses the timer and changes the button to say start.
 */
function pause() {
  passiveRain.pause();
  stopInterval();
  play.innerText = "Start";
  isPaused = true;
}

/**
 * Reset the timer to its base study time and the counter to 0.
 */
function reset() {
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
  title.innerText = "Pomodoro timer!";
  counter = 0;
  countertext.innerText = `Completed pomodoros: ${String(counter)}`;
}

/**
 * Resets the timer to base, but leaves the counter as it is.
 */
function resetNotCounter() {
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
  title.innerText = "Pomodoro timer!";
}

/**
 * Study tab.
 */
function study() {
  handleModeSelect("study");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(studyT).padStart(2, '0')}:00`;
  pause();
  isBreak = false;
}

/**
 * Short break tab.
 */
function short_break() {
  handleModeSelect("break");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(shortT).padStart(2, '0')}:00`;
  pause();
  isBreak = true;
}

/**
 * Long break tab.
 */
function long_break() {
  handleModeSelect("long_break");
  defaultTitle();
  document.getElementById('timertext').innerText = `${String(longT).padStart(2, '0')}:00`;
  pause();
  isBreak = true;
}

/**
 * Stops the timer interval.
 */
function stopInterval() {
  clearInterval(timerInterval);
  timerInterval = undefined;
}

/**
 * Changes the timer title as each second passes.
 */
function changeTimerTitle() {
  var timertext = document.getElementById('timertext');
  title.innerText = timertext.innerText;
}

/**
 * Changes the timer to the default text of "Pomodoro timer!".
 */
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
var alarmOn = true; // bool for if the alarm should be on

function playAlarm() {
  var alarmSound = new Audio("sounds/" + alarmString + ".mp3");
  alarmSound.volume = alarmVolume
  if (alarmOn) {
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

/**
 * Spawns in the about menu.
 */
function about() {
  let aboutVis = document.getElementById("about_menu");

  if (aboutVis.style.visibility === "hidden") {
    aboutVis.style.visibility = "visible";
  } else {
    aboutVis.style.visibility = "hidden";
  }
}
// All of the buttons
var buttons = document.getElementsByClassName("control_button");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

var modes = document.getElementsByClassName("mode_tab");

for (var i = 0; i < modes.length; i++) {
  modes[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

/**
 * Spawns the settings menu in.
 */
function settings() {
  let menu = document.getElementById("settings_menu");

  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  } else {
    menu.style.visibility = "hidden";
  }
}

/**
 * Spawns the audio settings menu in.
 */
function audioSettings() {
  let audioVis = document.getElementById("audio_settings_menu");

  if (audioVis.style.visibility === "hidden") {
    audioVis.style.visibility = "visible";
  } else {
    audioVis.style.visibility = "hidden";
  }
}

/**
 * Function that occurs once the user hits the save button
 * in settings.
 */
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

  saveLocalSettings()

  resetNotCounter();
}

// Bunch of volume variables defined
const rainVolumeSlider = document.getElementById("rain-volume-slider");
const alarmVolumeSlider = document.getElementById("alarm-volume-slider");
const rainDisplay = document.getElementById("rain-volume-display");
const alarmDisplay = document.getElementById("alarm-volume-display");
var alarmVolume = 0.5;

passiveRain.volume = rainVolumeSlider.value

/**
 * Function that changes the rain slider as needed.
 */
rainVolumeSlider.addEventListener("input", () => {
  passiveRain.volume = rainVolumeSlider.value;
  updateRainVolumeDisplay();
  saveLocalAudio()
});

/**
 * Function that changes the alarm slider as needed.
 */
alarmVolumeSlider.addEventListener("input", () => {
  alarmVolume = alarmVolumeSlider.value;
  updateAlarmVolumeDisplay();
  saveLocalAudio()
});

function updateRainVolumeDisplay() { // Updates volume displayed for rain
  rainDisplay.textContent = `Rain volume: ${Math.floor(passiveRain.volume * 100)}%`;
}

function updateAlarmVolumeDisplay() { // Updates volume displayed for alarm
  alarmDisplay.textContent = `Alarm volume: ${Math.floor(alarmVolume * 100)}%`;
}

/**
 * Changes which alarm is being used.
 */
function changeAlarm() {
  var x = document.getElementById("mySelect");
  var i = x.selectedIndex;
  alarmString = x.options[i].text
  console.log(alarmString)
  saveLocalAudio()
}

/**
 * Test function that sets the timer to 5 seconds.
 */
function five() {
  document.getElementById('timertext').innerText = `${String(0).padStart(2, '0')}:05`;
}

/**
 * Controls the rain audio for whent he checkbox is changed.
 */
rainOnCheck.addEventListener("change", () => {
  rainOn = document.getElementById('rainOnCheck').checked;
  if (rainOn && !isPaused) { // Should only play when timer is starteds
    passiveRain.play();
  } else {
    passiveRain.pause();
  }
  saveLocalAudio()
});

/**
 * Controls the alarm audio for when the checkbox is changed.
 */
alarmOnCheck.addEventListener("change", () => {
  alarmOn = document.getElementById('alarmOnCheck').checked;
  console.log(alarmOn);
  saveLocalAudio()
});

/**
 * Saves settings for settings between browser loads.
 */
function saveLocalSettings() {
  localStorage.setItem("studyT", JSON.stringify(studyT))
  localStorage.setItem("shortT", JSON.stringify(shortT))
  localStorage.setItem("longT", JSON.stringify(longT))
  localStorage.setItem("doesRepeat", JSON.stringify(doesRepeat))
}

/**
 * Saved settings for audio between browser loads. I had to make this
 * into separate function because we want the audio settings to save without
 * a save button.
 */
function saveLocalAudio() {
  localStorage.setItem("alarmOn", JSON.stringify(alarmOn))
  localStorage.setItem("rainOn", JSON.stringify(rainOn))
  localStorage.setItem("alarmString", JSON.stringify(alarmString))
}

/**
 * Loads both audio and settings from the browser.
 */
function loadLocal() {
  const savedStudyT = localStorage.getItem("studyT");
  const savedShortT = localStorage.getItem("shortT");
  const savedLongT = localStorage.getItem("longT");
  const savedRepeat = localStorage.getItem("doesRepeat");
  const savedAlarm = localStorage.getItem("alarmOn");
  const savedRain = localStorage.getItem("rainOn");
  const savedAlarmString = localStorage.getItem("alarmString");

  // variables
  if (savedStudyT) {
    studyT = JSON.parse(savedStudyT);
  }
  if (savedShortT) {
    shortT = JSON.parse(savedShortT);
  }
  if (savedLongT) {
    longT = JSON.parse(savedLongT);
  }
  if (savedRepeat) {
    doesRepeat = JSON.parse(savedRepeat);
  }
  if (savedAlarm) {
    alarmOn = JSON.parse(savedAlarm);
  }
  if (savedRain) {
    rainOn = JSON.parse(savedRain);
  }
  if (savedAlarmString) {
    alarmString = JSON.parse(savedAlarmString);
  }

  // Sets display of checkboxes and time values
  document.getElementById("studyTime").value = studyT
  document.getElementById("shortTime").value = shortT
  document.getElementById("longTime").value = longT
  document.getElementById("timerRepeats").checked = doesRepeat
  document.getElementById("rainOnCheck").checked = rainOn
  document.getElementById("alarmOnCheck").checked = alarmOn

  // Volume text display
  let rainVolume = document.getElementById("rain-volume-slider").value
  document.getElementById("rain-volume-display").innerText = `Rain volume: ${Math.round(rainVolume * 100)}%`;
  let alarmVolume = document.getElementById("alarm-volume-slider").value
  document.getElementById("alarm-volume-display").innerText = `Alarm volume: ${Math.round(alarmVolume * 100)}%`;
}

///////// A bunch of getter methods

function getTimerRepeats() {
  return timerRepeats;
}

let timerWindow = document.getElementById("timer_menu")
let settingsWindow = document.getElementById("settings_menu")
let aboutWindow = document.getElementById("about_menu")
let audioWindow = document.getElementById("audio_settings_menu")


addEventListener("resize", (event) => {
  console.log(window.innerWidth)

  if (window.innerWidth > 810) {
    timerWindow.style.left = "50%"
    timerWindow.style.top = "10%"

    settingsWindow.style.left = "75%"
    settingsWindow.style.top = "25%"

    aboutWindow.style.left = "20%"
    aboutWindow.style.top = "25%"

    audioWindow.style.left = "50%"
    audioWindow.style.top = "30%"
  }
  else {
    timerWindow.style.left = "0%"
    timerWindow.style.top = "0%"

    settingsWindow.style.left = "0%"
    settingsWindow.style.top = "0%"

    aboutWindow.style.left = "0%"
    aboutWindow.style.top = "0%"

    audioWindow.style.left = "0%"
    audioWindow.style.top = "0%"
  }

});