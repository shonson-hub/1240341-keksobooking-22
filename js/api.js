import {showError} from './show-error-block.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      onSuccess(json);
    })
    .catch(() => {
      showError('Ошибочка, мистер!пробуй дальше!!!');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking/data',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showError('Возникла ошибка. Поропуйте ещё раз');
      }
    })
    .catch(() => {
      showError('Возникла ошибка. Поропуйте ещё раз');
    });
};

export {getData, sendData};
