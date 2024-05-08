// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!")
};

var start = document.getElementById('start');
var reset = document.getElementById('reset');
var pause = document.getElementById('pause');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

// store a ref to a timer variable
var timerInterval;

function startTimer() { // starts timer
  if(timerInterval == undefined){
    timerInterval = setInterval(timer, 1000);
  } else {
    alert("Timer is already running");
  } 
}

function pause() { // doesn't work
  timerInterval = setInterval(timer, 1);
}

function reset() { // doesn't work
  wm.innerText = "25";
  ws.innerText = "00";
}

function timer() { // Increments timer by 1 second until 0
  if(ws.innerText != 0) {
    console.log(ws)
    ws.innerText--;
  } else if(wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }
}
