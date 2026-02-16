export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  date: string;
  time?: string;
  duration?: number; // in minutes
  actualTime?: number;
  tags: string[];
  projectId?: string;
  recurring?: 'daily' | 'weekly' | 'monthly';
  isTracking?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  target: number;
  unit: string;
  color: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  startTime: string;
  endTime?: string;
  duration: number;
}
