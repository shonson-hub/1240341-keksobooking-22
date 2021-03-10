import {createPhotoElement, generateFeaturesElement, hideBlocks} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const anyBlock = cardTemplate.querySelector('*');

const createCard = ({offer,author}) => {
  const newElement = cardTemplate.cloneNode(true);

  newElement.querySelector('.popup__title').textContent = offer.title;
  newElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  newElement.querySelector('.popup__type').textContent = offer.type;
  newElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  newElement.querySelector('.popup__description').textContent = offer.description;
  newElement.querySelector('.popup__avatar').src = author.avatar;
  generateFeaturesElement(offer.features, newElement);
  createPhotoElement(offer.photos, newElement);


  return newElement;
};

hideBlocks(anyBlock);

export {createCard};
