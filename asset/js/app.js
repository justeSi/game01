let lBox = document.querySelector('.left-box');
let rBox = document.querySelector('.right-box');
let arr = [];
let sec = document.getElementById('sec');
let min = document.getElementById('min');
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
    sec.innerHTML = pad(totalSeconds % 60);
    min.innerHTML = pad(parseInt(totalSeconds / 60)) + ':';
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
        const b = document.createElement('figure');
        b.className = 'small-box';
        b.id = arr[i];
        b.style.background = `radial-gradient(circle at 100px 100px, ${randomColor()}, ${randomColor()})`;
        if (arr[i] < 10) {
            b.innerHTML = '0' + arr[i];
        } else {
            b.innerHTML = arr[i];
        }
        lBox.appendChild(b);
        b.addEventListener('click', function() {
            console.log(Math.min(...arr))
            if (Math.min(...arr) === parseInt(b.id)) {
                console.log(b.id)
                rBox.appendChild(b);
                arr = arr.filter(item => item !== parseInt(b.id))
                console.log(arr)
                Math.min(...arr);
                console.log(arr.length)
                document.querySelector('.msg').innerText = '';
                if (arr.length === 0) {
                    document.querySelector('.msg').innerText = `Nice JOB!!!`;
                    clearInterval(timer);

                }
            } else {
                document.querySelector('.msg').innerText = `Wrong number. You need to find ${Math.min(...arr)}`;
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