import {createCard} from './card.js';
import {formEnable} from './form.js';
import {getData} from './api.js';
import {filterEnable, houseType, houseRoom, housePrice, houseGuests, setTypeClick, filterFeatures} from './map-filter.js';

const MAIN_CORDINATES = {
  lat: 35.6895000,
  lng: 139.6917100,
};

const CARDS_LENGTH = 10;
const RERENDER_DELAY = 500;
const ZOOM = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    formEnable();
    filterEnable();
  })
  .setView(MAIN_CORDINATES, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_CORDINATES.lat,
    lng: MAIN_CORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const address = document.querySelector('#address');

const getMainMarker = function () {
  mainPinMarker.on('moveend', (evt) => {
    const getCoord = evt.target.getLatLng();
    address.value = getCoord.lat.toFixed(5) + ', ' + getCoord.lng.toFixed(5);
  });
};

getMainMarker();

const getMarkCoord = function () {
  address.value = MAIN_CORDINATES.lat.toFixed(5) + ', ' + MAIN_CORDINATES.lng.toFixed(5);
};

getMarkCoord();

const ponyPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});

let delElements = [];

const resetMarkers = function () {
  delElements.forEach((marker) => {
    map.removeLayer(marker);
  })
};

const renderData = function () {
  getData((cards) => {
    renderMarker(cards);
    setTypeClick(_.throttle(() => renderMarker(cards), RERENDER_DELAY));
  });
};

renderData();

const renderMarker = function (cards) {
  resetMarkers();
  delElements = [];
  const elements = [];
  cards
    .some((card) => {
      if (elements.length === CARDS_LENGTH) {
        return true;
      }
      if (houseType(card) && housePrice(card) && houseRoom(card) && houseGuests(card) && filterFeatures(card)) {
        elements.push(card);
        return false;
      }
    });

  elements.forEach((card) => {

    const marker = L.marker(
      {
        lat: card.location.lat,
        lng: card.location.lng,
      },
      {
        icon: ponyPinIcon,
      },
    )

    marker
      .addTo(map)
      .bindPopup(
        createCard(card),
        {
          keepInView: true,
        },
      );
    delElements.push(marker);
  })
};

const resetMap = function () {
  mainPinMarker.setLatLng(MAIN_CORDINATES);
  getMarkCoord();
};

export {resetMap, renderData};
