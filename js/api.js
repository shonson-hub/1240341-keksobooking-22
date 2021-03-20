import {showError} from './show-error-block.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => {
            onSuccess(json);
          })
      } else {
        showError('Ошибочка, мистер!пробуй дальше!!!');
      }
    })
    .catch(() => {
      showError('Ошибочка, мистер!пробуй дальше!!!');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
