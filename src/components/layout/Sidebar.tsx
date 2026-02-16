import { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Target, 
  Clock, 
  Users, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Zap,
  FileText,
  CalendarDays,
  BarChart3,
  Puzzle,
  Bell,
  FolderKanban,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Workspace, Project } from '@/types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const workspaces: Workspace[] = [
  { id: '1', name: 'Personal', icon: '🏠', isActive: true },
  { id: '2', name: 'Work', icon: '💼' },
  { id: '3', name: 'Side Project', icon: '🚀' },
];

const projects: Project[] = [
  { id: '1', name: 'Marketing Campaign', color: '#FF4B4B', taskCount: 12 },
  { id: '2', name: 'Product Launch', color: '#4B9FFF', taskCount: 8 },
  { id: '3', name: 'Website Redesign', color: '#4BFF8B', taskCount: 5 },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planner', label: 'Weekly Planner', icon: Calendar },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
  { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function Sidebar({ collapsed, onToggle, activeView, onViewChange }: SidebarProps) {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shadow-glow">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Planify</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Workspace Switcher */}
      {!collapsed && (
        <div className="p-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-sidebar-accent cursor-pointer hover:bg-sidebar-accent/80 transition-colors">
            <span className="text-lg">{activeWorkspace.icon}</span>
            <span className="text-sm font-medium text-sidebar-accent-foreground flex-1">{activeWorkspace.name}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeView === item.id 
                ? "bg-primary text-primary-foreground shadow-glow" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Projects Section */}
        {!collapsed && (
          <div className="pt-6">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Projects</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {projects.map((project) => (
              <button
                key={project.id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: project.color }}
                />
                <span className="flex-1 text-left truncate">{project.name}</span>
                <span className="text-xs text-muted-foreground">{project.taskCount}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => onViewChange('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            activeView === 'settings'
              ? "bg-primary text-primary-foreground shadow-glow"
              : "text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
