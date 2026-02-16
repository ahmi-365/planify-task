import { Plus, UserPlus, Mail, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    tasksCompleted: 24,
    hoursLogged: 38,
    status: 'online',
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Designer',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    tasksCompleted: 18,
    hoursLogged: 42,
    status: 'online',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Developer',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    tasksCompleted: 31,
    hoursLogged: 45,
    status: 'away',
  },
  {
    id: '4',
    name: 'Alex Thompson',
    role: 'Marketing Lead',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    tasksCompleted: 15,
    hoursLogged: 32,
    status: 'offline',
  },
];

const activities = [
  { id: '1', user: 'Sarah', action: 'completed task', target: 'Design Review', time: '2 min ago' },
  { id: '2', user: 'Mike', action: 'started tracking', target: 'UI Mockups', time: '15 min ago' },
  { id: '3', user: 'Emily', action: 'added comment on', target: 'API Integration', time: '1 hour ago' },
  { id: '4', user: 'Alex', action: 'created goal', target: 'Q1 Marketing Campaign', time: '2 hours ago' },
];

export function TeamView() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Team</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Collaborate and manage your team members.</p>
        </div>
        <Button className="gradient-accent text-primary-foreground shadow-glow self-start sm:self-auto" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Team Members Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="p-3 sm:p-4 rounded-xl border border-border bg-card hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-card ${
                        member.status === 'online' ? 'bg-emerald-500' :
                        member.status === 'away' ? 'bg-amber-500' : 'bg-muted-foreground'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm sm:text-base truncate">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-muted-foreground">Tasks:</span>
                    <span className="font-medium text-foreground">{member.tasksCompleted}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-muted-foreground">Hours:</span>
                    <span className="font-medium text-foreground">{member.hoursLogged}h</span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground text-xs sm:text-sm h-8">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Activity</h2>
          <div className="p-3 sm:p-4 rounded-xl border border-border bg-card space-y-3 sm:space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="text-primary">{activity.target}</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="p-3 sm:p-4 rounded-xl border border-border bg-card">
            <h3 className="font-medium text-foreground mb-3 text-sm sm:text-base">Team Stats</h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs sm:text-sm text-muted-foreground">Total Members</span>
                <span className="font-medium text-foreground">{teamMembers.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs sm:text-sm text-muted-foreground">Tasks This Week</span>
                <span className="font-medium text-foreground">88</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs sm:text-sm text-muted-foreground">Hours Logged</span>
                <span className="font-medium text-foreground">157h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
