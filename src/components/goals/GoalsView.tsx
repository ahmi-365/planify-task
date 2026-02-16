import { Plus, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoalCard } from '../dashboard/GoalCard';
import { Goal } from '@/types';

interface GoalsViewProps {
  goals: Goal[];
}

export function GoalsView({ goals }: GoalsViewProps) {
  const totalProgress = goals.reduce((acc, g) => acc + (g.progress / g.target) * 100, 0) / goals.length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Goals</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Track your progress and achieve more.</p>
        </div>
        <Button className="gradient-accent text-primary-foreground shadow-glow self-start sm:self-auto" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">Active Goals</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{goals.length}</p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">Overall Progress</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{Math.round(totalProgress)}%</p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <span className="text-base sm:text-lg">🔥</span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">Goals Completed</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">12</p>
        </div>
      </div>

      {/* Goals Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">All Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}

          {/* Add Goal Card */}
          <button className="p-4 sm:p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground min-h-[150px] sm:min-h-[200px]">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="font-medium text-sm sm:text-base">Add New Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
