// This is basically the main function. There may be a
// better way to do this. You can just write code straight
// in the File, but it doesnt guarantee all the page has loaded.
window.onload = function () {
  console.log("page loaded!")
  const timer = document.getElementById("timer")
};

function play() {
  alert("playing"); 
}

function pause() {
  alert("paused"); 
}

function restart() {
  timer.innerText = "00:00"
}
