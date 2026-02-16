import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { DraggableTaskCard } from './DraggableTaskCard';
import { cn } from '@/lib/utils';

interface DroppableDayProps {
  date: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isWeekend: boolean;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (date: string) => void;
}

export function DroppableDay({
  date,
  dayName,
  dayNumber,
  isToday,
  isWeekend,
  tasks,
  onTaskClick,
  onAddTask,
}: DroppableDayProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: date,
    data: { date },
  });

  const taskIds = tasks.map(t => t.id);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card/50 overflow-hidden transition-all duration-200",
        isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        isWeekend && "bg-secondary/30",
        isOver && "ring-2 ring-primary/50 bg-primary/5"
      )}
    >
      {/* Day Header */}
      <div className={cn(
        "px-3 py-2 border-b border-border flex items-center justify-between",
        isToday && "bg-primary/10"
      )}>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            {dayName}
          </span>
          <span className={cn(
            "text-lg font-bold",
            isToday ? "text-primary" : "text-foreground"
          )}>
            {dayNumber}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onAddTask(date)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Tasks */}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[120px]">
          {tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="h-full flex items-center justify-center min-h-[80px]">
              <p className="text-xs text-muted-foreground">
                {isOver ? "Drop here" : "No tasks"}
              </p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
