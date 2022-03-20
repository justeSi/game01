const lBox = document.querySelector('.left-box');
const rBox = document.querySelector('.right-box');
const sec = document.getElementById('sec');
const min = document.getElementById('min');
let arr = [];
let totalSeconds = 0;
let timer = 0;

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const randomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}8D`
}

const clearBoxes = (box) => {
    while (box.firstChild) {
        box.removeChild(box.lastChild);
    }
}

const setTime = () => {
    ++totalSeconds;
    sec.innerText = pad(totalSeconds % 60);
    min.innerText = pad(parseInt(totalSeconds / 60)) + ':';
}

const pad = (val) => {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

document.querySelector('.start').onclick = () => {
    document.querySelector('.start').disabled = true;
    timer = 0;
    timer = setInterval(setTime, 1000);
    while (arr.length < 25) {
        let rnd = random(1, 25);
        if (arr.indexOf(rnd) === -1) {
            arr.push(rnd);
        }
    }
    for (let i = 0; i < arr.length; i++) {
        const boxy = document.createElement('figure');
        boxy.className = 'small-box';
        boxy.id = arr[i];
        boxy.style.background = `radial-gradient(circle at 100px 100px, ${randomColor()}, ${randomColor()})`;
        (arr[i] < 10) ? boxy.innerText = '0' + arr[i]: boxy.innerText = arr[i];

        lBox.appendChild(boxy);
        boxy.addEventListener('click', function() {
            if (Math.min(...arr) === parseInt(boxy.id)) {
                rBox.appendChild(boxy);
                arr = arr.filter(item => item !== parseInt(boxy.id))
                Math.min(...arr);
                document.querySelector('.msg').innerText = '';
                if (arr.length === 0) {
                    document.querySelector('.msg').style.color = "green";
                    document.querySelector('.msg').innerText = `Nice JOB!!!`;
                    clearInterval(timer);
                }
            } else if (arr.indexOf(parseInt(boxy.id)) !== -1) {
                document.querySelector('.msg').innerText = `Wrong number. You need to find ${Math.min(...arr)}`;
            }
            if (arr.length !== 0) {
                for (let i = lBox.children.length; i >= 0; i--) {
                    lBox.appendChild(lBox.children[Math.random() * i | 0]);
                }
            }
        });
    }
}

document.querySelector('.reset').onclick = () => {
    document.querySelector('.start').disabled = false;
    arr = [];
    document.querySelector('.msg').innerText = '';
    clearBoxes(lBox);
    clearBoxes(rBox);
    clearInterval(timer);
    totalSeconds = 0;
    sec.innerHTML = '00';
    min.innerHTML = '00' + ':';
}