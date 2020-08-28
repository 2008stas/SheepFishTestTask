'use strict';
import galleryItems from './gallery-items.js';

const dotsBoxRef = document.querySelector('.js-dotsBox');
const task2Ref = document.querySelector('#task2');

const slideListRef = document.querySelector('.slides');
const btnPrevRef = document.querySelector('#btn-prev');
const btnNextRef = document.querySelector('#btn-next');
// const slidesReF = slideListRef.querySelectorAll('.slide');
const sliderRef = document.querySelector('.slider');

let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;
let threshold = 100;
let allowShift = true;
let activeSlide = 0;

let setActiveSlide = 0;
let checkedIndex = 0;
const additionElements = 3;

// const slidesLength = slidesReF.length;
const slidesLength = galleryItems.length;

const createDots = amount => {
  const dotsList = [];
  for (let i = 0; i < amount; i += 1) {
    dotsList[i] = document.createElement('div');
    // dotsList[i].textContent = i + 1;
    dotsList[i].classList.add('slider__dot');
    dotsList[i].style.backgroundImage = galleryItems[i].preview;
  }

  dotsList.forEach((el, i) => {
    const img = document.createElement('img');
    img.setAttribute('src', galleryItems[i].preview);
    img.setAttribute('alt', galleryItems[i].description);
    img.classList.add('slider__dot-img');
    dotsList[i].append(img);
  });
  return dotsList;
};

const createGalleryItems = amount => {
  const items = [];

  for (let i = 0; i < amount; i += 1) {
    items[i] = document.createElement('div');
    items[i].classList.add('slide');
    items[i].append(document.createElement('img'));
    items[i].firstChild.setAttribute('src', galleryItems[i].original);
    items[i].firstChild.setAttribute('alt', galleryItems[i].description);
    items[i].firstChild.classList.add('slider__img');
  }
  return items;
};

const slidesReF = createGalleryItems(slidesLength);

dotsBoxRef.append(...createDots(slidesLength));
slideListRef.append(...slidesReF);

addAdditionalElements();

reSize();

changeStyleDots();

slideListRef.onmousedown = dragStart;

slideListRef.addEventListener('touchstart', dragStart);
slideListRef.addEventListener('touchend', dragEnd);
slideListRef.addEventListener('touchmove', dragAction);

btnPrevRef.addEventListener('click', btnPrevHandler);
btnNextRef.addEventListener('click', btnNextHandler);
dotsBoxRef.addEventListener('click', dotsBoxHandler);

window.addEventListener('resize', windowHandler);

slideListRef.addEventListener('transitionend', slideListHolder);

function slideListHolder() {
  checkIndex();
  changeStyleDots();
}

function btnPrevHandler() {
  shiftSlide(-1);
}

function btnNextHandler() {
  shiftSlide(1);
}

function dotsBoxHandler(event) {
  event.currentTarget.childNodes.forEach((el, i) => {
    if (el.firstChild === event.target) {
      setActiveSlide = i;
    }
  });

  if (setActiveSlide > activeSlide) {
    shiftSlide(1, false, setActiveSlide - activeSlide);
  }
  if (setActiveSlide < activeSlide) {
    shiftSlide(-1, false, activeSlide - setActiveSlide);
  }
}

function changeStyleDots() {
  dotsBoxRef.childNodes.forEach((el, i) => {
    i === activeSlide
      ? el.classList.add('slider__dot--active')
      : el.classList.remove('slider__dot--active');
  });
}

function windowHandler() {
  reSize();
  getNumberSlider();
}

function shiftSlide(direction, action, distance = 1) {
  slideListRef.classList.add('shifting');

  if (allowShift) {
    if (!action) {
      posInitial = slideListRef.offsetLeft;
    }

    if (direction > 0 && distance) {
      slideListRef.style.left =
        posInitial - (distance * getSliderSize()) / getNumberSlider() + 'px';
      activeSlide += distance;
    } else if (direction < 0 && distance) {
      slideListRef.style.left =
        posInitial + (distance * getSliderSize()) / getNumberSlider() + 'px';
      activeSlide -= distance;
    }
  }

  allowShift = false;
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
    .forEach(el => (el.style.width = `${getSliderSize() / getNumberSlider()}px`));
  sliderRef.style.width = `${getSliderSize()}px`;

  slideListRef.style.left = `-${
    (getSliderSize() / getNumberSlider()) * additionElements +
    (activeSlide * getSliderSize()) / getNumberSlider()
  }px`;
}

function getNumberSlider() {
  const screenWidth = document.documentElement.clientWidth;
  if (screenWidth >= 1024) return 3;
  if (screenWidth < 1024 && screenWidth >= 480) return 2;
  return 1;
}

function getSliderSize() {
  return task2Ref.offsetWidth - 50;
}

function addAdditionalElements() {
  for (let i = 0; i < additionElements; i += 1) {
    slideListRef.appendChild(slidesReF[i].cloneNode(true));
  }
  for (let i = 0; i < additionElements; i += 1) {
    slideListRef.insertBefore(
      slidesReF[slidesLength + i - additionElements].cloneNode(true),
      slidesReF[0],
    );
  }
}

function checkIndex() {
  slideListRef.classList.remove('shifting');

  if (activeSlide === -1) {
    slideListRef.style.left =
      -((slidesLength - 1 + additionElements) * (getSliderSize() / getNumberSlider())) + 'px';
    activeSlide = slidesLength - 1;
  }

  if (activeSlide === slidesLength) {
    slideListRef.style.left = -((additionElements * getSliderSize()) / getNumberSlider()) + 'px';
    activeSlide = 0;
  }

  allowShift = true;
  checkedIndex = activeSlide;
}
