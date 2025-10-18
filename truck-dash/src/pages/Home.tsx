import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, List, Truck, Home as HomeIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeToggle from '@/components/ThemeToggle';
import TelemetryCard from '@/components/TelemetryCard';
import TruckLocationCard from '@/components/TruckLocationCard';
import MapView from '../components/Mapview';
import StationList from '@/components/StationList';
import SettingsPanel from '../components/SettingPannel';

interface HomeProps {
  onLogout: () => void;
}

const Home = ({ onLogout }: HomeProps) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <img src='/logo.png' className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">A2 e-Corridor</h1>
                <p className="text-sm text-muted-foreground">Welcome, Driver Dawit 🚚</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TelemetryCard />
              <TruckLocationCard />
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Charging Stations</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'map' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('map')}
                    >
                      <Map className="w-4 h-4 mr-2" />
                      <span className='hidden md:block lg:block'>Map</span>
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4 mr-2" />
                      <span className='hidden md:block lg:block'>List</span>
                    </Button>
                  </div>
                </div>

                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {viewMode === 'map' ? (
                    <div className="h-[500px]">
                      <MapView />
                    </div>
                  ) : (
                    <StationList />
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel onLogout={onLogout} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
