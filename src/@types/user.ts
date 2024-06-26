export type Fav = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
};

export type Not = {
  id: number;
  playground_id: number;
  user_id: number;
  comment: string;
  rating: number;
  createdat: string;
  updatedat: string;
  deletedat: string | null;
};

export type User = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  fav: Fav[];
  not: Not[];
};
