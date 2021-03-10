import { addDisable } from './util.js';

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



// const checkRooms = function() {
//   const validate = {
//     1: ['1'],
//     2: ['1', '2'],
//     3: ['1', '2', '3'],
//     0: ['0'],
//   };

//   const roomsValid = new RegExp(validate[rooms][0], '');

//   if (roomsValid.test(guests.value)) {
//     guests.setCustomValidity('');
//   }
//   else {
//     guests.setCustomValidity(validate[rooms][1]);
//   }
// };

// checkRooms();

// const validateRooms = function () {


// };

// validateRooms();



// Дисаблим форму импортом из утиля

// addDisable(adForm);

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


const validateRooms = function () {
  rooms.addEventListener('click', () => guests.value = rooms.value);
  if (rooms.value === '100') {
    guests.value = '0';
  }
  // else {}

  guests.addEventListener('click', () => rooms.value = guests.value);
  if (guests.value === '0') {
    rooms.value = '100';
  }
};





validateRooms();

// время В => время ИЗ

const validateTime = () => {
  timeIn.addEventListener('click', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('click', () => timeIn.value = timeOut.value);
};

validateTime();

address.readOnly = true;
