'use strict';

'use strict';

const btnGarlandGenerateRef = document.querySelector('#garland-generate');
const btnGarlandSwitchRef = document.querySelector('#garland-switch');
const garlandBoxRef = document.querySelector('.garland-box');
const outputRef = document.querySelector('.output');

const intervalTime = 1000;
let isFlashingOn = false;
let flashing;
const currentRandomColor = [];

const getRandomColor = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 255);
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
};

const getRandomIntegerNumber = maxRandom => {
  return Math.floor(Math.random() * maxRandom);
};

const createBoxes = amount => {
  const boxSize = 30;
  const boxesList = [];
  for (let i = 0; i < amount; i += 1) {
    boxesList[i] = document.createElement('div');
    boxesList[i].style.backgroundColor = currentRandomColor[i] = getRandomColor();
    boxesList[i].style.width = `${boxSize}px`;
    boxesList[i].style.height = `${boxSize}px`;
    boxesList[i].style.display = `inline-block`;
    boxesList[i].style.borderRadius = '50%';
  }
  return boxesList;
};

const getElementsList = () => garlandBoxRef.childNodes;

const changeAllColor = () => {
  getElementsList().forEach((el, i) => {
    let newColor = () => {
      const newRandomColor = getRandomColor();
      if (newRandomColor !== currentRandomColor[i]) {
        el.style.backgroundColor = newRandomColor;
      } else {
        newColor();
      }
    };
    newColor();
  });
};

btnGarlandGenerateRef.addEventListener('click', btnGarlandGenerateHandler);
btnGarlandSwitchRef.addEventListener('click', btnGarlandSwitchHandler);

function btnGarlandGenerateHandler() {
  clearInterval(flashing);
  const balls = getRandomIntegerNumber(100);
  isFlashingOn = false;
  outputRef.textContent = `Generated ${balls}`;
  garlandBoxRef.innerHTML = '';
  garlandBoxRef.append(...createBoxes(balls));
}

function btnGarlandSwitchHandler() {
  isFlashingOn = !isFlashingOn;
  btnGarlandSwitchRef.textContent = isFlashingOn ? 'OFF garland' : 'ON garland';
  clearInterval(flashing);
  if (isFlashingOn) {
    flashing = setInterval(changeAllColor, intervalTime);
  }
}
