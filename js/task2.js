'use strict';
import galleryItems from './gallery-items.js';

const dotsBoxRef = document.querySelector('.js-dotsBox');
const task2Ref = document.querySelector('#task2');

const slideListRef = document.querySelector('.slides');
const btnPrevRef = document.querySelector('#btn-prev');
const btnNextRef = document.querySelector('#btn-next');
const slidesReF = slideListRef.querySelectorAll('.slide');
const sliderRef = document.querySelector('.slider');

let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;
let threshold = 100;
let allowShift = true;
let index = 0;

let setActiveSlide = 0;

const slidesLength = slidesReF.length;

addAdditionalElements();

reSize();

const createBoxes = amount => {
  const boxesList = [];
  for (let i = 0; i < amount; i += 1) {
    boxesList[i] = document.createElement('div');
    boxesList[i].textContent = i + 1;

    boxesList[i].classList.add('slider__dot');
  }
  return boxesList;
};

dotsBoxRef.append(...createBoxes(slidesLength));

slideListRef.onmousedown = dragStart;

slideListRef.addEventListener('touchstart', dragStart);
slideListRef.addEventListener('touchend', dragEnd);
slideListRef.addEventListener('touchmove', dragAction);

btnPrevRef.addEventListener('click', btnPrevHandler);
btnNextRef.addEventListener('click', btnNextHandler);
dotsBoxRef.addEventListener('click', dotsBoxHandler);

window.addEventListener('resize', windowHandler);

slideListRef.addEventListener('transitionend', checkIndex);

function btnPrevHandler() {
  shiftSlide(-1);
}

function btnNextHandler() {
  shiftSlide(1);
}

function dotsBoxHandler(event) {
  console.dir(event);
  console.dir(event.target);

  setActiveSlide = event.target;
}

function windowHandler() {
  reSize();
  getNumberSlider();

  console.log(getNumberSlider());
}

function shiftSlide(direction, action) {
  slideListRef.classList.add('shifting');

  if (allowShift) {
    if (!action) {
      posInitial = slideListRef.offsetLeft;
    }

    if (direction > 0) {
      slideListRef.style.left = posInitial - getSlideSize() / getNumberSlider() + 'px';
      index += 1;
    } else if (direction < 0) {
      slideListRef.style.left = posInitial + getSlideSize() / getNumberSlider() + 'px';
      index -= 1;
    }
  }

  allowShift = false;
}

function checkIndex() {
  slideListRef.classList.remove('shifting');

  if (index == -1) {
    slideListRef.style.left = -((slidesLength * getSlideSize()) / getNumberSlider()) + 'px';
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slideListRef.style.left = -((1 * getSlideSize()) / getNumberSlider()) + 'px';
    index = 0;
  }

  allowShift = true;
}

function dragStart(event) {
  event = event || window.event;
  event.preventDefault();
  posInitial = slideListRef.offsetLeft;

  if (event.type == 'touchstart') {
    posX1 = event.touches[0].clientX;
  } else {
    posX1 = event.clientX;
    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
  }
}

function dragAction(event) {
  event = event || window.event;

  if (event.type == 'touchmove') {
    posX2 = posX1 - event.touches[0].clientX;
    posX1 = event.touches[0].clientX;
  } else {
    posX2 = posX1 - event.clientX;
    posX1 = event.clientX;
  }
  slideListRef.style.left = slideListRef.offsetLeft - posX2 + 'px';
}

function dragEnd() {
  posFinal = slideListRef.offsetLeft;
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, 'drag');
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, 'drag');
  } else {
    slideListRef.style.left = posInitial + 'px';
  }

  document.onmouseup = null;
  document.onmousemove = null;
}

function reSize() {
  slideListRef
    .querySelectorAll('.slide')
    .forEach(el => (el.style.width = `${getSlideSize() / getNumberSlider()}px`));
  sliderRef.style.width = `${getSlideSize()}px`;
  slideListRef.style.left = `-${getSlideSize() / getNumberSlider()}px`;
}

function getNumberSlider() {
  const screenWidth = document.documentElement.clientWidth;
  if (screenWidth >= 1024) {
    return 3;
  }
  if (screenWidth < 1024 && screenWidth >= 480) {
    return 2;
  }

  return 1;
}

function getSlideSize() {
  return Math.floor(task2Ref.offsetWidth - 50);
}

function addAdditionalElements() {
  const n = 3;
  for (let i = 0; i < n; i += 1) {
    slideListRef.appendChild(slidesReF[i].cloneNode(true));
  }
  for (let i = 0; i < n; i += 1) {
    slideListRef.insertBefore(slidesReF[slidesLength + i - n].cloneNode(true), slidesReF[0]);
  }
}
