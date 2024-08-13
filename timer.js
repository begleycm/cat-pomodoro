window.onload = function () {
  // Loads settings from localStorage
  loadLocal();

  // call windows to auto close them
  settings();
  about();
  audioSettings();

  // reset to default each opening
  reset();
};

// Default times:
var studyT = 25;
var shortT = 5;
var longT = 10;

// General variables:
var title = document.getElementById('title'); // string
var play = document.getElementById("start");  // string
var timerInterval;                            // store a ref to a timer variable
var isBreak = false;                          // bool for if a break is active
var isPaused = true;                          // true at start, true if timer isn't moving
var doesRepeat = true;                        // Timer repeats by default
var countertext = document.getElementById('countertext');
var compPomos = 0;                            // Initialize completed pomodoros

var counter = 0;                              // Counter starts at 0

/**
* Handles timer related things like ticking it down as needed, switching
* to a break, and playing audio when the timer finishes. 
* Increments timer by 1 second until 0.
*/
function timer() {

  // The following defines minutes, seconds, and the counter for completed pomodoros.
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
        studyCompleted();

      } else { // If there is a break, reset the timer
        breakCompleted();
      }
    } else {
      if (!isBreak) { // If not a break, start one
        studyCompleted();

        pause();
      } else { // If there is a break, reset the timer
        breakCompleted();

        pause();
      }
    }
    playAlarm();
  }
}

/**
 * Called when a pomodoro is completed. This updates the timer text, and sets
 * the timer to a break.
 */
function studyCompleted() {
  var timertext = document.getElementById('timertext');
  var time = timertext.innerText.split(':');
  var splitCounter = countertext.innerText.split(' ');

  var minutes = parseInt(time[0]);
  var seconds = parseInt(time[1]);
  counter = parseInt(splitCounter[2]);
  
  counter++;
  isBreak = true;
  minutes = shortT;
  seconds = 0;
  timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  countertext.innerText = `Completed pomodoros: ${String(counter)}`;
  updateCompletedPomodoros();
}

/**
 * Called when a pomodoro is completed. This updates the timer text, and sets
 * the timer to studying.
 */
function breakCompleted() {
  minutes = studyT;
  seconds = 0;
  isBreak = false;
  timertext.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  setStudy();
}

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

  saveLocalSettings();

  resetNotCounter();
}

/**
 * Saves settings for settings between browser loads.
 */
function saveLocalSettings() {
  localStorage.setItem("studyT", JSON.stringify(studyT));
  localStorage.setItem("shortT", JSON.stringify(shortT));
  localStorage.setItem("longT", JSON.stringify(longT));
  localStorage.setItem("doesRepeat", JSON.stringify(doesRepeat));
}

/**
 * Saved settings for audio between browser loads. I had to make this
 * into separate function because we want the audio settings to save without
 * a save button.
 */
function saveLocalAudio() {
  localStorage.setItem("alarmOn", JSON.stringify(alarmOn));
  localStorage.setItem("rainOn", JSON.stringify(rainOn));
  localStorage.setItem("alarmString", JSON.stringify(alarmString));
  localStorage.setItem("rainVolume", JSON.stringify(passiveRain.volume));
  localStorage.setItem("alarmVolume", JSON.stringify(alarmVolume));
}

/**
 * Loads both audio and settings from the browser.
 */
function loadLocal() {
  // Loads all of the possibly saved variables from localStorage
  const savedStudyT = localStorage.getItem("studyT");
  const savedShortT = localStorage.getItem("shortT");
  const savedLongT = localStorage.getItem("longT");
  const savedRepeat = localStorage.getItem("doesRepeat");
  const savedAlarm = localStorage.getItem("alarmOn");
  const savedRain = localStorage.getItem("rainOn");
  const savedAlarmString = localStorage.getItem("alarmString");
  const savedRainVolume = localStorage.getItem("rainVolume");
  const savedAlarmVolume = localStorage.getItem("alarmVolume");
  const savedCompPomos = localStorage.getItem("compPomos");

  // This sets the current variables to the saved ones
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
  if (savedRainVolume) {
    passiveRain.volume = JSON.parse(savedRainVolume);
    rainVolumeSlider.value = passiveRain.volume;
    updateRainVolumeDisplay();
  }
  if (savedAlarmVolume) {
    alarmVolume = JSON.parse(savedAlarmVolume);
    alarmVolumeSlider.value = alarmVolume;
    updateAlarmVolumeDisplay();
  }
  if (savedCompPomos) {
    compPomos = JSON.parse(savedCompPomos);
  }

  // Sets display of checkboxes and time values
  document.getElementById("studyTime").value = studyT;
  document.getElementById("shortTime").value = shortT;
  document.getElementById("longTime").value = longT;
  document.getElementById("timerRepeats").checked = doesRepeat;
  document.getElementById("rainOnCheck").checked = rainOn;
  document.getElementById("alarmOnCheck").checked = alarmOn;

  // Set the dropdown selection based on the loaded alarmString
  let alarmSelect = document.getElementById("mySelect");
  for (let i = 0; i < alarmSelect.options.length; i++) {
    if (alarmSelect.options[i].text === alarmString) {
      alarmSelect.selectedIndex = i;
      break;
    }
  }

  // Update the display for completed pomodoros
  document.getElementById("comp_pomos").innerText = `All time completed Pomodoros: ${String(compPomos)}`;
}

function updateCompletedPomodoros() {
  compPomos++;
  document.getElementById("comp_pomos").innerText = `All time completed Pomodoros: ${String(compPomos)}`;
  localStorage.setItem("compPomos", JSON.stringify(compPomos));
}

/**
 * Test function that sets the timer to 5 seconds.
 */
function five() {
  document.getElementById('timertext').innerText = `${String(0).padStart(2, '0')}:05`;
}
