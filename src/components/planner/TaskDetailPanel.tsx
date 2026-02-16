import { X, Clock, Calendar, Tag, Flag, RefreshCw, Play, Pause, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface TaskDetailPanelProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isMobile?: boolean;
}

const statusOptions = [
  { value: 'todo', label: 'To Do', color: 'bg-muted-foreground' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-primary' },
  { value: 'done', label: 'Done', color: 'bg-emerald-500' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];

function TaskDetailContent({ 
  task, 
  onClose, 
  onUpdate, 
  onDelete,
  showHeader = true,
}: { 
  task: Task; 
  onClose: () => void; 
  onUpdate: (task: Task) => void; 
  onDelete: (taskId: string) => void;
  showHeader?: boolean;
}) {
  return (
    <>
      {/* Header */}
      {showHeader && (
        <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-border">
          <h2 className="font-semibold text-foreground">Task Details</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]">
        {/* Title */}
        <div>
          <Input 
            value={task.title}
            onChange={(e) => onUpdate({ ...task, title: e.target.value })}
            className="text-base sm:text-lg font-medium border-0 px-0 focus-visible:ring-0 bg-transparent"
            placeholder="Task title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Description</label>
          <Textarea 
            value={task.description || ''}
            onChange={(e) => onUpdate({ ...task, description: e.target.value })}
            className="min-h-20 sm:min-h-24 resize-none"
            placeholder="Add a description..."
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onUpdate({ ...task, status: option.value as Task['status'] })}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm",
                  task.status === option.value 
                    ? "border-primary bg-primary/10 text-foreground" 
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", option.color)} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            <Flag className="w-4 h-4 inline mr-2" />
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onUpdate({ ...task, priority: option.value as Task['priority'] })}
                className={cn(
                  "px-3 py-2 rounded-lg border transition-colors text-sm font-medium",
                  task.priority === option.value 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50",
                  option.color
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date
            </label>
            <Input 
              type="date"
              value={task.date}
              onChange={(e) => onUpdate({ ...task, date: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Time
            </label>
            <Input 
              type="time"
              value={task.time || ''}
              onChange={(e) => onUpdate({ ...task, time: e.target.value })}
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            Estimated Duration (minutes)
          </label>
          <Input 
            type="number"
            value={task.duration || ''}
            onChange={(e) => onUpdate({ ...task, duration: parseInt(e.target.value) || undefined })}
            placeholder="30"
          />
        </div>

        {/* Time Tracking */}
        <div className="p-3 sm:p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-foreground text-sm sm:text-base">Time Tracking</span>
            <Button 
              variant={task.isTracking ? "default" : "outline"}
              size="sm"
              className={cn(task.isTracking && "gradient-accent")}
            >
              {task.isTracking ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Planned:</span>
              <span className="ml-2 font-medium text-foreground">{task.duration || 0}m</span>
            </div>
            <div>
              <span className="text-muted-foreground">Actual:</span>
              <span className="ml-2 font-medium text-primary">{task.actualTime || 0}m</span>
            </div>
          </div>
        </div>

        {/* Recurring */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Recurring
          </label>
          <div className="flex flex-wrap gap-2">
            {['none', 'daily', 'weekly', 'monthly'].map((option) => (
              <button
                key={option}
                onClick={() => onUpdate({ 
                  ...task, 
                  recurring: option === 'none' ? undefined : option as Task['recurring'] 
                })}
                className={cn(
                  "px-3 py-2 rounded-lg border transition-colors text-sm",
                  (task.recurring || 'none') === option 
                    ? "border-primary bg-primary/10 text-foreground" 
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80"
              >
                {tag}
                <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
              </span>
            ))}
            <button className="px-3 py-1 rounded-full text-sm border border-dashed border-border text-muted-foreground hover:border-primary hover:text-foreground transition-colors">
              + Add tag
            </button>
          </div>
        </div>

        {/* Mobile delete button */}
        <div className="pt-4 sm:hidden">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Task
          </Button>
        </div>
      </div>
    </>
  );
}

export function TaskDetailPanel({ task, isOpen, onClose, onUpdate, onDelete, isMobile }: TaskDetailPanelProps) {
  if (!task) return null;

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle>Task Details</DrawerTitle>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1">
            <TaskDetailContent 
              task={task} 
              onClose={onClose} 
              onUpdate={onUpdate} 
              onDelete={onDelete}
              showHeader={false}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use slide-in panel
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border shadow-elevated z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <TaskDetailContent 
          task={task} 
          onClose={onClose} 
          onUpdate={onUpdate} 
          onDelete={onDelete}
        />
      </div>
    </>
  );
}
