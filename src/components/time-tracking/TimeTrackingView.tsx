import { Clock, Play, Pause, BarChart3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TimeTrackingViewProps {
  tasks: Task[];
}

const weekData = [
  { day: 'Mon', hours: 6.5, target: 8 },
  { day: 'Tue', hours: 7.2, target: 8 },
  { day: 'Wed', hours: 8.1, target: 8 },
  { day: 'Thu', hours: 5.8, target: 8 },
  { day: 'Fri', hours: 7.0, target: 8 },
  { day: 'Sat', hours: 2.0, target: 4 },
  { day: 'Sun', hours: 0, target: 0 },
];

const integrations = [
  { name: 'Toggl', status: 'connected', icon: '⏱️' },
  { name: 'Invotime', status: 'disconnected', icon: '📊' },
  { name: 'Clockify', status: 'disconnected', icon: '⏰' },
];

export function TimeTrackingView({ tasks }: TimeTrackingViewProps) {
  const trackingTask = tasks.find(t => t.isTracking);
  const totalWeekHours = weekData.reduce((acc, d) => acc + d.hours, 0);
  const maxHours = Math.max(...weekData.map(d => d.hours));

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Time Tracking</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor your productivity and track time spent on tasks.</p>
        </div>
      </div>

      {/* Active Timer */}
      <div className={cn(
        "p-4 sm:p-6 rounded-2xl border",
        trackingTask 
          ? "bg-primary/5 border-primary/20" 
          : "bg-card border-border"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0",
              trackingTask ? "gradient-accent shadow-glow" : "bg-secondary"
            )}>
              <Clock className={cn("w-6 h-6 sm:w-7 sm:h-7", trackingTask ? "text-primary-foreground" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">
                {trackingTask ? 'Currently tracking' : 'No active timer'}
              </p>
              <h3 className="text-base sm:text-xl font-semibold text-foreground">
                {trackingTask ? trackingTask.title : 'Start tracking a task'}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <div className="text-left sm:text-right">
              <p className="text-2xl sm:text-4xl font-bold text-foreground tabular-nums">
                {trackingTask ? '01:23:45' : '00:00:00'}
              </p>
            </div>
            <Button 
              size="lg"
              className={cn(
                "h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex-shrink-0",
                trackingTask ? "bg-destructive hover:bg-destructive/90" : "gradient-accent shadow-glow"
              )}
            >
              {trackingTask ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm sm:text-base">Weekly Overview</h2>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">{totalWeekHours.toFixed(1)}h this week</span>
          </div>
          
          <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-36 sm:h-48">
            {weekData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1 sm:gap-2">
                <div className="w-full relative h-full flex items-end">
                  {/* Target bar */}
                  <div 
                    className="absolute bottom-0 w-full bg-secondary rounded-t-lg"
                    style={{ height: `${(day.target / maxHours) * 100}%` }}
                  />
                  {/* Actual bar */}
                  <div 
                    className={cn(
                      "relative w-full rounded-t-lg transition-all duration-500",
                      day.hours >= day.target ? "gradient-accent" : "bg-primary/60"
                    )}
                    style={{ 
                      height: `${(day.hours / maxHours) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{day.day}</span>
                <span className="text-xs sm:text-sm font-medium text-foreground">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
          <h2 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Integrations</h2>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div 
                key={integration.name}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl">{integration.icon}</span>
                  <span className="font-medium text-foreground text-sm sm:text-base">{integration.name}</span>
                </div>
                <Button 
                  variant={integration.status === 'connected' ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    "text-xs sm:text-sm h-7 sm:h-8",
                    integration.status === 'connected' && "bg-emerald-500 hover:bg-emerald-600"
                  )}
                >
                  {integration.status === 'connected' ? 'Connected' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Time Entries */}
      <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground text-sm sm:text-base">Recent Entries</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm h-8">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {tasks.filter(t => t.actualTime).slice(0, 5).map((task) => (
            <div 
              key={task.id}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base truncate">{task.title}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{task.date}</span>
                <span className="font-medium text-foreground text-sm sm:text-base">{task.actualTime}m</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
