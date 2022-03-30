import * as L from 'leaflet';

const map = L.map('map', {
    center: [39.674, -105.002],
    zoom: 15,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: false,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




