import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Check, Clock, Zap, BarChart3, MessageSquare, Mail, CreditCard, Github, Trello } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  status: 'connected' | 'available' | 'coming-soon';
  category: string;
}

const integrations: Integration[] = [
  { id: '1', name: 'Toggl Track', description: 'Sync time entries and projects automatically', icon: Clock, color: 'bg-pink-500', status: 'connected', category: 'Time Tracking' },
  { id: '2', name: 'Slack', description: 'Get task notifications and updates in channels', icon: MessageSquare, color: 'bg-purple-500', status: 'connected', category: 'Communication' },
  { id: '3', name: 'GitHub', description: 'Link commits and PRs to tasks', icon: Github, color: 'bg-gray-500', status: 'available', category: 'Development' },
  { id: '4', name: 'Stripe', description: 'Track invoices and payment milestones', icon: CreditCard, color: 'bg-indigo-500', status: 'available', category: 'Finance' },
  { id: '5', name: 'Google Calendar', description: 'Two-way sync events and deadlines', icon: BarChart3, color: 'bg-blue-500', status: 'available', category: 'Calendar' },
  { id: '6', name: 'Invotime', description: 'Automated time-based invoicing', icon: Zap, color: 'bg-orange-500', status: 'coming-soon', category: 'Finance' },
  { id: '7', name: 'Trello', description: 'Import boards and cards as tasks', icon: Trello, color: 'bg-sky-500', status: 'available', category: 'Project Mgmt' },
  { id: '8', name: 'Gmail', description: 'Create tasks from emails', icon: Mail, color: 'bg-red-500', status: 'coming-soon', category: 'Email' },
];

const statusConfig = {
  connected: { label: 'Connected', class: 'bg-green-500/15 text-green-400 border-green-500/30' },
  available: { label: 'Available', class: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  'coming-soon': { label: 'Coming Soon', class: 'bg-muted text-muted-foreground border-border' },
};

export function IntegrationsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {integrations.map(int => {
          const status = statusConfig[int.status];
          return (
            <Card key={int.id} className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${int.color} flex items-center justify-center`}>
                    <int.icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${status.class}`}>{status.label}</Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{int.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{int.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{int.category}</span>
                  {int.status === 'connected' ? (
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Check className="w-3 h-3" /> Manage
                    </Button>
                  ) : int.status === 'available' ? (
                    <Button size="sm" className="h-7 text-xs gradient-accent text-primary-foreground shadow-glow gap-1">
                      <ExternalLink className="w-3 h-3" /> Connect
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Notify Me</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
