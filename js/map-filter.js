const mapFilters = document.querySelector('.map__filters');

const formDisable = function () {
  mapFilters.classList.add('map__filters--disabled');

  for (let fieldset of mapFilters) {
    fieldset.disabled = true;
  }
};

const formEnable = function () {
  mapFilters.classList.remove('map__filters--disabled');

  for (let fieldset of mapFilters) {
    fieldset.disabled = false;
  }
};

formDisable();

export{formDisable, formEnable};
