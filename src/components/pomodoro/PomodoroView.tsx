import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from 'lucide-react';

type TimerMode = 'focus' | 'short-break' | 'long-break';

const modeConfig: Record<TimerMode, { label: string; duration: number; icon: React.ElementType; color: string }> = {
  focus: { label: 'Focus', duration: 25 * 60, icon: Brain, color: 'text-primary' },
  'short-break': { label: 'Short Break', duration: 5 * 60, icon: Coffee, color: 'text-green-400' },
  'long-break': { label: 'Long Break', duration: 15 * 60, icon: Coffee, color: 'text-blue-400' },
};

export function PomodoroView() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(modeConfig.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') setSessions(s => s + 1);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(modeConfig[newMode].duration);
    setIsRunning(false);
  };

  const reset = () => {
    setTimeLeft(modeConfig[mode].duration);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((modeConfig[mode].duration - timeLeft) / modeConfig[mode].duration) * 100;
  const config = modeConfig[mode];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Mode Selector */}
      <div className="flex gap-2 mb-8">
        {(Object.keys(modeConfig) as TimerMode[]).map(m => (
          <Button
            key={m}
            variant={mode === m ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchMode(m)}
            className={`text-xs gap-1 ${mode === m ? 'gradient-accent text-primary-foreground' : ''}`}
          >
            {React.createElement(modeConfig[m].icon, { className: 'w-3 h-3' })}
            {modeConfig[m].label}
          </Button>
        ))}
      </div>

      {/* Timer Circle */}
      <Card className="shadow-elevated mb-8">
        <CardContent className="p-8 sm:p-12 flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl sm:text-6xl font-bold tracking-tight ${config.color}`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">{config.label}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              className="gradient-accent text-primary-foreground shadow-glow gap-2 px-8"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant="outline" size="lg" onClick={reset}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Counter */}
      <div className="flex items-center gap-3">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Sessions today:</span>
        <div className="flex gap-1">
          {Array.from({ length: Math.max(sessions, 4) }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < sessions ? 'bg-primary shadow-glow' : 'bg-border'}`} />
          ))}
        </div>
        <Badge variant="outline" className="text-xs">{sessions} / 8</Badge>
      </div>
    </div>
  );
}

// Need React import for createElement
import React from 'react';
