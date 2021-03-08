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
  return rand.toFixed(5);
};

// Функция случайной длинны

const getRandomLength = function (array) {
  const randLen = Array.from(array);
  randLen.length = randomNumber(1, array.length);
  return randLen;
};

// Функция добавления класса disable

const adDisable = function (parent) {
  parent.classList.add('ad-form--disabled');

  for (let child of parent) {
    child.disabled = true;
  }
};

const adEnable = function (parent) {
  parent.classList.remove('ad-form--disabled');

  for (let child of parent) {
    child.disabled = false;
  }
};

export {randomNumber, randomPartNumber, getRandomLength, adEnable, adDisable};
