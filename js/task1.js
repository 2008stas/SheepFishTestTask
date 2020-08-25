'use strict';

const btnGarlandGenerateRef = document.querySelector('#garland-generate');
const btnGarlandSwitchRef = document.querySelector('#garland-switch');
const garlandBoxRef = document.querySelector('.garland-box');
const outputRef = document.querySelector('.output');

const getRandomColor = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 255);
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
};

const getRandomNumber = quantity => {
  return Math.floor(Math.random() * quantity);
};

const createBoxes = amount => {
  let boxSize = 0;
  const boxesList = [];

  for (let i = 0; i < amount; i += 1) {
    boxSize = 30;
    boxesList[i] = document.createElement('div');
    boxesList[i].style.backgroundColor = getRandomColor();
    boxesList[i].style.width = `${boxSize}px`;
    boxesList[i].style.height = `${boxSize}px`;
    boxesList[i].style.display = `inline-block`;
    boxesList[i].style.borderRadius = '50%';
  }
  return boxesList;
};

let isFlashingOn = 0;

const getElementsList = () => {
  childNodes;
};

const changeAllColor = () => {};

btnGarlandGenerateRef.addEventListener('click', btnGarlandGenerateHandler);
btnGarlandSwitchRef.addEventListener('click', btnGarlandSwitchHandler);

function btnGarlandGenerateHandler() {
  const bolls = getRandomNumber(100);
  outputRef.textContent = `Generated ${bolls}`;
  garlandBoxRef.innerHTML = '';
  garlandBoxRef.append(...createBoxes(bolls));

  console.dir(garlandBoxRef);
}

function btnGarlandSwitchHandler() {
  isFlashingOn = !isFlashingOn;
  console.log('isFlashingOn', isFlashingOn);
  console.log('window.onfocus', window.onfocus);
  if (isFlashingOn) {
    setInterval(changeAllColor, 1000);
  }
}
