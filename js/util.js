// функция случайного числа

const getRandomNumber = function (firstNumber, lastNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1);
  } else {
    return ('Первое слово дороже второго');
  }
  return Math.round(rand);
};


// Функция случайного числа с точкой

const getRandomPartNumber = function (firstNumber, lastNumber, partNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = (firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1)) * partNumber;
  } else {
    return('Первое слово дороже второго');
  }
  return rand.toFixed(5);
};

// Функция случайной длинны

const getRandomLength = function (array) {
  const randLen = Array.from(array);
  randLen.length = getRandomNumber(1, array.length);
  return randLen;
};

// Функция добавления класса disable

const addDisable = function (parent) {
  parent.classList.add('ad-form--disabled');

  for (let child of parent) {
    child.disabled = true;
  }
};

const addEnable = function (parent) {
  parent.classList.remove('ad-form--disabled');

  for (let child of parent) {
    child.disabled = false;
  }
};

const createPhotoElement = function (Array, element) {
  const photoList = element.querySelector('.popup__photos');
  photoList.innerHTML = '';

  if (Array.length) {
    Array.forEach((item) => {
      const newPhoto = document.createElement('img');
      newPhoto.setAttribute('height', '40');
      newPhoto.setAttribute('width', '45');
      newPhoto.classList.add('popup-photo');
      newPhoto.src = item;
      newPhoto.alt = 'Фотография жилья';
      photoList.appendChild(newPhoto);
    });
  }

  else{
    photoList.classList.add('hidden');
  }

  return photoList;

};

const generateFeaturesElement = function (Array, element) {

  const featureList = element.querySelector('.popup__features');
  while (featureList.firstChild) {
    featureList.removeChild(featureList.firstChild);
  }

  if (Array.length) {
    Array.forEach((item) => {
      const featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + item;
      featureList.appendChild(featureItem);
    });
  }

  else {
    featureList.classList.add('hidden')
  }

  return featureList;
};

const hideBlocks = function (element) {
  if (element === null) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
  }
};


export {getRandomNumber, getRandomPartNumber, getRandomLength, addEnable, addDisable, createPhotoElement, generateFeaturesElement, hideBlocks};
