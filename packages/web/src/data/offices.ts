export interface OfficeLocation {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "maribor",
    name: "Poslovna enota Maribor",
    addressLine: "Novakova ulica 8",
    city: "Maribor",
    country: "Slovenija",
    lat: 46.5596,
    lng: 15.6459,
  },
  {
    id: "ljubljana-vic",
    name: "Poslovna enota Ljubljana - Vič",
    addressLine: "Cesta v Mestni log 86",
    city: "Ljubljana",
    country: "Slovenija",
    lat: 46.0406,
    lng: 14.4871,
  },
  {
    id: "ljubljana-bezigrad",
    name: "Poslovna enota Ljubljana - Bežigrad",
    addressLine: "Slovenčeva ulica 97",
    city: "Ljubljana",
    country: "Slovenija",
    lat: 46.0839,
    lng: 14.511,
  },
  {
    id: "celje",
    name: "Poslovna enota Celje",
    addressLine: "Podjavorškova ulica 2",
    city: "Celje",
    country: "Slovenija",
    lat: 46.2397,
    lng: 15.2677,
  },
  {
    id: "novo-mesto",
    name: "Poslovna enota Novo mesto",
    addressLine: "Medičeva ulica 15",
    city: "Novo mesto",
    country: "Slovenija",
    lat: 45.8016,
    lng: 15.1618,
  },
  {
    id: "murska-sobota",
    name: "Poslovna enota Murska Sobota",
    addressLine: "Obrtna ulica 42",
    city: "Murska Sobota",
    country: "Slovenija",
    lat: 46.6645,
    lng: 16.1716,
  },
  {
    id: "koper",
    name: "Poslovna enota Koper",
    addressLine: "Sermin 71i",
    city: "Koper",
    country: "Slovenija",
    lat: 45.5519,
    lng: 13.7306,
  },
  {
    id: "slovenska-bistrica",
    name: "Poslovna enota Slovenska Bistrica",
    addressLine: "Stepišnikova ulica 12a",
    city: "Slovenska Bistrica",
    country: "Slovenija",
    lat: 46.3928,
    lng: 15.5735,
  },
  {
    id: "ptuj",
    name: "Poslovna enota Ptuj",
    addressLine: "Ob Dravi 3a",
    city: "Ptuj",
    country: "Slovenija",
    lat: 46.4201,
    lng: 15.8702,
  },
];
