import { Clock, MoreHorizontal, Play, Pause, Tag } from 'lucide-react';
import { Task } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onToggleTracking?: () => void;
}

const priorityColors = {
  low: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  high: 'bg-red-500/20 text-red-500 border-red-500/30',
};

const statusIndicators = {
  'todo': 'bg-muted-foreground',
  'in-progress': 'bg-primary animate-pulse-soft',
  'done': 'bg-emerald-500',
};

export function TaskCard({ task, onClick, onToggleTracking }: TaskCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group p-3 rounded-xl border border-border bg-card shadow-card cursor-pointer",
        "hover:shadow-elevated hover:border-primary/30 transition-all duration-200",
        task.status === 'done' && "opacity-60"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", statusIndicators[task.status])} />
          <h4 className={cn(
            "font-medium text-sm text-card-foreground line-clamp-1",
            task.status === 'done' && "line-through"
          )}>
            {task.title}
          </h4>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Time & Duration */}
      {(task.time || task.duration) && (
        <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
          {task.time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.time}
            </span>
          )}
          {task.duration && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary">
              {task.duration}m
              {task.actualTime && (
                <span className="text-primary">/ {task.actualTime}m</span>
              )}
            </span>
          )}
        </div>
      )}

      {/* Tags & Priority */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium border",
            priorityColors[task.priority]
          )}>
            {task.priority}
          </span>
          {task.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Time Tracking Toggle */}
        {task.status !== 'done' && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onToggleTracking?.();
            }}
          >
            {task.isTracking ? (
              <Pause className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Play className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </Button>
        )}
      </div>

      {/* Recurring Indicator */}
      {task.recurring && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-primary">↻</span> Repeats {task.recurring}
          </span>
        </div>
      )}
    </div>
  );
}
