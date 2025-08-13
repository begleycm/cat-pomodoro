// Bunch of volume variables defined for audio slider stuff

const rainVolumeSlider = document.getElementById("rain-volume-slider");
const alarmVolumeSlider = document.getElementById("alarm-volume-slider");
const rainDisplay = document.getElementById("rain-volume-display");
const alarmDisplay = document.getElementById("alarm-volume-display");

// Default values for background and volume
var alarmVolume = 0.5;
var bkString = "darktile"

// Below is code that makes the windows draggable.

const titleBars = document.querySelectorAll(".titlebar");
var selection = null;

var top_element_z = 1;

function onMouseDrag({ movementX, movementY }) {
  if (selection) {
    let myParent = selection.closest(".fauxwindow");
    
    let getStyle = window.getComputedStyle(myParent);
    let leftValue = parseInt(getStyle.left);
    let topValue = parseInt(getStyle.top);

    myParent.style.zIndex = top_element_z // sets the window to have the top z index

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
    top_element_z += 1;
  });
});

document.addEventListener("mouseup", () => {
  selection = null;
});

// The three below functions are for opening and closing the about menu, settings menu,
// and the audio settings menu.

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
 * Spawns the audio settings menu in.
 */
function openQueueWindow() {
  
  let queueVis = document.getElementById("queue_menu");

  if (queueVis.style.visibility === "hidden") {
    queueVis.style.visibility = "visible";
    console.log("queue was hidden, now visible")
  } else {
    queueVis.style.visibility = "hidden";
    console.log("queue was visible, now invisible")
  }
}

// This part of the code handles when the user switches between modes using the study tabs.

// this may be diabolical idk
function handleModeSelect(mode) {
    const studyBtn = document.getElementById("studytab");
    const breakBtn = document.getElementById("breaktab");
  
    if (typeof (mode) != "string") {
      console.log("ERROR: mode needs to be a string")
      return;
    }
    switch (mode) {
      case "study":
        studyBtn.classList.add("active_tab")
        breakBtn.classList.remove("active_tab")
        break;
      case "break":
        studyBtn.classList.remove("active_tab")
        breakBtn.classList.add("active_tab")
        break;
      default:
        break;
    }
}

/**
 * Function that changes the rain slider as needed.
 */
rainVolumeSlider.addEventListener("input", () => {
  passiveRain.volume = rainVolumeSlider.value;
  updateRainVolumeDisplay();
  saveLocalAudio()
});

// These functions play noise when a slider is released by touch or mouse.
rainVolumeSlider.addEventListener('mouseup', () => {
  clickAudio.play();
});

rainVolumeSlider.addEventListener('touchend', () => {
  sound.play();
});

alarmVolumeSlider.addEventListener('mouseup', () => {
  clickAudio.play();
});

alarmVolumeSlider.addEventListener('touchend', () => {
  sound.play();
});

/**
 * Function that changes the alarm slider and its display value.
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

// Stuff for resizing windows.

let timerWindow = document.getElementById("timer_menu");
let settingsWindow = document.getElementById("settings_menu");
let aboutWindow = document.getElementById("about_menu");
let audioWindow = document.getElementById("audio_settings_menu");

addEventListener("resize", (event) => {

  if (window.innerWidth > 810) {

    timerWindow.style.left = "50%";
    timerWindow.style.top = "10%";

    settingsWindow.style.left = "75%";
    settingsWindow.style.top = "25%";

    aboutWindow.style.left = "20%";
    aboutWindow.style.top = "25%";

    audioWindow.style.left = "50%";
    audioWindow.style.top = "30%";
  } else {
    timerWindow.style.left = "50%";
    timerWindow.style.top = "0%";

    settingsWindow.style.left = "50%";
    settingsWindow.style.top = "0%";

    aboutWindow.style.left = "50%";
    aboutWindow.style.top = "0%";

    audioWindow.style.left = "50%";
    audioWindow.style.top = "0%";
  }

});

if (window.innerWidth < 810) {
  timerWindow.style.left = "50%";
  timerWindow.style.top = "0%";

  settingsWindow.style.left = "50%";
  settingsWindow.style.top = "0%";

  aboutWindow.style.left = "50%";
  aboutWindow.style.top = "0%";

  audioWindow.style.left = "50%";
  audioWindow.style.top = "0%";
}

function setBreak() {
  // These represent the tabs "Study" and "Break"
  let studyTab = document.getElementById("studytab");
  let breakTab = document.getElementById("breaktab");

  breakTab.classList.add("active_tab");
  studyTab.classList.remove("active_tab");
}

function setStudy() {
  // These represent the tabs "Study" and "Break"
  let studyTab = document.getElementById("studytab");
  let breakTab = document.getElementById("breaktab");

  // This sets the mode tab to studying.
  studyTab.classList.add("active_tab");
  breakTab.classList.remove("active_tab");
}

/**
 * Changes which background is being used. This is called when
 * there is a change in the dropdown menu.
 */
function changeBKGR() {
  var x = document.getElementById("mySelectBk");
  var i = x.selectedIndex;
  let bk = x.options[i].text;
  document.body.style.backgroundImage = "url('images/" + bk + ".png')";
  saveLocalBk();
}

function toggleFileMenu() {
    document.getElementById("fileDropdown").classList.toggle("show");
}

function exitApp() {
    document.body.innerHTML = "<h1 style='text-align:center; margin-top: 20%;'>Goodbye 👋</h1>";
}

// Optional: Click outside to close
window.addEventListener("click", function(e) {
    if (!e.target.matches('.menuButton')) {
        let dropdown = document.getElementById("fileDropdown");
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    }
});
