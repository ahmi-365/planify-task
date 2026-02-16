import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCheck, MessageSquare, Target, Clock, Users, AlertTriangle, Zap } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'task' | 'goal' | 'team' | 'system' | 'reminder';
  read: boolean;
  icon: React.ElementType;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Task Completed', description: 'Design System Updates has been marked as done', time: '5 min ago', type: 'task', read: false, icon: Zap },
  { id: '2', title: 'Goal Progress', description: 'You\'re 80% towards your weekly productivity goal', time: '1 hour ago', type: 'goal', read: false, icon: Target },
  { id: '3', title: 'New Comment', description: 'Sarah left a comment on "API Integration"', time: '2 hours ago', type: 'team', read: false, icon: MessageSquare },
  { id: '4', title: 'Deadline Approaching', description: 'Project deadline is in 2 days', time: '3 hours ago', type: 'reminder', read: true, icon: AlertTriangle },
  { id: '5', title: 'Team Update', description: 'Alex joined the Marketing Campaign project', time: '5 hours ago', type: 'team', read: true, icon: Users },
  { id: '6', title: 'Time Tracking', description: 'You tracked 6.5 hours today — great job!', time: '8 hours ago', type: 'system', read: true, icon: Clock },
  { id: '7', title: 'Task Overdue', description: '"Client Presentation" is past its due date', time: '1 day ago', type: 'task', read: true, icon: AlertTriangle },
  { id: '8', title: 'Weekly Report Ready', description: 'Your productivity report for this week is available', time: '1 day ago', type: 'system', read: true, icon: Zap },
];

const typeColors: Record<string, string> = {
  task: 'bg-primary/20 text-primary',
  goal: 'bg-green-500/20 text-green-400',
  team: 'bg-blue-500/20 text-blue-400',
  system: 'bg-purple-500/20 text-purple-400',
  reminder: 'bg-yellow-500/20 text-yellow-400',
};

export function NotificationsView() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const filters = ['all', 'unread', 'task', 'team', 'goal', 'system'];

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">{unreadCount} unread</span>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs gap-1">
          <CheckCheck className="w-3 h-3" /> Mark all read
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm"
            className={`text-xs capitalize shrink-0 ${filter === f ? 'gradient-accent text-primary-foreground' : ''}`}
            onClick={() => setFilter(f)}
          >{f}</Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(notif => (
          <Card key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`cursor-pointer transition-all duration-200 hover:shadow-elevated ${!notif.read ? 'border-primary/30 shadow-glow' : 'shadow-card'}`}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[notif.type]}`}>
                <notif.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-medium ${!notif.read ? 'text-foreground' : 'text-muted-foreground'}`}>{notif.title}</p>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{notif.description}</p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{notif.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
