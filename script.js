const time = document.getElementById('time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const btns = document.querySelector('.btns');
const lap = document.getElementById('lap');
const lapList = document.getElementById('lapList');

let startTime;
let stopTime = 0;
let lapNumber = 0;
let timer = null;

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

function changeButtonText(button, newText) {
    button.style.opacity = '0';
    setTimeout(() => {
        button.textContent = newText;
        button.style.opacity = '1';
    }, 200);
}

function changeElement(Element) {
    Element.style.opacity = '0';
    setTimeout(() => {
        start.textContent = 'スタート';
        Element.style.opacity = '1';
    }, 200);

}

start.addEventListener('click', () => {
    if (timer) clearInterval(timer);
    if (start.textContent === 'スタート') {
        startTime = Date.now();
        changeButtonText(start, '一時停止');
        lap.disabled = false;
        reset.disabled = false;
    } else if (start.textContent === '一時停止') {
        stopTime = Date.now() - startTime;
        changeButtonText(start, 'リスタート');
        lap.disabled = true;
        return;
    } else {
        startTime = Date.now() - stopTime;
        changeButtonText(start, '一時停止');
        lap.disabled = false;
        reset.disabled = false;
    }
    time.textContent = formatTime(Date.now() - startTime);
    timer = setInterval(() => {
        time.textContent = formatTime(Date.now() - startTime);
    }, 1000);
})

reset.addEventListener('click', () => {
    clearInterval(timer);
    lapList.innerHTML = '';
    time.textContent = '00:00:00';
    stopTime = 0;
    lapNumber = 0;
    if (start.textContent !== 'スタート') {
        changeElement(btns);
        reset.disabled = true;
        lap.disabled = true;
    }
})

lap.addEventListener('click', () => {
    lapNumber++;
    const li = document.createElement('li');
    li.textContent = `ラップ${lapNumber} : ${formatTime(Date.now() - startTime)}`
    lapList.prepend(li);
})
