import {sendData} from './api.js';
import {resetMap} from './map.js';
import {isEscEvent} from './util.js';

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

// Тип => цена

const loadRoomsValidation = function () {
  document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < guests.children.length; i++) {
      guests.children[i].setAttribute('disabled', 'disabled');
    }
    guests.children[guests.children.length - 2].removeAttribute('disabled');
    guests.children[guests.children.length - 2].setAttribute('selected', 'selected');

  });
};

loadRoomsValidation();


const checkSeats = () => {

  rooms.addEventListener('change', () => {
    if (rooms.value === '1') {
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

// Валидируем цену ПРИ ПЕРВОЙ ЗАГРУЗКЕ СТРАНИЦЫ ЧТО  ДЕЛАТЬ С ЦЕНОЙ И ЧТО ДЕЛАТЬ ЕСЛИ ОТПРАВЛЯЕТСЯ ФОРМА С НЕВЕРНОЙ ЦЕНОЙ

price.addEventListener('input', function () {
  const valueLength = price.value.length;

  if (valueLength > MAX_PRICE) {
    price.setCustomValidity('Цена не должна быть больше ' + MAX_PRICE)
  } else {
    title.setCustomValidity('');
  }

  price.reportValidity();
});

// время В => время ИЗ

const validateTime = () => {
  timeIn.addEventListener('change', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('change', () => timeIn.value = timeOut.value);
};

validateTime();

address.readOnly = true;


// Успешное создание формы

const onSuccessPopupEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const closeSuccessPopup = function () {
  const successPopup = document.querySelector('.success');

  document.addEventListener('keydown', onSuccessPopupEsc);
  document.removeEventListener('click', successPopup);
  successPopup.remove();
};
// переименовать на попонятнее это и ошибку

const finishSuccessPostPopup = function () {
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  document.addEventListener('keydown', onSuccessPopupEsc);
  document.addEventListener('click', closeSuccessPopup);
  document.querySelector('main').appendChild(successMessage);
  adForm.reset();
  resetMap();

};

// Ошибка создания формы

const onErrorEscPopup = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const closeErrorPopupButton = (evt) => {
  evt.preventDefault();
  closeErrorPopup();
};

const closeErrorPopup = function () {
  const errorPopup = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');

  errorButton.removeEventListener('click', closeErrorPopupButton);
  document.removeEventListener('keydown', onErrorEscPopup);
  document.removeEventListener('click', errorPopup);
  errorPopup.remove();
};

const tellsErrorPostPopup = function () {
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  document.addEventListener('keydown',onErrorEscPopup);
  document.addEventListener('click', closeErrorPopup);
  document.querySelector('main').appendChild(errorMessage);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      finishSuccessPostPopup,
      tellsErrorPostPopup,
      new FormData(evt.target),
    );
  });
};

export {formDisable, formEnable, checkSeats, setFormSubmit, loadRoomsValidation, tellsErrorPostPopup};
