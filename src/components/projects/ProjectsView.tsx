import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, MoreHorizontal, Users, Calendar, CheckCircle2 } from 'lucide-react';

interface ProjectBoard {
  id: string;
  name: string;
  color: string;
  description: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  members: string[];
  dueDate: string;
  status: 'active' | 'on-hold' | 'completed';
}

const mockProjects: ProjectBoard[] = [
  { id: '1', name: 'Marketing Campaign', color: '#FF4B4B', description: 'Q1 launch campaign for new product line', progress: 65, totalTasks: 24, completedTasks: 16, members: ['JD', 'SK', 'AR'], dueDate: 'Mar 15', status: 'active' },
  { id: '2', name: 'Product Launch v2.0', color: '#4B9FFF', description: 'Major product update with new features', progress: 40, totalTasks: 32, completedTasks: 13, members: ['JD', 'MK', 'LP', 'SK'], dueDate: 'Apr 1', status: 'active' },
  { id: '3', name: 'Website Redesign', color: '#4BFF8B', description: 'Complete overhaul of company website', progress: 85, totalTasks: 18, completedTasks: 15, members: ['AR', 'MK'], dueDate: 'Feb 28', status: 'active' },
  { id: '4', name: 'Mobile App', color: '#FFB84B', description: 'iOS and Android companion app development', progress: 20, totalTasks: 40, completedTasks: 8, members: ['LP', 'JD', 'SK'], dueDate: 'Jun 30', status: 'active' },
  { id: '5', name: 'Documentation', color: '#B84BFF', description: 'API docs and user guides', progress: 100, totalTasks: 12, completedTasks: 12, members: ['MK'], dueDate: 'Feb 10', status: 'completed' },
  { id: '6', name: 'Analytics Dashboard', color: '#FF4B9F', description: 'Internal analytics and reporting tool', progress: 10, totalTasks: 15, completedTasks: 2, members: ['AR', 'LP'], dueDate: 'May 15', status: 'on-hold' },
];

const statusConfig = {
  active: { label: 'Active', class: 'bg-green-500/15 text-green-400 border-green-500/30' },
  'on-hold': { label: 'On Hold', class: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  completed: { label: 'Completed', class: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
};

export function ProjectsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{mockProjects.length} projects</p>
        <Button size="sm" className="gradient-accent text-primary-foreground shadow-glow gap-1">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map(project => {
          const status = statusConfig[project.status];
          return (
            <Card key={project.id} className="shadow-card hover:shadow-elevated transition-shadow duration-200 cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <h3 className="font-semibold text-foreground text-sm">{project.name}</h3>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${status.class}`}>{status.label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {project.completedTasks}/{project.totalTasks}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.dueDate}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((m, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        {m}
                      </div>
                    ))}
                    {project.members.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-medium text-primary">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
