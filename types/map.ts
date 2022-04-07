import type { LatLngTuple } from 'leaflet';

export type Restaurant = {
  name: string;
  reference: string;
  experience?: string;
  lonlat: LatLngTuple;
};

export type Restaurants = Restaurant[];
