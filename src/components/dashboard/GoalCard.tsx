import { Goal } from '@/types';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const percentage = Math.round((goal.progress / goal.target) * 100);

  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-xl border border-border bg-card shadow-card hover:shadow-elevated transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${goal.color}20` }}
        >
          🎯
        </div>
        <span 
          className="text-2xl font-bold"
          style={{ color: goal.color }}
        >
          {percentage}%
        </span>
      </div>

      <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
        {goal.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3">
        {goal.progress} / {goal.target} {goal.unit}
      </p>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${goal.color}, ${goal.color}aa)`
          }}
        />
      </div>

      {goal.dueDate && (
        <p className="text-xs text-muted-foreground mt-2">
          Due: {new Date(goal.dueDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      )}
    </div>
  );
}
