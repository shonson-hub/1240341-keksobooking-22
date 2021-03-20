const mapFilters = document.querySelector('.map__filters');

const filterDisable = function () {
  mapFilters.classList.add('map__filters--disabled');

  for (let fieldset of mapFilters) {
    fieldset.disabled = true;
  }
};

const filterEnable = function () {
  mapFilters.classList.remove('map__filters--disabled');

  for (let fieldset of mapFilters) {
    fieldset.disabled = false;
  }
};
filterDisable();


const setTypeClick = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });

};

const houseType = function (card) {
  const housingType = document.querySelector('#housing-type');
  if (housingType.value === 'any' || card.offer.type === housingType.value) {
    return true;
  }
};

const houseGuests = function (card) {
  const housingGuests = document.querySelector('#housing-guests');
  if (housingGuests.value === 'any' || Number(card.offer.guests) === Number(housingGuests.value)) {
    return true;
  }
};

const houseRoom = function (card) {
  const housingRooms = document.querySelector('#housing-rooms');
  if (housingRooms.value === 'any' || Number(card.offer.rooms) === Number(housingRooms.value)) {
    return true;
  }
};

const housePrice = function (card) {
  const housingPrice = document.querySelector('#housing-price');
  if (housingPrice.value === 'any')
  {
    return true;
  }
  if (housingPrice.value === 'middle' && 10000 < card.offer.price && 50000 >= card.offer.price) {
    return true;
  }
  if (housingPrice.value === 'low' && 10000 >= card.offer.price) {
    return true;
  }
  if (housingPrice.value === 'high' && 50000 <= card.offer.price) {
    return true;
  }
  return false;
};

const filterFeatures = function (card) {
  const featuresItem = Array.from(document.querySelectorAll('.map__checkbox:checked'));
  const featureList = (featuresItem.map((feature) => feature.value));
  let counter = 0;
  if (featureList.length) {
    card.offer.features.forEach((feature) => {
      if (featureList.includes(feature)) {
        counter++;
      }
    })
  }
  return featureList.length === counter;
};

export{filterDisable, filterEnable, setTypeClick, houseType, housePrice, houseRoom, houseGuests, filterFeatures};
