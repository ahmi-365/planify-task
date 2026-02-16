import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { WeeklyPlanner } from '@/components/planner/WeeklyPlanner';
import { TaskDetailPanel } from '@/components/planner/TaskDetailPanel';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { GoalsView } from '@/components/goals/GoalsView';
import { TimeTrackingView } from '@/components/time-tracking/TimeTrackingView';
import { TeamView } from '@/components/team/TeamView';
import { NotesView } from '@/components/notes/NotesView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { ReportsView } from '@/components/reports/ReportsView';
import { IntegrationsView } from '@/components/integrations/IntegrationsView';
import { NotificationsView } from '@/components/notifications/NotificationsView';
import { SettingsView } from '@/components/settings/SettingsView';
import { ProjectsView } from '@/components/projects/ProjectsView';
import { PomodoroView } from '@/components/pomodoro/PomodoroView';
import { mockTasks, mockGoals } from '@/data/mockData';
import { Task } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

const viewTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  planner: 'Weekly Planner',
  calendar: 'Calendar',
  projects: 'Projects',
  goals: 'Goals',
  notes: 'Notes',
  pomodoro: 'Pomodoro Timer',
  'time-tracking': 'Time Tracking',
  reports: 'Reports & Analytics',
  team: 'Team',
  integrations: 'Integrations',
  notifications: 'Notifications',
  settings: 'Settings',
};

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskPanelOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setIsTaskPanelOpen(false);
    setSelectedTask(null);
  };

  const handleTaskMove = (taskId: string, newDate: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, date: newDate } : t
    ));
  };

  const handleAddTask = (date?: string) => {
    const newTask: Task = {
      id: `new-${Date.now()}`,
      title: 'New Task',
      status: 'todo',
      priority: 'medium',
      date: date || new Date().toISOString().split('T')[0],
      tags: [],
    };
    setTasks(prev => [...prev, newTask]);
    setSelectedTask(newTask);
    setIsTaskPanelOpen(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} goals={mockGoals} onTaskClick={handleTaskClick} />;
      case 'planner':
        return <WeeklyPlanner tasks={tasks} onTaskClick={handleTaskClick} onAddTask={handleAddTask} onTaskMove={handleTaskMove} />;
      case 'calendar':
        return <CalendarView />;
      case 'projects':
        return <ProjectsView />;
      case 'goals':
        return <GoalsView goals={mockGoals} />;
      case 'notes':
        return <NotesView />;
      case 'pomodoro':
        return <PomodoroView />;
      case 'time-tracking':
        return <TimeTrackingView tasks={tasks} />;
      case 'reports':
        return <ReportsView />;
      case 'team':
        return <TeamView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard tasks={tasks} goals={mockGoals} onTaskClick={handleTaskClick} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {!isMobile && (
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={viewTitles[activeView]}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          onAddTask={() => handleAddTask()}
          activeView={activeView}
          onViewChange={setActiveView}
          mobileNavOpen={mobileNavOpen}
          onMobileNavChange={setMobileNavOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {renderView()}
        </main>
      </div>

      <TaskDetailPanel 
        task={selectedTask}
        isOpen={isTaskPanelOpen}
        onClose={() => setIsTaskPanelOpen(false)}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Index;
