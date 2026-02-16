import { Search, Bell, Sun, Moon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  title: string;
  isDark: boolean;
  onThemeToggle: () => void;
  onAddTask: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  mobileNavOpen: boolean;
  onMobileNavChange: (open: boolean) => void;
}

export function Header({ 
  title, 
  isDark, 
  onThemeToggle, 
  onAddTask,
  activeView,
  onViewChange,
  mobileNavOpen,
  onMobileNavChange,
}: HeaderProps) {
  return (
    <header className="h-14 sm:h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-3 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-4">
        <MobileNav 
          activeView={activeView}
          onViewChange={onViewChange}
          open={mobileNavOpen}
          onOpenChange={onMobileNavChange}
        />
        <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        {/* Search - hidden on mobile */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks, projects..." 
            className="w-72 pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Add Task Button */}
        <Button 
          onClick={onAddTask}
          size="sm"
          className="gradient-accent text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onThemeToggle}
          className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9"
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>

        {/* Notifications - hidden on very small screens */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative hidden xs:flex h-8 w-8 sm:h-9 sm:w-9">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* Avatar */}
        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-2 ring-border cursor-pointer hover:ring-primary transition-colors">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm font-medium">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
