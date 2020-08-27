'use strict';
import galleryItems from './gallery-items.js';

const dotsBoxRef = document.querySelector('.js-dotsBox');

const slideListRef = document.querySelector('.js-slides-list');
const btnPrevRef = document.querySelector('#btn-prev');
const btnNextRef = document.querySelector('#btn-next');
const slides = slideListRef.querySelectorAll('.slide');

const slidesLength = slides.length;
const firstSlide = slides[0];
const lastSlide = slides[slidesLength - 1];
const cloneFirst = firstSlide.cloneNode(true);
const cloneLast = lastSlide.cloneNode(true);
const slideSize = firstSlide.offsetWidth;

let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;
let threshold = 100;
let allowShift = true;
let index = 0;

slideListRef.appendChild(cloneFirst);
slideListRef.insertBefore(cloneLast, firstSlide);

slideListRef.onmousedown = dragStart;

slideListRef.addEventListener('touchstart', dragStart);
slideListRef.addEventListener('touchend', dragEnd);
slideListRef.addEventListener('touchmove', dragAction);

btnPrevRef.addEventListener('click', btnPrevHandler);
btnNextRef.addEventListener('click', btnNextHandler);
// dotsBoxRef.addEventListener('click', dotsBoxHandler);

function btnPrevHandler() {
  shiftSlide(-1);
}

function btnNextHandler() {
  shiftSlide(1);
}

// function dotsBoxHandler() {}

slideListRef.addEventListener('transitionend', checkIndex);

function shiftSlide(dir, action) {
  slideListRef.classList.add('shifting');

  if (allowShift) {
    if (!action) {
      posInitial = slideListRef.offsetLeft;
    }

    if (dir == 1) {
      slideListRef.style.left = posInitial - slideSize + 'px';
      index++;
    } else if (dir == -1) {
      slideListRef.style.left = posInitial + slideSize + 'px';
      index--;
    }
  }

  allowShift = false;
}

function checkIndex() {
  slideListRef.classList.remove('shifting');

  if (index == -1) {
    slideListRef.style.left = -(slidesLength * slideSize) + 'px';
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slideListRef.style.left = -(1 * slideSize) + 'px';
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
