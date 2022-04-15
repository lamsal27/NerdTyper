const box = document.querySelector('.box');
const inputBox = document.querySelector('#inputBox');
const time = document.querySelector('.timer');
const restart = document.querySelector('svg');

// text = 'Kris loves to go and play the game what about go about early must feel program with for the integer in python and other programming languages like the man who loves the girl and the man who the man';

let executed, stone, interval, speed, got;

text = 'A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.'
index = 0;

let verse = 30;
let quicksilver = 29;
let wanda = 28;

const gameLoop = () => {
    text.split('').forEach(span => {
        spanTag = `<span>${span}</span>`;
        box.innerHTML += spanTag;
    });
    document.addEventListener('keydown', () => inputBox.focus());
    document.addEventListener('click', () => inputBox.focus());
};

const timeLoop = () => {
    time.innerText = quicksilver;
    stone = wanda;

    interval = setInterval(() => {
        if (stone > 0) {
            time.innerText = stone;
            stone--;
        } else {
            clearInterval(interval);
            time.innerText = '';
            got = document.querySelectorAll('.got');
            if (verse == 15) {
                speed = (got.length / 5) * 4;
            } else if (verse == 30) {
                speed = (got.length / 5) * 2;
            } else {
                speed = (got.length / 5);
            }

            alert(`Your typing speed was ${speed} WPM!`)
            location.reload();
        }
    }, 1000);
};

gameLoop();

const teslaLoop = () => {
    letters = box.querySelectorAll('span');
    character = inputBox.value.split('')[index];
    time.style.cursor = 'default';
    if (letters[index].innerText === character) {
        letters[index].classList.add('got');
    } else {
        letters[index].classList.add('lost');
    };
    index++;
};

const runOnce = () => {
    if (executed !== false) {
        timeLoop();
        executed = false;
    }
};

inputBox.addEventListener('input', teslaLoop);
inputBox.addEventListener('input', runOnce);

inputBox.addEventListener('keydown', (key) => {

    switch (key.code) {
        case 'Backspace':
            event.preventDefault();
            break;

        case 'ArrowLeft':
            if (time.innerText == 60) {
                time.innerText = 30;
                quicksilver = 29;
                wanda = 28;
                verse = time.innerText;
            } else if (time.innerText == 30) {
                quicksilver = 14;
                wanda = 13;
                time.innerText = 15;
                verse = time.innerText;
            } else if (time.innerText == 15) {
                quicksilver = 59;
                wanda = 58;
                time.innerText = 60;
                verse = time.innerText;
            }
            break;

        case 'ArrowRight':
            if (time.innerText == 60) {
                time.innerText = 15;
                quicksilver = 14;
                wanda = 13;
                verse = time.innerText;
            } else if (time.innerText == 30) {
                quicksilver = 59;
                wanda = 58;
                time.innerText = 60;
                verse = time.innerText;
            } else if (time.innerText == 15) {
                quicksilver = 29;
                wanda = 28;
                time.innerText = 30;
                verse = time.innerText;
            }
            break;

        case 'ArrowUp':
            event.preventDefault();
            break;
    }
});

const twist = () => {
    if (time.innerText == 60) {
        time.innerText = 15;
        quicksilver = 14;
        wanda = 13;
        verse = time.innerText;
    } else if (time.innerText == 30) {
        quicksilver = 59;
        wanda = 58;
        time.innerText = 60;
        verse = time.innerText;
    } else if (time.innerText == 15) {
        quicksilver = 29;
        wanda = 28;
        time.innerText = 30;
        verse = time.innerText;
    }
};

console.log('Made by Siddharth Lamsal! :)');