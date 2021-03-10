import {similarObjects} from './data.js';
import {createCard} from './card.js';


const MAIN_CORDINATES = {
  lat: 35.6895000,
  lng: 139.6917100,
};

const ZOOM = 10;

const map = L.map('map-canvas')
  .on('load', () => {
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
    // address.value = getCoord;
    address.value = getCoord.lat.toFixed(5) + ', ' + getCoord.lng.toFixed(5);
  });
};

getMainMarker();


const ponyPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});

similarObjects.forEach(({location, offer, author}) => {

  const marker = L.marker(
    {
      lat: location.X,
      lng: location.Y,
    },
    {
      icon: ponyPinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard({offer, author}),
      {
        keepInView: true,
      },
    );
});
