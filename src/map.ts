import * as L from 'leaflet';
import { Geocoder } from 'leaflet-control-geocoder';
import { Secrets } from './secrets';
// import leaflet images



const nmapAPIKey = Secrets.nearmapAPIKey;

const map = L.map('map', {
    center: [39.674, -105.002],
    zoom: 15,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: false,
});

const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const nearMap = L.tileLayer('https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.img?apikey={accessToken}&tertiary=satellite', {
    attribution: '&copy; <a href="https://www.nearmap.com/">Nearmap</a> contributors',
    maxZoom: 25,
    tileSize: 256,
    accessToken: nmapAPIKey
});

L.control.layers({
    'OpenStreetMap': openStreetMap,
    'NearMap': nearMap
}, {}, {
    collapsed: false,
    position: 'topright'
}).addTo(map);

const GeocoderControl = new Geocoder({
    position: 'topleft',
    defaultMarkGeocode: false,
    showResultIcons: false,
    placeholder: 'Search for places',
})
GeocoderControl.addTo(map);
GeocoderControl.on('markgeocode', function (e) {
    // console.log(e); // ? uncomment this if you want to inspect the event object
    map.fitBounds(e.geocode.bbox);
    // ? Creates a New Icon to use for the marker
    const newIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    const popupInfo = `
        <h4>${e.geocode.properties.address.house_number} ${e.geocode.properties.address.road}</h4>
        <h4>${e.geocode.properties.address.city}, ${e.geocode.properties.address.state} ${e.geocode.properties.address.postcode}</h4>
        <p>${e.geocode.properties.lat}, ${e.geocode.properties.lon}</p>
        `;
    // adds icon with information popup then open it
    L.marker(e.geocode.center, { icon: newIcon }).bindPopup(popupInfo).addTo(map).openPopup();
});

L.control.zoom({
    position: 'topleft'
}).addTo(map);










