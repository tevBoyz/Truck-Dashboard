import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider, useApp } from './contexts/AppContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import Charging from './pages/Charging';
import Payment from './pages/Payment';
import {toast} from 'sonner'

const queryClient = new QueryClient();

type AppScreen = 'splash' | 'login' | 'home' | 'charging' | 'payment';

const AppContent = () => {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const { chargingSession, paymentData, clearPayment } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chargingSession && screen === 'home') {
      setScreen('charging');
    }
  }, [chargingSession]);

  useEffect(() => {
    if (paymentData && screen === 'charging') {
      setScreen('payment');
    }
  }, [paymentData]);

  const handleLogin = () => {
    setScreen('home');
  };

  const handlePaymentComplete = () => {
    clearPayment();
    setScreen('home');
  };

  const handleLogout = () => {
    toast.success("Logout Successful")
    setScreen('login');
  };

  return (
    <AnimatePresence mode="wait">
      {screen === 'splash' && <Splash key="splash" />}
      {screen === 'login' && <Login key="login" onLogin={handleLogin} />}
      {screen === 'home' && <Home key="home" onLogout={handleLogout} />}
      {screen === 'charging' && <Charging key="charging" />}
      {screen === 'payment' && <Payment key="payment" onComplete={handlePaymentComplete} />}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
