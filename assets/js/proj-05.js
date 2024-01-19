const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.min');
const second = document.querySelector('.sec');
const decimoSec = document.querySelector('.display > p')
let tipo = false;
let time;
let num = 0;
let timeValue = ['00', '00', '00'];

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('btn1')) {
        btn1.classList.add('active');
        btn2.classList.remove('active');
        resetDisplay();
        arrowsHidden();
        tipo = true;
    }

    if (el.classList.contains('btn2')) {
        btn2.classList.add('active');
        btn1.classList.remove('active');
        // resetDisplay();
        loadTime();
        arrowsShow();
        tipo = false;
    }

    if (el.classList.contains('secArrowUp')) {
        let num1 = Number(second.innerHTML);
        if (num1 === 59) {
            num1 = num1;
        } else {
            num1++;
        }
        num1 = num1.toString().padStart(2, '0');
        second.innerHTML = num1;
    }

    if (el.classList.contains('secArrowDown')) {
        let num1 = Number(second.innerHTML);
        if (num1 === 0) {
            num1 = num1;
        } else {
            num1--;
        }
        num1 = num1.toString().padStart(2, '0');
        second.innerHTML = num1;
    }

    if (el.classList.contains('minArrowUp')) {
        let num1 = Number(minute.innerHTML);
        if (num1 === 59) {
            num1 = num1;
        } else {
            num1++;
        }
        num1 = num1.toString().padStart(2, '0');
        minute.innerHTML = num1;
    }

    if (el.classList.contains('minArrowDown')) {
        let num1 = Number(minute.innerHTML);
        if (num1 === 0) {
            num1 = num1;
        } else {
            num1--;
        }
        num1 = num1.toString().padStart(2, '0');
        minute.innerHTML = num1;
    }

    if (el.classList.contains('hourArrowUp')) {
        let num1 = Number(hour.innerHTML);
        if (num1 === 24) {
            num1 = num1;
        } else {
            num1++;
        }
        num1 = num1.toString().padStart(2, '0');
        hour.innerHTML = num1;
    }

    if (el.classList.contains('hourArrowDown')) {
        let num1 = Number(hour.innerHTML);
        if (num1 === 0) {
            num1 = num1;
        } else {
            num1--;
        }
        num1 = num1.toString().padStart(2, '0');
        hour.innerHTML = num1;
    }

    if (el.classList.contains('start')) {
        if(tipo) {
            clearInterval(time);
            startCronometro();
        } else {
            saveTime();
            arrowsHidden();
            startTimer();
        }
    }

    if (el.classList.contains('pause')) {
        if (tipo) {
            clearInterval(time);
        } else {
            clearInterval(time);
        }
    }

    if (el.classList.contains('reset')) {
        if (tipo) {
            resetDisplay();
        } else {
            loadTime();
            arrowsShow();
            clearInterval(time);
        }
    }
});

const arrowsHidden = () => {
    const arrows = document.querySelectorAll('.display .digito img');
    arrows.forEach((arrow) => {
        arrow.classList.add('hidden');
    });
};

const arrowsShow = () => {
    const arrows = document.querySelectorAll('.display .digito img');
    arrows.forEach((arrow) => {
        arrow.classList.remove('hidden');
    });
};

const startCronometro = () => {
    time = setInterval(function() {
        if (num === 99) {
            num = 0;
            addSecond();
        } else {
            num++;
        }
        let numString = num.toString().padStart(2, '0');
        decimoSec.innerHTML = numString;
    }, 10);
};

const resetDisplay = () => {
    second.innerHTML = "00";
    minute.innerHTML = "00";
    hour.innerHTML = "00";
    decimoSec.innerHTML = "00";
    num = 0;
    clearInterval(time);
};

const addSecond = () => {
    let num1 = Number(second.innerHTML);
    if (num1 === 59) {
        num1 = 0;
        addMinute();
    } else {
        num1++;
    }
    num1 = num1.toString().padStart(2, '0');
    second.innerHTML = num1;
}

const addMinute = () => {
    let num1 = Number(minute.innerHTML);
    if (num1 === 59) {
        num1 = 0;
        addHour();
    } else {
        num1++;
    }
    num1 = num1.toString().padStart(2, '0');
    minute.innerHTML = num1;
};

const addHour = () => {
    let num1 = Number(hour.innerHTML);
    if (num1 === 24) {
        num1 = 0;
    } else {
        num1++;
    }
    num1 = num1.toString().padStart(2, '0');
    hour.innerHTML = num1;
};

// Timer
const startTimer = () => {
    if (finish()) return;
    let num2;
    time = setInterval(function() {
        if (finish()) return;
        num2 = Number(decimoSec.innerHTML);
        if (num2 === 0) {
            num2 = 99;
            subSecond();
        } else {
            num2--;
        }
        let numString = num2.toString().padStart(2, '0');
        decimoSec.innerHTML = numString;
    }, 10);
};

const subSecond = () => {
    let num1 = Number(second.innerHTML);
    if (num1 === 0) {
        num1 = 59;
        subMinute();
    } else {
        num1--;
    }
    num1 = num1.toString().padStart(2, '0');
    second.innerHTML = num1;
};

const subMinute = () => {
    let num1 = Number(minute.innerHTML);
    if (num1 === 0) {
        num1 = 59;
        subHour();
    } else {
        num1--;
    }
    num1 = num1.toString().padStart(2, '0');
    minute.innerHTML = num1;
};

const subHour = () => {
    let num1 = Number(hour.innerHTML);
    num1--;
    num1 = num1.toString().padStart(2, '0');
    hour.innerHTML = num1;
};

const finish = () => {
    // console.log('oi');
    // clearInterval(time);
    // return ((hour.innerHTML === "00") && (minute.innerHTML === "00") && (second.innerHTML === "00") && (decimoSec.innerHTML === "00"));
    if ((hour.innerHTML === "00") && (minute.innerHTML === "00") && (second.innerHTML === "00") && (decimoSec.innerHTML === "00")) {
        clearInterval(time);
        return true;
    } else {
        return false;
    }
};

const saveTime = () => {
    timeValue[0] = hour.innerHTML;
    timeValue[1] = minute.innerHTML;
    timeValue[2] = second.innerHTML;
};

const loadTime = () => {
    hour.innerHTML = timeValue[0];
    minute.innerHTML = timeValue[1];
    second.innerHTML = timeValue[2];
    decimoSec.innerHTML = "00";
}