import 'leaflet/dist/leaflet.css';

import { useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import type { LatLngTuple } from 'leaflet';

import type { Restaurants } from '@/types/map';
import { iconRestaurant } from '../Icon/map/restaurant';

const DEFAULT_CENTER: LatLngTuple = [25.04, 121.5];
const DEFAULT_ZOOM_LEVEL = 13;

const restaurants: Restaurants = [
  {
    name: '瑪莎拉印度餐廳 板橋店',
    reference:
      'https://www.google.com/maps/place/%E7%91%AA%E8%8E%8E%E6%8B%89%E5%8D%B0%E5%BA%A6%E9%A4%90%E5%BB%B3+%E6%9D%BF%E6%A9%8B%E5%BA%97/@25.0296308,121.457094,14z/data=!4m9!1m2!2m1!1z5Y2w5bqm6aSQ5buz!3m5!1s0x3442a8446c837b9b:0x1bbcf3280870b414!8m2!3d25.0328557!4d121.4751419!15sCgzljbDluqbppJDlu7NaDyIN5Y2w5bqmIOmkkOW7s5IBEWluZGlhbl9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5MWjJKTVdrbG5FQUU',
    lonlat: [25.033006359780046, 121.47539938942906],
  },
  {
    name: '萬得富爸爸肉骨茶王中王',
    reference:
      'https://www.google.com/maps/place/%E8%90%AC%E5%BE%97%E5%AF%8C%E7%88%B8%E7%88%B8%E8%82%89%E9%AA%A8%E8%8C%B6%E7%8E%8B%E4%B8%AD%E7%8E%8B/@25.0296308,121.457094,14z/data=!4m8!1m2!2m1!1z5Y2w5bqm6aSQ5buz!3m4!1s0x3442a83e354fc029:0xf9862d0007e9cb61!8m2!3d25.0246586!4d121.4698697',
    lonlat: [25.025421963404877, 121.47011895391618],
  },
  {
    name: 'M.M Dessert Studio（麥貳甜點工作室）',
    reference: 'https://youtu.be/6JYoKgEu9aU',
    lonlat: [25.0591588, 121.5323323],
  },
];

const MyMapEvent = () => {
  const map = useMap();

  const mapEvent = useMapEvents({
    // click: () => {
    //   map.locate();
    // },
    // locationfound: location => {
    //   console.log('location found:', location);
    //   console.log(location.latlng);
    //   map.flyTo(location.latlng, map.getZoom());
    // },
    zoomend: () => {
      // setZoomLevel(mapEvent.getZoom());
    },
  });
  return null;
};

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={zoomLevel}
      style={{ height: '100%', width: '100%' }}
      maxZoom={18}
      minZoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {restaurants.map((restaurant, index) => (
        <Marker
          position={restaurant.lonlat}
          icon={iconRestaurant}
          // style={{ backgroundColor: 'red' }}
          key={index}
        >
          <Popup>
            <div>
              <a href={restaurant.reference} target='_blank' rel='noreferrer'>
                {restaurant.name}
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      <MyMapEvent />
    </MapContainer>
  );
};

export default Map;
