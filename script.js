const box = document.querySelector('.box');
const inputBox = document.querySelector('#inputBox');
const timeDisplay = document.querySelector('.timer');
const resultDisplay = document.querySelector('.result');

const defaultText = `In the end, we only regret the chances we didn't take. Life is about change, and embracing the unknown is the key to growth. Don't wait for the storm to pass, learn how to dance in the rain. The future belongs to those who believe in the beauty of their dreams. It's not the destination, but the journey that truly matters. Every setback is a setup for a comeback. You have the power to shape your own destiny, but first, you must believe in it. The greatest glory in living lies not in never falling, but in rising every time we fall. Be fearless in the pursuit of what sets your soul on fire.`;

let text = defaultText, verse = 30, constVerse = verse, index = 0, interval;
inputBox.maxLength = text.length;
timeDisplay.innerText = `${verse}s`;
let timerStarted = false;
inputBox.value = '';

const displayText = () => {
    box.innerHTML = text.split('').map(letter => `<span class="letter">${letter}</span>`).join('');
    document.querySelector('.letter').classList = 'first-letter';
};

const calculateWPM = () => {
    const typedCount = document.querySelectorAll('.got').length;
    const timeElapsed = constVerse - Math.floor(timeDisplay.innerText.slice(0, -1));
    const speed = (typedCount / 4.75) * (60 / timeElapsed);
    document.querySelector('#liveWPM').innerText = `${formatNumber(speed)} WPM`;
};

const endTest = (isTimeout) => {
    const typedCount = document.querySelectorAll('.got').length;
    const missedCount = document.querySelectorAll('.lost').length;
    const speed = isTimeout
        ? (typedCount / 4.75) * (60 / constVerse)
        : (typedCount / 4.75) * (60 / (constVerse - Math.floor(timeDisplay.innerText.slice(0, -1))));
    const accuracy = formatNumber((typedCount / (typedCount + missedCount)) * 100);
    resultDisplay.innerText = `Your last typing speed was ${formatNumber(speed)} WPM with ${accuracy}% accuracy.`;
    timeDisplay.innerText = "0s";
    localStorage.setItem('speedData', resultDisplay.innerText);
    restartTest();
};

const startTimer = () => {
    document.querySelector('.first-letter').classList.remove('first-letter');
    interval = setInterval(() => {
        if (verse > 0 && inputBox.value.length !== text.length) {
            timeDisplay.innerText = `${--verse}s`;
            calculateWPM();
        }
        if (verse === 0) endTest(true);
        else if (inputBox.value.length === text.length) endTest(false);
    }, 1000);
};

document.addEventListener('keydown', () => inputBox.focus());
document.addEventListener('click', () => inputBox.focus());

const formatNumber = num => parseFloat(num).toFixed(1);

inputBox.addEventListener('keydown', (e) => {
    if (inputBox.value.length === text.length) inputBox.disabled = true;
    if (e.code === "Tab") restartTest();
    document.addEventListener('keydown', (e) => {
        if (['Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
});

const typingLoop = () => {
    const letters = box.querySelectorAll('span');
    const character = inputBox.value[index++];
    if (index - 1 < letters.length) {
        letters[index - 1].classList.add(letters[index - 1].innerText === character ? 'got' : 'lost');
    }
};

inputBox.addEventListener('input', () => {
    if (!timerStarted) {
        timerStarted = true;
        document.querySelector('.first-letter').classList.add('no-animation');
        startTimer();
    }
    typingLoop();
});

const restartTest = () => {
    inputBox.disabled = false;
    clearInterval(interval);
    inputBox.value = '';
    verse = constVerse;
    index = 0;
    timerStarted = false;
    displayText();
    box.scrollTop = 0;
    timeDisplay.innerText = `${verse}s`;
    document.querySelector('#liveWPM').innerText = '';
};

const toggleTimeLimit = () => {
    if (!timerStarted) setTimeLimit(constVerse === 30 ? 60 : constVerse === 60 ? 120 : 30);
};

const setTimeLimit = (time) => {
    verse = constVerse = time;
    timeDisplay.innerText = `${time}s`;
};

try {
    if (localStorage.getItem('speedData') !== null) resultDisplay.innerText = localStorage.getItem('speedData');
} catch (e) {
    console.error("Error accessing localStorage:", e);
}

displayText();