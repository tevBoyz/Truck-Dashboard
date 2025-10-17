import { ChargingStation } from '../types/stations';

export const mockStations: ChargingStation[] = [
  {
    id: 'station-1',
    name: 'Adama Highway Hub',
    lat: 8.5400,
    lng: 39.2700,
    status: 'available',
    distance: '2.4 km',
    address: 'Adama-Addis Highway, KM 45'
  },
  {
    id: 'station-2',
    name: 'Modjo Junction Charge',
    lat: 8.6500,
    lng: 39.0800,
    status: 'charging',
    distance: '8.1 km',
    address: 'Modjo Industrial Park Exit'
  },
  {
    id: 'station-3',
    name: 'Debre Zeit Power Station',
    lat: 8.7500,
    lng: 38.9800,
    status: 'available',
    distance: '15.2 km',
    address: 'Debre Zeit Main Road'
  },
  {
    id: 'station-4',
    name: 'Akaki Hub',
    lat: 8.8700,
    lng: 38.7800,
    status: 'reserved',
    distance: '28.5 km',
    address: 'Akaki Kaliti, Ring Road'
  },
  {
    id: 'station-5',
    name: 'Bole Charging Center',
    lat: 8.9950,
    lng: 38.7850,
    status: 'faulty',
    distance: '42.3 km',
    address: 'Bole Airport Road'
  },
  {
    id: 'station-6',
    name: 'Lebu Service Hub',
    lat: 9.0300,
    lng: 38.7300,
    status: 'available',
    distance: '48.9 km',
    address: 'Lebu, Western Exit'
  }
];
