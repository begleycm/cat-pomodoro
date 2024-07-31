// The code below plays the click audio whenever some kind of button is clicked.

// All of the buttons
var buttons = document.getElementsByClassName("control_button");

// This plays a click sound when a button is hit
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

// This adds a click noise for all x buttons for windows
var xButtons = document.getElementsByClassName("x");

for (var i = 0; i < xButtons.length; i++) {
  xButtons[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

var modes = document.getElementsByClassName("mode_tab");

for (var i = 0; i < modes.length; i++) {
  modes[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

var menuButtons = document.getElementsByClassName("menuButton");

// This makes all menu buttons play a noise when clicked
for (var i = 0; i < menuButtons.length; i++) {
  menuButtons[i].addEventListener("click", function () {
    clickAudio.play();
  });
}

// The below code deals with rain audio and alarm audio.

var alarmString = "simple"
var clickAudio = new Audio("sounds/mixkit-interface-click-1126.wav"); // click button sound
var alarmOn = true;                                                   // bool for if the alarm should be on

// Rain noise stuff:
var passiveRain = new Audio("sounds/passive_rain.mp3");
passiveRain.loop = true;
var rainOn = true;

function playAlarm() {
  var alarmSound = new Audio("sounds/" + alarmString + ".mp3");
  alarmSound.volume = alarmVolume
  if (alarmOn) {
    alarmSound.play();
  }
}

// Bunch of volume variables defined
const rainVolumeSlider = document.getElementById("rain-volume-slider");
const alarmVolumeSlider = document.getElementById("alarm-volume-slider");
const rainDisplay = document.getElementById("rain-volume-display");
const alarmDisplay = document.getElementById("alarm-volume-display");
var alarmVolume = 0.5;

passiveRain.volume = rainVolumeSlider.value;

/**
 * Changes which alarm is being used.
 */
function changeAlarm() {
  var x = document.getElementById("mySelect");
  var i = x.selectedIndex;
  alarmString = x.options[i].text;
  console.log(alarmString);
  saveLocalAudio();
}

/**
 * Controls the rain audio for whent he checkbox is changed.
 */
rainOnCheck.addEventListener("change", () => {
  rainOn = document.getElementById('rainOnCheck').checked;
  if (rainOn && !isPaused) { // Should only play when timer is started
    passiveRain.play();
  } else {
    passiveRain.pause();
  }
  saveLocalAudio();
});

/**
 * Controls the alarm audio for when the checkbox is changed.
 */
alarmOnCheck.addEventListener("change", () => {
  alarmOn = document.getElementById('alarmOnCheck').checked;
  console.log(alarmOn);
  saveLocalAudio();
});
