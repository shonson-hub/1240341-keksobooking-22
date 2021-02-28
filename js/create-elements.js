import {similarObjects} from './data.js';
import {TYPES} from './data.js';
import {createPhotoElement, generateFeaturesElement} from './util.js'

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const createObjects = similarObjects();

const similarObjectsList = document.createDocumentFragment();


createObjects.forEach((objects) => {
  const newElement = cardTemplate.cloneNode(true);

  newElement.querySelector('.popup__title').textContent = objects.offer.title;
  newElement.querySelector('.popup__text--address').textContent = objects.offer.address;
  newElement.querySelector('.popup__text--price').textContent = objects.offer.price + ' ₽/ночь';
  newElement.querySelector('.popup__type').textContent = TYPES[objects.offer.types];
  newElement.querySelector('.popup__text--capacity').textContent = objects.offer.rooms + ' комнаты для ' + objects.offer.guests + ' гостей';
  newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + objects.offer.checkin + ', выезд до ' + objects.offer.checkout;
  generateFeaturesElement(objects.offer.features, newElement);
  newElement.querySelector('.popup__description').textContent = objects.offer.description;
  newElement.querySelector('.popup__avatar').src = objects.author.avatar;
  createPhotoElement(objects.offer.photos, newElement);

  similarObjectsList.appendChild(newElement);

  return newElement;
});

console.log(createObjects);

mapCanvas.appendChild(similarObjectsList);
