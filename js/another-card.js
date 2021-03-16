import {createPhotoElement, generateFeaturesElement} from './card.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');



const hideEmpty = (field, element) => field ? element.textContent = field : element.classList.add('hidden');


const createCard = ({offer,author}) => {


    const newElement = cardTemplate.cloneNode(true);

    hideEmpty(offer.title, newElement.querySelector('.popup__title'));
    hideEmpty(offer.type, newElement.querySelector('.popup__type'));
    hideEmpty(offer.description, newElement.querySelector('.popup__description'));
    const hidePrice = () => {
      const popupPrice = newElement.querySelector('.popup__text--price');
      if (offer.price) {
        popupPrice.textContent = offer.price + ' ₽/ночь';
      } else {
        popupPrice.classList.add('hidden');
      }
    };
    hidePrice();

    const hideRoomsGuests = () => {
      const popupCapacity = newElement.querySelector('.popup__text--capacity');
      if(offer.rooms, offer.guests) {
        popupCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      } else {
        popupCapacity.classList.add('hidden');
      }
    };
    hideRoomsGuests();

    const hideTimeCheck = () => {
      const popupTime = newElement.querySelector('.popup__text--time');
      if (offer.checkin, offer.checkout) {
        popupTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
      } else {
        popupTime.classList.add('hidden');
      }
    };
    hideTimeCheck();

    const hideAvatar = () => author.avatar ? newElement.querySelector('.popup__avatar').src = author.avatar : newElement.querySelector('.popup__avatar').classList.add('hidden');
    hideAvatar();

    generateFeaturesElement(offer.features, newElement);
    createPhotoElement(offer.photos, newElement);


    return newElement;

};

export {createCard};
