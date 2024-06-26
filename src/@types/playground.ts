import { LatLngExpression } from 'leaflet';

export type PlaygroundData = {
  total_count: number | undefined | null;
  playgrounds: Playground[];
};

export type Playground = {
  id: number;
  name: string;
  lattitude: string;
  longitude: string;
  adress: string;
  zip_code: string;
  city: string;
  closure: boolean;
  zoning: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  position: LatLngExpression;
  pictures: Picture[];
  features: Feature[];
  timetables: Timetable[];
  notice: Notice[];
};

export type Picture = {
  id: number;
  playground_id: number;
  notice_id: number;
  url: string;
  is_visible: boolean;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
};

export type Feature = {
  id: number;
  feature: string;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
  categorie_id: number;
};

export type Timetable = {
  id: number;
  day_week: string;
  opening_time: string;
  closing_time: string;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
};

export type Notice = {
  id: number;
  playground_id: number;
  user_id: number;
  comment: string;
  rating: number;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
};
