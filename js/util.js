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

export {getRandomNumber, getRandomPartNumber, getRandomLength};
