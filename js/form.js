import {
  sendData
} from './api.js';
import {
  resetMap,
  renderData
} from './map.js';
import {
  isEscEvent
} from './util.js';
import {
  resetFilter
} from './map-filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const TYPE_PRICE = ['1000', '5000', '10000'];
const MAX_ROOMS = ['1', '2', '3', '100'];
const GUESTS_CHECKS = {
  1: '1',
  2: '2',
  3: '3',
  100: 0,
};

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
const adformTime = adForm.querySelector('.ad-form__element--time');

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

const loadPricePlaceholder = function () {
  if (type.value === 'flat') {
    price.placeholder = TYPE_PRICE[0];
    price.min = TYPE_PRICE[0];
  }
};

loadPricePlaceholder();

const validationRoomsGuests = () => {
  for (let i = 0; i < guests.children.length; i++) {
    guests.children[i].setAttribute('disabled', 'disabled');
    guests.value = GUESTS_CHECKS[rooms.value];
  }
  switch (rooms.value) {
    case MAX_ROOMS[0]:
      guests.children[2].removeAttribute('disabled');
      break;

    case MAX_ROOMS[3]:
      guests.children[3].removeAttribute('disabled');
      break;

    case MAX_ROOMS[1]:
      guests.children[1].removeAttribute('disabled');
      guests.children[2].removeAttribute('disabled');
      break;

    case MAX_ROOMS[2]:
      guests.children[0].removeAttribute('disabled');
      guests.children[1].removeAttribute('disabled');
      guests.children[2].removeAttribute('disabled');
      break;
  }


};

const checkSeats = () => {
  rooms.addEventListener('change', validationRoomsGuests);
};

checkSeats();

const loadRoomsValidation = function () {
  validationRoomsGuests();
};

loadRoomsValidation();

type.addEventListener('change', function () {
  if (this.value === 'bungalow') {
    price.placeholder = 0;
    price.min = 0;
  } else if (this.value === 'flat') {
    price.placeholder = TYPE_PRICE[0];
    price.min = TYPE_PRICE[0];
  } else if (this.value === 'house') {
    price.placeholder = TYPE_PRICE[1];
    price.min = TYPE_PRICE[1];
  } else if (this.value === 'palace') {
    price.placeholder = TYPE_PRICE[2];
    price.min = TYPE_PRICE[2];
  }
});

// Валидируем заголовок

title.addEventListener('input', (evt) => {
  const titleLength = evt.target.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - titleLength) + ' симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Удалите ' + (titleLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

// Валидируем цену

price.addEventListener('input', function (evt) {
  const priceLength = evt.target.value;

  if (priceLength > MAX_PRICE) {
    price.setCustomValidity('Цена не должна превышать ' + MAX_PRICE);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});

// время В => время ИЗ

const setTimeIn = () => {
  timeIn.value = timeOut.value;
};

const setTimeOut = () => {
  timeOut.value = timeIn.value;
};

const validateTime = () => {
  adformTime.addEventListener('change', (evt) => {
    if (evt.target.id === 'timein') {
      setTimeOut();
    }
    if (evt.target.id === 'timeout') {
      setTimeIn();
    }
  })
}

validateTime();

address.readOnly = true;


// Успешное создание формы

const onSuccessPopupEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCloseSuccessPopup();
  }
};

const onCloseSuccessPopup = function () {
  const onSuccessPopup = document.querySelector('.success');

  onSuccessPopup.addEventListener('keydown', onSuccessPopupEsc);
  document.removeEventListener('click', onCloseSuccessPopup);
  onSuccessPopup.remove();
};

// переименовать на попонятнее это и ошибку

const finishSuccessPostPopup = function () {
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  document.addEventListener('keydown', onSuccessPopupEsc);
  document.addEventListener('click', onCloseSuccessPopup);
  document.querySelector('main').appendChild(successMessage);
  adForm.reset();
  resetMap();
  loadRoomsValidation();
  resetFilter();
  renderData();
};

// Ошибка создания формы

const onErrorEscPopup = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCloseErrorPopup();
  }
};

const closeErrorPopupButton = (evt) => {
  evt.preventDefault();
  onCloseErrorPopup();
};

const onCloseErrorPopup = function () {
  const onErrorPopup = document.querySelector('.error');
  const errorButton = onErrorPopup.querySelector('.error__button');

  errorButton.removeEventListener('click', closeErrorPopupButton);
  document.removeEventListener('keydown', onErrorEscPopup);
  document.removeEventListener('click', onCloseErrorPopup);
  onErrorPopup.remove();
};

const showErrorPostPopup = function () {
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  document.addEventListener('keydown', onErrorEscPopup);
  document.addEventListener('click', onCloseErrorPopup);
  document.querySelector('main').appendChild(errorMessage);
  resetMap();
  loadRoomsValidation();
  resetFilter();
  renderData();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
  loadRoomsValidation();
  loadPricePlaceholder();
  resetFilter();
  renderData();
});

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      finishSuccessPostPopup,
      showErrorPostPopup,
      new FormData(evt.target),
    );
  });
};

export {
  formDisable,
  formEnable,
  setFormSubmit,
  checkSeats,
  showErrorPostPopup
};
