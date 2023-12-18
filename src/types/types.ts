export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adress: Adress;
  geo: Geo;
}

type Adress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

type Geo = {
  lat: string;
  lng: string;
};

export interface Filters {
  title: string;
  status: string;
  sortBy: string;
  sortOrder: string;
  currentPage: number;
}
