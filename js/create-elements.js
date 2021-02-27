import {similarObjects} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createObjects = similarObjects();

createObjects.forEach((offer) => {
  const newElement = cardTemplate.cloneNode(true);
  newElement.querySelector('.popup__title').textContent = offer.title;
  newElement.querySelector('.popup__text--address').textContent = offer.address;
  newElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  newElement.querySelector('.popup__type').
  newElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей'; 
  newElement.querySelector('.popup__text--capacity').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  newElement.querySelector('.popup__features')
  newElement.querySelector('.popup__description').textContent = offer.description;
  newElement.querySelector('.popup__photos')


});
