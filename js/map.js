// import { createObjects } from './create-elements.js';

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
    lat: MAIN_CORDINATES.lan,
    lng: MAIN_CORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
});

// mainPinMarker.remove();

const ponyPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});

objects.forEach(({lat, lng}) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      ponyPinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      {
        keepInView: true,
      },
    );
});
