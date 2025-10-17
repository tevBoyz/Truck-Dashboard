import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChargingStation, TruckTelemetry, ChargingSession, PaymentData } from '../types/stations';
import { mockStations } from '@/data/mockStations';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  setSelectedStation: (station: ChargingStation | null) => void;
  telemetry: TruckTelemetry;
  updateTelemetry: () => void;
  truckLocation: { lat: number; lng: number };
  homeLocation: { lat: number; lng: number; name: string } | null;
  setHomeLocation: (location: { lat: number; lng: number; name: string }) => void;
  chargingSession: ChargingSession | null;
  startCharging: (station: ChargingStation) => void;
  stopCharging: () => PaymentData | null;
  paymentData: PaymentData | null;
  clearPayment: () => void;
  bookingStatus: 'none' | 'pending' | 'confirmed';
  bookStation: (stationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [stations, setStations] = useState<ChargingStation[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'none' | 'pending' | 'confirmed'>('none');
  const [chargingSession, setChargingSession] = useState<ChargingSession | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [telemetry, setTelemetry] = useState<TruckTelemetry>({
    truckId: 'A2-451',
    battery: 62,
    range: 145,
    location: 'Adama–Addis Highway',
    lastSync: 'just now'
  });
  const [truckLocation, setTruckLocation] = useState({ lat: 8.5456, lng: 39.2694 }); // Near Adama
  const [homeLocation, setHomeLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateTelemetry = () => {
    setTelemetry(prev => ({
      ...prev,
      battery: Math.floor(Math.random() * 40) + 40,
      range: Math.floor(Math.random() * 100) + 100,
      lastSync: 'just now'
    }));
  };

  const bookStation = (stationId: string) => {
    setBookingStatus('pending');
    setTimeout(() => {
      setBookingStatus('confirmed');
      setStations(prev => prev.map(s => 
        s.id === stationId ? { ...s, status: 'reserved' as const } : s
      ));
    }, 2000);
  };

  const startCharging = (station: ChargingStation) => {
    setChargingSession({
      truckId: telemetry.truckId,
      stationId: station.id,
      stationName: station.name,
      startTime: new Date(),
      kwhDelivered: 0,
      rate: 6.5,
      idleFee: 30
    });
    setStations(prev => prev.map(s => 
      s.id === station.id ? { ...s, status: 'charging' as const } : s
    ));
  };

  const stopCharging = (): PaymentData | null => {
    if (!chargingSession) return null;

    const energyUsed = parseFloat((Math.random() * 30 + 30).toFixed(1));
    const subtotal = parseFloat((energyUsed * chargingSession.rate).toFixed(2));
    const total = parseFloat((subtotal + chargingSession.idleFee).toFixed(2));

    const payment: PaymentData = {
      truckId: chargingSession.truckId,
      stationName: chargingSession.stationName,
      energyUsed,
      rate: chargingSession.rate,
      subtotal,
      idleFee: chargingSession.idleFee,
      total
    };

    setPaymentData(payment);
    setStations(prev => prev.map(s => 
      s.id === chargingSession.stationId ? { ...s, status: 'available' as const } : s
    ));
    setChargingSession(null);
    setBookingStatus('none');
    
    return payment;
  };

  const clearPayment = () => {
    setPaymentData(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        stations,
        selectedStation,
        setSelectedStation,
        telemetry,
        updateTelemetry,
        truckLocation,
        homeLocation,
        setHomeLocation,
        chargingSession,
        startCharging,
        stopCharging,
        paymentData,
        clearPayment,
        bookingStatus,
        bookStation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
