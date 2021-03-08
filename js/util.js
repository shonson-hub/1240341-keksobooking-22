// функция случайного числа

const randomNumber = function (firstNumber, lastNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1);
  } else {
    return ('Первое слово дороже второго');
  }
  return Math.round(rand);
};

// alert(randomNumber(11, 15))

// Функция случайного числа с точкой

const randomPartNumber = function (firstNumber, lastNumber, partNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = (firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1)) * partNumber;
  } else {
    return('Первое слово дороже второго');
  }
  return rand;
};

// Функция случайной длинны

const getRandomLength = (array) => {
  const randLen = Array.from(array);
  randLen.length = randomNumber(1, array.length);
  return randLen;
};


// для photo и features. нужно удалить все li из  фото, создать функцию которая создаёт
// li элементы c классом popup__photo, внести картинку alt,
//  и в корень selector-photos добавлять li элементы, количество Li элементов равно количеству фотографий

const createPhotoElement = function (Array, element) {
  const photoList = element.querySelector('.popup__photos');
  photoList.innerHTML = '';

  if (Array.length) {
    Array.forEach((item) => {
        const newPhoto = document.createElement('img');
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
  };

  if (Array.length) {
    Array.forEach((item) => {
      const featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--${item}';
      featureList.appendChild(featureItem);

    });
  }

  else {
    featureList.classList.add('hidden')
  }

  return featureList;

};

export {randomNumber, randomPartNumber, getRandomLength, createPhotoElement,generateFeaturesElement};
