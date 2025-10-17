import { MapPin, Navigation, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { ChargingStation } from '../types/stations';
import { toast } from 'sonner';

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

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const StationList = () => {
  const { stations, bookStation, bookingStatus, startCharging } = useApp();

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
    toast.success('Charging session started!');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {stations.map((station) => (
        <Card key={station.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{station.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{station.address}</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {station.distance} away
                </div>
              </div>
              <Badge className={getStatusColor(station.status)}>
                {getStatusText(station.status)}
              </Badge>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row md:flex-row lg:flex-row">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(station)}
                className="flex-1 py-3"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
              {station.status === 'available' && (
                <Button
                  size="sm"
                  onClick={() => handleBook(station.id)}
                  disabled={bookingStatus === 'pending'}
                  className="flex-1 py-3"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {bookingStatus === 'pending' ? 'Booking...' : 'Book Slot'}
                </Button>
              )}
              {station.status === 'reserved' && bookingStatus === 'confirmed' && (
                <Button
                  size="sm"
                  onClick={() => handleStartCharging(station)}
                  className="flex-1 py-3 bg-success hover:bg-success/90"
                >
                  Start Charging
                </Button>
              )}
              {station.status === 'charging' && (
                <Badge variant="outline" className="flex-1 py-3 justify-center">
                  In Use
                </Badge>
              )}
              {station.status === 'faulty' && (
                <Badge variant="destructive" className="flex-1 py-3 justify-center">
                  Out of Order
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StationList;
