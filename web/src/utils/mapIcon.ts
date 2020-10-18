import Leaflet from "leaflet";

import mapMarkerImg from "../images/map-marker.svg";
const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 56],
  iconAnchor: [25, 56],
  popupAnchor: [170, 2],

});

export default mapIcon;
