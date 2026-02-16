import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { DroppableDay } from './DroppableDay';
import { TaskCard } from './TaskCard';
import { Task } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface WeeklyPlannerProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (date: string) => void;
  onTaskMove: (taskId: string, newDate: string) => void;
}

const getWeekDays = (startDate: Date) => {
  const days = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString(),
      isWeekend: i >= 5,
    });
  }
  return days;
};

export function WeeklyPlanner({ tasks, onTaskClick, onAddTask, onTaskMove }: WeeklyPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const isMobile = useIsMobile();
  const weekDays = getWeekDays(currentWeek);

  // Find today's index for mobile view
  const todayIndex = weekDays.findIndex(day => day.isToday);
  const [mobileStartIndex, setMobileStartIndex] = useState(Math.max(0, todayIndex));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
    setMobileStartIndex(0);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
    setMobileStartIndex(0);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
    const newWeekDays = getWeekDays(new Date());
    const newTodayIndex = newWeekDays.findIndex(day => day.isToday);
    setMobileStartIndex(Math.max(0, newTodayIndex));
  };

  // Mobile navigation
  const goToPreviousDays = () => {
    setMobileStartIndex(prev => Math.max(0, prev - (isMobile ? 1 : 3)));
  };

  const goToNextDays = () => {
    const maxIndex = isMobile ? 6 : 4;
    setMobileStartIndex(prev => Math.min(maxIndex, prev + (isMobile ? 1 : 3)));
  };

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;

    // Get the target date from the droppable
    let targetDate: string;
    
    if (over.data.current?.date) {
      // Dropped on a day container
      targetDate = over.data.current.date;
    } else if (over.data.current?.task) {
      // Dropped on another task - get that task's date
      targetDate = over.data.current.task.date;
    } else {
      return;
    }

    // Only move if the date changed
    if (task.date !== targetDate) {
      onTaskMove(taskId, targetDate);
    }
  };

  const monthYear = new Date(weekDays[0].date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Determine visible days based on screen size
  const visibleDays = isMobile 
    ? weekDays.slice(mobileStartIndex, mobileStartIndex + 1)
    : weekDays;

  return (
    <div className="flex flex-col h-full">
      {/* Week Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">{monthYear}</h2>
          <Button variant="outline" size="sm" onClick={goToToday} className="text-xs">
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile day navigation */}
          {isMobile && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToPreviousDays}
                disabled={mobileStartIndex === 0}
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-muted-foreground min-w-[100px] text-center">
                {weekDays[mobileStartIndex]?.dayName} {weekDays[mobileStartIndex]?.dayNumber}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToNextDays}
                disabled={mobileStartIndex >= 6}
                className="h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {/* Week navigation */}
          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            <Button variant="ghost" size="icon" onClick={goToPreviousWeek} className="h-8 w-8 sm:h-9 sm:w-9">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextWeek} className="h-8 w-8 sm:h-9 sm:w-9">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Week Grid with DnD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={`grid gap-2 sm:gap-3 flex-1 min-h-0 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7'
        }`}>
          {visibleDays.map((day) => (
            <DroppableDay
              key={day.date}
              date={day.date}
              dayName={day.dayName}
              dayNumber={day.dayNumber}
              isToday={day.isToday}
              isWeekend={day.isWeekend}
              tasks={getTasksForDate(day.date)}
              onTaskClick={onTaskClick}
              onAddTask={onAddTask}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="opacity-90 rotate-2 scale-105">
              <TaskCard task={activeTask} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Mobile day indicators */}
      {isMobile && (
        <div className="flex justify-center gap-1.5 mt-4 pt-4 border-t border-border">
          {weekDays.map((day, index) => (
            <button
              key={day.date}
              onClick={() => setMobileStartIndex(index)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                index === mobileStartIndex
                  ? 'bg-primary text-primary-foreground'
                  : day.isToday
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              {day.dayName.charAt(0)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
