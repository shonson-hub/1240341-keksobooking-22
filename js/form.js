// import {adDisable, adEnable} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const lodgingData = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeOut');

title.addEventListener('input', function () {
  const valueLength = title.value.lengt;

  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Удалите ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

price.addEventListener('input', function () {
  const valueLength = price.value.length;

  if (valueLength > MAX_PRICE) {
    price.setCustomValidity('Цена не должна быть больше ' + MAX_PRICE)
  } else {
    title.setCustomValidity('');
  }

  price.reportValidity();
});

// type.addEventListener('change', (evt) => {
//   event.target.value === type.value;
//   type.placeholder

// });

const validateTime = () => {
  timeIn.addEventListener('click', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('click', () => timeIn.value = timeOut.value);
}

validateTime();