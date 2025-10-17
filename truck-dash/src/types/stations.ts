export type StationStatus = 'available' | 'reserved' | 'charging' | 'faulty';

export interface ChargingStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: StationStatus;
  distance: string;
  address: string;
}

export interface TruckTelemetry {
  truckId: string;
  battery: number;
  range: number;
  location: string;
  lastSync: string;
}

export interface ChargingSession {
  truckId: string;
  stationId: string;
  stationName: string;
  startTime: Date;
  kwhDelivered: number;
  rate: number;
  idleFee: number;
}

export interface PaymentData {
  truckId: string;
  stationName: string;
  energyUsed: number;
  rate: number;
  subtotal: number;
  idleFee: number;
  total: number;
}
