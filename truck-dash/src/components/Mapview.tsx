import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { ChargingStation } from '../types/stations';
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';

const getMarkerColor = (status: string) => {
  switch (status) {
    case 'available':
      return '#0D9488';
    case 'reserved':
      return '#8B5CF6';
    case 'charging':
      return '#3B82F6';
    case 'faulty':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-success text-success-foreground';
    case 'reserved':
      return 'bg-primary text-primary-foreground';
    case 'charging':
      return 'bg-charging text-charging-foreground';
    case 'faulty':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const MapView = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const { stations, selectedStation, setSelectedStation, bookStation, bookingStatus, startCharging, truckLocation } = useApp();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on truck location
    const map = L.map(mapContainerRef.current).setView([truckLocation.lat, truckLocation.lng], 10);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add truck marker with custom icon
    const truckIcon = L.divIcon({
      className: 'truck-marker',
      html: `<div style="
        background: hsl(var(--primary));
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">🚚</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const truckMarker = L.marker([truckLocation.lat, truckLocation.lng], { icon: truckIcon })
      .addTo(map)
      .bindPopup('<b>Your Truck (A2-451)</b><br>Current Location');
    
    truckMarkerRef.current = truckMarker;

    // Add station markers
    stations.forEach((station) => {
      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 10,
        fillColor: getMarkerColor(station.status),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.on('click', () => {
        setSelectedStation(station);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      truckMarkerRef.current = null;
    };
  }, [truckLocation]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Update markers when stations change
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.remove();
      }
    });

    stations.forEach((station) => {
      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 10,
        fillColor: getMarkerColor(station.status),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapRef.current!);

      marker.on('click', () => {
        setSelectedStation(station);
      });
    });
  }, [stations]);

  const handleNavigate = (station: ChargingStation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
    window.open(url, '_blank');
  };

  const handleBook = (stationId: string) => {
    bookStation(stationId);
    toast.success('Booking request sent!');
  };

  const handleStartCharging = (station: ChargingStation) => {
    startCharging(station);
    setSelectedStation(null);
    toast.success('Charging session started!');
  };

  return (
    <div className="relative h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden" />
      
      {selectedStation && (
        <Card className="absolute bottom-4 left-4 right-4 shadow-lg z-[1000]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{selectedStation.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedStation.address}</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {selectedStation.distance} away
                </div>
              </div>
              <Badge className={getStatusColor(selectedStation.status)}>
                {selectedStation.status.charAt(0).toUpperCase() + selectedStation.status.slice(1)}
              </Badge>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row md:flex-row lg:flex-row">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(selectedStation)}
                className="flex-1 py-3"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
              {selectedStation.status === 'available' && (
                <Button
                  size="sm"
                  onClick={() => handleBook(selectedStation.id)}
                  disabled={bookingStatus === 'pending'}
                  className="flex-1 py-3"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {bookingStatus === 'pending' ? 'Booking...' : 'Book Slot'}
                </Button>
              )}
              {selectedStation.status === 'reserved' && bookingStatus === 'confirmed' && (
                <Button
                  size="sm"
                  onClick={() => handleStartCharging(selectedStation)}
                  className="flex-1 py-3 bg-success hover:bg-success/90"
                >
                  Start Charging
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStation(null)}
              className="w-full mt-2"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapView;
