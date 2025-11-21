const time = document.getElementById('time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const btns = document.querySelector('.btns');
const lap = document.getElementById('lap');
const lapList = document.getElementById('lapList');

let startTime;
let stopTime = 0;
let lapNumber = 0;
let lastLapTime = 0;
let timer = null;

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const msStr = String(ms).padStart(2, '0');

    return `${hh}:${mm}:${ss}.${msStr}`;
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
    }, 10);
})

reset.addEventListener('click', () => {
    clearInterval(timer);
    lapList.innerHTML = '';
    time.textContent = '00:00:00:00';
    stopTime = 0;
    lapNumber = 0;
    lastLapTime = 0;
    if (start.textContent !== 'スタート') {
        changeElement(btns);
        reset.disabled = true;
        lap.disabled = true;
    }
})

lap.addEventListener('click', () => {
    const currentTime = Date.now() - startTime;
    lapNumber++;
    const li = document.createElement('li');
    if (lastLapTime === 0) {
        li.textContent = `ラップ${lapNumber} : ${formatTime(currentTime)}`;
    } else {
        li.textContent = `ラップ${lapNumber} : ${formatTime(currentTime)} (+${formatTime(currentTime - lastLapTime)})`;
    }
    lastLapTime = currentTime;
    lapList.prepend(li);
    if (lapList.children.length > 20) {
        lapList.lastChild.remove();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        start.click();
    } else if (e.code === 'KeyR' && !reset.disabled) {
        reset.click();
    } else if (e.code === 'KeyL' && !lap.disabled) {
        lap.click();
    }
})
