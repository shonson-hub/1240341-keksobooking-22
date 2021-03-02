import {createObjects} from './create-elements.js';
import {similarObjects} from './data.js';

const numberAdvert = 1;
const currentNumberAdvert = similarObjects[numberAdvert];
createObjects(currentNumberAdvert);

const advertForm = document.querySelector('.ad-form');
const modeSelectType = advertForm.querySelector('#type');
const modeInputPriceNight = advertForm.querySelector('#price');

const getPriceNight = function (types) {
  switch (types) {
    case 'flat':
      return 1000;
    case 'house':
      return 4000;
    case 'bungalow':
      return 6000;
    case 'palace':
      return 8000;
    default:
      return 0;
  }
}

const setPriceNight = function (selectedType) {
  modeInputPriceNight.setAttribute('placeholder', getPriceNight(selectedType));
  modeInputPriceNight.setAttribute('min', getPriceNight(selectedType));
};

let selectedType = modeSelectType.options[modeSelectType.selectedIndex].value;
setPriceNight(selectedType);

modeSelectType.addEventListener('change', function () {
  selectedType = modeSelectType.options[modeSelectType.selectedIndex].value;
  setPriceNight (selectedType);
});

const modeTimeIn = advertForm.querySelector('#timein');
const modeTimeOut = advertForm.querySelector('#timeout');

modeTimeIn.addEventListener('change', function () {
  modeTimeOut.value = modeTimeIn.value;
});

modeTimeOut.addEventListener('change', function () {
  modeTimeIn.value = modeTimeOut.value;
});
