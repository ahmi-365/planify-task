import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface DraggableTaskCardProps {
  task: Task;
  onClick: () => void;
  onToggleTracking?: () => void;
}

export function DraggableTaskCard({ task, onClick, onToggleTracking }: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: { task }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none",
        isDragging && "opacity-50 z-50"
      )}
    >
      <TaskCard 
        task={task} 
        onClick={onClick} 
        onToggleTracking={onToggleTracking}
      />
    </div>
  );
}
