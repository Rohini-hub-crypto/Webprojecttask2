let hr = 0, min = 0, sec = 0, count = 0;
let timer = false;
let lapTimes = [];
let interval;

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const hrEl = document.getElementById('hr');
const minEl = document.getElementById('min');
const secEl = document.getElementById('sec');
const countEl = document.getElementById('count');
const lapList = document.getElementById('lap-list');

function updateDisplay() {
    hrEl.innerHTML = (hr < 10 ? '0' + hr : hr);
    minEl.innerHTML = (min < 10 ? '0' + min : min);
    secEl.innerHTML = (sec < 10 ? '0' + sec : sec);
    countEl.innerHTML = (count < 10 ? '0' + count : count);
}

function stopWatch() {
    if (timer) {
        count++;
        if (count === 100) {
            sec++;
            count = 0;
        }
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hr++;
            min = 0;
            sec = 0;
        }
        updateDisplay();
        interval = setTimeout(stopWatch, 10);
    }
}

startBtn.addEventListener('click', () => {
    if (!timer) {
        timer = true;
        stopWatch();
        startBtn.textContent = 'Running...';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    timer = false;
    clearTimeout(interval);
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
});

resetBtn.addEventListener('click', () => {
    timer = false;
    clearTimeout(interval);
    hr = min = sec = count = 0;
    lapTimes = [];
    updateDisplay();
    lapList.innerHTML = '';
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
    const lapTime = `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${count.toString().padStart(2, '0')}`;
    lapTimes.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(li);
});

pauseBtn.disabled = true;
lapBtn.disabled = true;
updateDisplay();