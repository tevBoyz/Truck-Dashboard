import { useState } from 'react';
import { MapPin, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

const TruckLocationCard = () => {
  const { truckLocation, homeLocation, setHomeLocation } = useApp();
  const [isSettingHome, setIsSettingHome] = useState(false);
  const [homeName, setHomeName] = useState('');

  const handleSetHome = () => {
    if (!homeName.trim()) {
      toast( "Location name required", {
        description: "Please enter a name for your home location",
      });
      return;
    }

    setHomeLocation({
      lat: truckLocation.lat,
      lng: truckLocation.lng,
      name: homeName
    });

    toast("Home location saved", {
      description: `${homeName} has been set as your home location`,
    });

    setIsSettingHome(false);
    setHomeName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Truck Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Position</span>
            <span className="text-sm font-medium">
              {truckLocation.lat.toFixed(4)}°, {truckLocation.lng.toFixed(4)}°
            </span>
          </div>
        </div>

        {homeLocation && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <Home className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Home Location</span>
            </div>
            <p className="text-sm text-muted-foreground">{homeLocation.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {homeLocation.lat.toFixed(4)}°, {homeLocation.lng.toFixed(4)}°
            </p>
          </div>
        )}

        {isSettingHome ? (
          <div className="space-y-2">
            <Input
              placeholder="Enter home location name (e.g., Main Depot)"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetHome()}
            />
            <div className="flex gap-2">
              <Button onClick={handleSetHome} size="sm" className="flex-1">
                Save Home
              </Button>
              <Button 
                onClick={() => {
                  setIsSettingHome(false);
                  setHomeName('');
                }} 
                variant="outline" 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setIsSettingHome(true)} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            {homeLocation ? 'Update Home Location' : 'Set as Home Location'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TruckLocationCard;
