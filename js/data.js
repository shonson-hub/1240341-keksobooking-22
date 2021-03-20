import {getRandomNumber, getRandomPartNumber, getRandomLength} from './util.js';

const Avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TITLES = ['Вашему вниманию представляю квартиру!', 'Отличные апартаменты почти в самом центре!', 'Уютная квартира неподалёку от парка с детской площадкой'];
const SIMILAR_OBJECTS_NEAR = 10;
const TYPES = {flat: 'Квартира', house: 'Дом', bungalow: 'Бунгало', palace: 'Дворец'};
const DESCRIPTION = ['Чисто, светло, свежий ремонт, въезжай и живи!', 'Роскошней дворца в Геленжике', 'Просторно светло, можно с домашним животным'];

const getRandomItem = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)]
}

const addObjects = () => {
  const timeCheckInOut = getRandomNumber(0, TIME.length - 1);

  return {
    author: {
      avatar: './img/avatars/user' + Avatars[getRandomNumber(0, Avatars.length - 1)] + '.png',
    },
    offer: {
      title: getRandomItem(TITLES),
      price: getRandomNumber(10000, 65000),
      type: getRandomItem(TYPES),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 6),
      checkin: TIME[timeCheckInOut],
      checkout: TIME[timeCheckInOut],
      features: getRandomLength(FEATURES),
      description: getRandomItem(DESCRIPTION),
      photos: getRandomLength(PHOTOS),
    },
    location: {
      X: getRandomPartNumber(35.65000, 35.70000, 1),
      Y: getRandomPartNumber(139.70000, 139.80000, 1),
    },
  };
};

const similarObjects = new Array(SIMILAR_OBJECTS_NEAR).fill(null).map(() => addObjects());

export{similarObjects};
