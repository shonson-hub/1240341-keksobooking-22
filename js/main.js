// let randomNumber = function (firstNumber, lastNumber) {
//   let rand = firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1);

//   if (firstNumber >= lastNumber) {
//     console.log('Первое слово дороже второго');
//   }
//   return Math.round(rand);
// }

// console.log(randomNumber(115, 15));

let randomNumber = function (firstNumber, lastNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1);
  } else {
    return ('Первое слово дороже второго');
  }
  return Math.round(rand);
}

alert(randomNumber(115, 15));

let randomPartNumber = function (firstNumber, lastNumber,partNumber) {
  let rand;
  if (firstNumber < lastNumber) {
    rand = (firstNumber - 0.5 + Math.random() * (lastNumber - firstNumber + 1)) * partNumber;
  } else {
    return('Первое слово дороже второго');
  }
  return rand;
}

alert(randomPartNumber(5, 15, 1000));

// Источник https://learn.javascript.ru/task/random-int-min-max
