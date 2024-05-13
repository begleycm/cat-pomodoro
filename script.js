// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!");
  more(); // this just auto closes the window, theres probably a better way to do this.
};

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var timerInterval; // store a ref to a timer variable

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

  if(wm.innerText == 0 && ws.innerText == 0) {
    wm.innerText = 25;
    ws.innerText = "00";

    document.getElementById('counter').innerText++;
  }
}

function pause() { // doesn't work
  if (timerInterval == undefined) {
    alert("You need to hit start!");
  }
  stopInterval()
  timerInterval = undefined;
}

function reset() { // doesn't work
  wm.innerText = 25;
  ws.innerText = "00";

  stopInterval()
  timerInterval = undefined;
}

function stopInterval() { // Stops the calculator
  clearInterval(timerInterval)
}

function more() {
  let menu = document.getElementById("more_menu")
  
  
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  }
  else {
    menu.style.visibility = "hidden"
  }

  
}
