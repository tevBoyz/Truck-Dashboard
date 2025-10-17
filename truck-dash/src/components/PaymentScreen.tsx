import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, CreditCard, RotateCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface PaymentScreenProps {
  onComplete: () => void;
}

const PaymentScreen = ({ onComplete }: PaymentScreenProps) => {
  const { paymentData } = useApp();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'sent' | 'completed'>('pending');

  if (!paymentData) return null;

  const handleSendNotification = () => {
    setPaymentStatus('sent');
    toast.success('Payment notification sent to Telebirr!');
  };

  const handleSimulatePayment = () => {
    setPaymentStatus('completed');
    toast.success('Payment Successful — Charging Complete ✅');
    setTimeout(onComplete, 3000);
  };

  const handleRetry = () => {
    setPaymentStatus('pending');
    toast.info('Ready to retry payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2">
          <CardHeader className="text-center">
            {paymentStatus === 'completed' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-success" />
              </motion.div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-accent" />
              </div>
            )}
            <CardTitle className="text-2xl">
              {paymentStatus === 'completed' ? 'Payment Complete' : 'Charging Complete'}
            </CardTitle>
            <p className="text-muted-foreground">
              {paymentStatus === 'completed' 
                ? 'Thank you for your payment!' 
                : 'Payment required for charging session'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Truck ID</span>
                <span className="font-semibold">{paymentData.truckId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Station</span>
                <span className="font-semibold">{paymentData.stationName}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Energy Used</span>
                <span className="font-semibold">{paymentData.energyUsed} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-semibold">{paymentData.rate} ETB/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{paymentData.subtotal.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Idle Fee</span>
                <span className="font-semibold">{paymentData.idleFee.toFixed(2)} ETB</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold text-accent">{paymentData.total.toFixed(2)} ETB</span>
              </div>
            </div>

            {paymentStatus === 'completed' ? (
              <div className="text-center py-4">
                <p className="text-success font-semibold mb-2">Payment Successful!</p>
                <p className="text-sm text-muted-foreground">Redirecting to home...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="font-semibold mb-1">Payment via Telebirr</p>
                  <p className="text-sm text-muted-foreground">
                    Send a payment notification to the driver's Telebirr account
                  </p>
                </div>

                <div className="space-y-2">
                  {paymentStatus === 'pending' && (
                    <Button
                      onClick={handleSendNotification}
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Payment Notification
                    </Button>
                  )}
                  
                  {paymentStatus === 'sent' && (
                    <Button
                      onClick={handleSimulatePayment}
                      size="lg"
                      className="w-full bg-success hover:bg-success/90"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Simulate Payment Received
                    </Button>
                  )}

                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <RotateCw className="w-5 h-5 mr-2" />
                    Retry Payment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentScreen;
