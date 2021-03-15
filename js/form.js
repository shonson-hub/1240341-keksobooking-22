import { sendData } from './api.js';
import {showError} from './show-error-block.js';
import {resetMap} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;


const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');
const address = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const formDisable = function () {
  adForm.classList.add('ad-form--disabled');

  for (let fieldset of adForm) {
    fieldset.disabled = true;
  }
};

const formEnable = function () {
  adForm.classList.remove('ad-form--disabled');

  for (let fieldset of adForm) {
    fieldset.disabled = false;
  }
};

formDisable();

const validateSeats = ['1', '2', '3', '0'];


const checkSeats = () => {
  rooms.addEventListener('change', () => {
    if (rooms.value === '1') {
      guests.value = validateSeats[0];
      for (let i = 0; i < guests.children.length; i++) {
        guests.children[i].setAttribute('disabled', 'disabled');
      }
      guests.children[guests.children.length - 2].removeAttribute('disabled');
      guests.children[guests.children.length - 2].setAttribute('selected', 'selected');
    } else if (rooms.value === '100') {
      for (let i = 0; i < guests.children.length; i++) {
        guests.children[i].setAttribute('disabled', 'disabled');
      }
      guests.children[guests.children.length - 1].removeAttribute('disabled');
      guests.children[guests.children.length - 1].setAttribute('selected', 'selected');
    } else if (rooms.value === '2') {
      for (let i = 1; i <= rooms.value; i++) {
        guests.children[i].removeAttribute('disabled');
      }
      guests.children[0].setAttribute('disabled', 'disabled');
      guests.children[guests.children.length - 1].setAttribute('disabled', 'disabled');
    } else {
      for (let i = 0; i < rooms.value; i++) {
        guests.children[i].removeAttribute('disabled');
      }
      guests.children[guests.children.length - 1].setAttribute('disabled', 'disabled');
    }
  });

  return rooms;
};

checkSeats();

type.addEventListener('change', function () {
  if (this.value === 'bungalow') {
    price.placeholder = '0';
    price.min = 0;
  }
  else if (this.value === 'flat') {
    price.placeholder = '1000';
    price.min = 1000;
  }
  else if (this.value === 'house') {
    price.placeholder = '5000';
    price.min = 5000;
  }
  else if (this.value === 'palace') {
    price.placeholder = '10000';
    price.min = 10000;
  }
});


// Дисаблим форму импортом из утиля


// Валидируем заголовок

title.addEventListener('input', () => {
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

// Валидируем цену

price.addEventListener('input', function () {
  const valueLength = price.value.length;

  if (valueLength > MAX_PRICE) {
    price.setCustomValidity('Цена не должна быть больше ' + MAX_PRICE)
  } else {
    title.setCustomValidity('');
  }

  price.reportValidity();
});

// Тип => цена


// время В => время ИЗ

const validateTime = () => {
  timeIn.addEventListener('change', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('change', () => timeIn.value = timeOut.value);
};

validateTime();

address.readOnly = true;


const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showError(),
      new FormData(evt.target),
    )
  });
};

setFormSubmit();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});

// const successPopup

export {formDisable, formEnable, checkSeats, setFormSubmit};
