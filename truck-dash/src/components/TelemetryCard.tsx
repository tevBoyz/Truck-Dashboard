import { Battery, Navigation, RefreshCw, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '../components/ui/progress';
import { useApp } from '@/contexts/AppContext';

const TelemetryCard = () => {
  const { telemetry, updateTelemetry } = useApp();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-primary" />
          Truck Telemetry
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={updateTelemetry}
          className="rounded-xl"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-success" />
              <span className="font-medium">Battery</span>
            </div>
            <span className="text-2xl font-bold text-success">{telemetry.battery}%</span>
          </div>
          <Progress value={telemetry.battery} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Estimated Range</div>
            <div className="text-xl font-bold">{telemetry.range} km</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Truck ID</div>
            <div className="text-xl font-bold">{telemetry.truckId}</div>
          </div>
        </div>

        <div className="pt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Navigation className="w-4 h-4" />
            Current Location
          </div>
          <div className="font-medium">{telemetry.location}</div>
          <div className="text-xs text-muted-foreground">Last sync: {telemetry.lastSync}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelemetryCard;
