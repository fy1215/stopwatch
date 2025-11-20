const time = document.getElementById('time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
let startTime;
let stopTime = 0;
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

start.addEventListener('click', () => {
    if(timer) clearInterval(timer);
    if (start.textContent === 'スタート') {
        startTime = Date.now();
        changeButtonText(start, '一時停止');
        
    } else if (start.textContent === '一時停止') {
        stopTime = Date.now() - startTime;
        changeButtonText(start, 'リスタート');
        return;
        
    } else {
        startTime = Date.now() - stopTime;
        changeButtonText(start, '一時停止');
    }
    time.textContent = formatTime(Date.now() - startTime);
    timer = setInterval(() => {
        time.textContent = formatTime(Date.now() - startTime);
    }, 1000);
})

reset.addEventListener('click', () => {
    clearInterval(timer);
    time.textContent = '00:00:00';
    stopTime = 0;
    if (start.textContent !== 'スタート') {
        changeButtonText(start, 'スタート');
    }
})
