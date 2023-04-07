import { shuffle } from '../../js/helpers';
const nextBtn = document.querySelector('.pets-slider-btn__right');
const prevBtn = document.querySelector('.pets-slider-btn__left');
const ids = shuffle([1, 2, 3, 4, 5, 6, 7, 8]);

let { previous, current, next } = {
  previous: [],
  current: [],
  next: [],
};

// сделать чтобы пред и след слайды никогда не повторялись
// сделать генерацию от кол-ва карточек на экране (считалка через редьюс на ресайзе с замыканием)

const initRandomIds = () => {
  previous = ids.slice(0, 3);
  current = shuffle(ids.filter(id => !previous.includes(id))).slice(0, 3);
  next = shuffle(ids.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next);
};

const handleNextClick = () => {
  previous = current;
  current = next;
  next = shuffle(ids.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next);
};

const handlePrevClick = () => {
  next = current;
  current = previous;
  previous = shuffle(ids.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next);
};

initRandomIds();

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
