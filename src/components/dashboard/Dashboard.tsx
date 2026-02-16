import { CheckCircle2, Clock, Target, TrendingUp, CalendarDays, Zap } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { GoalCard } from './GoalCard';
import { TaskCard } from '../planner/TaskCard';
import { Task, Goal } from '@/types';

interface DashboardProps {
  tasks: Task[];
  goals: Goal[];
  onTaskClick: (task: Task) => void;
}

export function Dashboard({ tasks, goals, onTaskClick }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === today);
  const completedToday = todayTasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const totalTrackedTime = tasks.reduce((acc, t) => acc + (t.actualTime || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Good morning, John! 👋</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Here's what's on your plate today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-primary">5 day streak!</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard 
          title="Tasks Today" 
          value={todayTasks.length}
          change={`${completedToday} completed`}
          changeType="positive"
          icon={CalendarDays}
          iconColor="text-primary"
        />
        <StatsCard 
          title="In Progress" 
          value={inProgressTasks.length}
          icon={Clock}
          iconColor="text-amber-500"
        />
        <StatsCard 
          title="Goals Active" 
          value={goals.length}
          change="2 near completion"
          changeType="positive"
          icon={Target}
          iconColor="text-emerald-500"
        />
        <StatsCard 
          title="Time Tracked" 
          value={`${Math.floor(totalTrackedTime / 60)}h ${totalTrackedTime % 60}m`}
          change="+15% vs last week"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Today's Tasks</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">{completedToday}/{todayTasks.length} done</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {todayTasks.slice(0, 6).map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onTaskClick(task)} 
              />
            ))}
            {todayTasks.length === 0 && (
              <div className="col-span-1 sm:col-span-2 p-6 sm:p-8 rounded-xl border border-dashed border-border text-center">
                <CheckCircle2 className="w-10 sm:w-12 h-10 sm:h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm sm:text-base text-muted-foreground">No tasks for today. Enjoy your free time!</p>
              </div>
            )}
          </div>
        </div>

        {/* Goals */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Active Goals</h2>
          <div className="space-y-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 sm:p-6 rounded-2xl gradient-accent shadow-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-1">Ready to boost your productivity?</h3>
            <p className="text-sm sm:text-base text-primary-foreground/80">Connect your favorite tools and track time seamlessly.</p>
          </div>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/20 backdrop-blur text-primary-foreground font-medium hover:bg-white/30 transition-colors text-sm sm:text-base whitespace-nowrap">
            Explore Integrations
          </button>
        </div>
      </div>
    </div>
  );
}
