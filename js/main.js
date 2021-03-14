import './data.js';
import './map-filter.js';
import './map.js';
import './form.js';
import './another-card.js';
import './api.js';
import {createCard} from './another-card.js';
import {formDisable, setFormSubmit} from './form.js';
import {getData} from './api.js';


getData((cards) => {
  createCard(cards);
});

setFormSubmit(formDisable);


// fetch('https://22.javascript.pages.academy/keksobooking/data')
//   .then((response) => response.json())
//   .then((element) => {
//     console.log(element);
//   });
