import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, StopCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';

const ChargingCard = () => {
  const { chargingSession, stopCharging } = useApp();
  const [kwhDelivered, setKwhDelivered] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!chargingSession) return;

    const interval = setInterval(() => {
      setKwhDelivered((prev) => {
        const next = prev + 0.5;
        if (next >= 75) {
          clearInterval(interval);
          return 75;
        }
        return next;
      });
      setProgress((prev) => Math.min(prev + 0.67, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [chargingSession]);

  if (!chargingSession) return null;

  const estimatedCost = (kwhDelivered * chargingSession.rate).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2">
          <CardHeader className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-success/10 mx-auto mb-4"
            >
              <Zap className="w-10 h-10 text-success animate-pulse-glow" />
            </motion.div>
            <CardTitle className="text-2xl">Charging in Progress</CardTitle>
            <p className="text-muted-foreground">{chargingSession.stationName}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Truck ID</span>
                <span className="font-bold text-xl">{chargingSession.truckId}</span>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-xl">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-4 animate-charging" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Energy Delivered</div>
                  <div className="text-2xl font-bold text-success">{kwhDelivered.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">kWh</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Estimated Cost</div>
                  <div className="text-2xl font-bold text-accent">{estimatedCost}</div>
                  <div className="text-xs text-muted-foreground">ETB</div>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Rate: {chargingSession.rate} ETB/kWh
              </div>
            </div>

            <Button
              onClick={stopCharging}
              size="lg"
              variant="destructive"
              className="w-full"
            >
              <StopCircle className="w-5 h-5 mr-2" />
              Stop Charging
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChargingCard;
