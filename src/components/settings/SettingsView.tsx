import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Palette, Shield, Globe, Camera } from 'lucide-react';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            className={`text-xs gap-1.5 shrink-0 ${activeTab === tab.id ? 'gradient-accent text-primary-foreground' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-3.5 h-3.5" /> {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-2 ring-border">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Camera className="w-3 h-3 text-primary-foreground" />
                </button>
              </div>
              <div>
                <p className="font-medium text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="John" className="bg-secondary border-0" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Doe" className="bg-secondary border-0" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="john@example.com" className="bg-secondary border-0" />
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger className="bg-secondary border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-5">UTC-5 (Eastern)</SelectItem>
                    <SelectItem value="utc-8">UTC-8 (Pacific)</SelectItem>
                    <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="utc+1">UTC+1 (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="gradient-accent text-primary-foreground shadow-glow">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {['Email notifications', 'Push notifications', 'Task reminders', 'Weekly summary', 'Team mentions', 'Goal milestones'].map(item => (
              <div key={item} className="flex items-center justify-between py-2">
                <Label className="text-sm">{item}</Label>
                <Switch defaultChecked={item !== 'Weekly summary'} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-xs text-muted-foreground">Reduce spacing for more content</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Animations</Label>
                <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex gap-2">
                {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'].map(c => (
                  <button key={c} className={`w-8 h-8 rounded-full ${c} ${c === 'bg-red-500' ? 'ring-2 ring-offset-2 ring-primary ring-offset-background' : ''}`} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" className="bg-secondary border-0" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" className="bg-secondary border-0" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Add extra security to your account</p>
              </div>
              <Switch />
            </div>
            <Button className="gradient-accent text-primary-foreground shadow-glow">Update Password</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'language' && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Language & Region</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-secondary border-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select defaultValue="mdy">
                <SelectTrigger className="bg-secondary border-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>First Day of Week</Label>
              <Select defaultValue="mon">
                <SelectTrigger className="bg-secondary border-0"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mon">Monday</SelectItem>
                  <SelectItem value="sun">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
