const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const elemBody = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function onStart(){
timerId = setInterval(getBgColor,1000);
btnStart.toggleAttribute('disabled');
btnStop.removeAttribute('disabled')
}

function onStop(){
clearInterval(timerId);
btnStart.removeAttribute('disabled');
btnStop.toggleAttribute('disabled')
}

function getBgColor(){
    elemBody.style.backgroundColor = getRandomHexColor()
}