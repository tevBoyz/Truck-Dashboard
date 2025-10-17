import { Settings, User, Bell, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const SettingsPanel = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//   navigate('/Login')
// }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Driver Profile
          </CardTitle>
          <CardDescription>Manage your driver profile and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Driver Name</Label>
            <p className="text-sm text-muted-foreground mt-1">Dawit</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Truck ID</Label>
            <p className="text-sm text-muted-foreground mt-1">A2-451</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Phone Number</Label>
            <p className="text-sm text-muted-foreground mt-1">+251 9XX XXX XXX</p>
          </div>
        </CardContent>
      </Card>

      {/* <Button className='text-lg bg-[#ff0000] text-white w-full h-1xl hover:bg-[#ff0000]/50' onClick={logout}>
        Logout
      </Button> */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Charging Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify when charging completes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Low Battery Warning</Label>
              <p className="text-sm text-muted-foreground">Alert when battery below 20%</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Station Availability</Label>
              <p className="text-sm text-muted-foreground">Notify about nearby stations</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Location</Label>
              <p className="text-sm text-muted-foreground">Share real-time location with fleet</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Lock</Label>
              <p className="text-sm text-muted-foreground">Lock app after 5 minutes</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Build</span>
            <span className="text-sm font-medium">2025.01</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
