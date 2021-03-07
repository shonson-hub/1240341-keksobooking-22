import {randomNumber, randomPartNumber, getRandomLength} from './util.js';
// import {avatar, TYPE, TIME, FEATURES, PHOTOS, TITLE, similarObjectsNear} from '.dialog.js';

const avatar = ['01', '02', '03', '04', '05', '06', '07', '08'];
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TITLE = ['Вашему вниманию представляю квартиру!', 'Отличные апартаменты в самом центре!', 'Уютная квартира неподалёку от парка с детской площадкой'];
const similarObjectsNear = 10;

const adObjects = () => {
  const timeCheckInOut = randomNumber(0, TIME.length - 1);

  return {
    author: {
      avatar: 'img/avatars/user' + avatar[randomNumber(0, avatar.length - 1)] + '.png',
    },
    offer: {
      title: TITLE[randomNumber(0, TITLE.length - 1)],
      price: randomNumber(10, 65),
      type: TYPE[randomNumber(0, TYPE.length - 1)],
      room: randomNumber(1, 4),
      guests: randomNumber(1, 6),
      checkin: TIME[timeCheckInOut],
      checkout: TIME[timeCheckInOut],
      features: getRandomLength(FEATURES),
      description: 'Чисто, светло, свежий ремонт, въезжай и живи!',
      photos: getRandomLength(PHOTOS),
    },
    location: {
      X: randomPartNumber(35.65000, 35.70000, 1),
      Y: randomPartNumber(139.70000, 139.80000, 1),
    },
  };
};

const similarObjects = new Array(similarObjectsNear).fill(null).map(() => adObjects());
export{similarObjects};
