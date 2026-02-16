import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, getDay } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  color: string;
  type: 'meeting' | 'deadline' | 'event' | 'reminder';
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Sprint Planning', date: '2026-02-16', time: '10:00', color: 'bg-blue-500', type: 'meeting' },
  { id: '2', title: 'Design Review', date: '2026-02-18', time: '14:00', color: 'bg-purple-500', type: 'meeting' },
  { id: '3', title: 'Project Deadline', date: '2026-02-20', color: 'bg-primary', type: 'deadline' },
  { id: '4', title: 'Team Standup', date: '2026-02-17', time: '09:00', color: 'bg-green-500', type: 'meeting' },
  { id: '5', title: 'Client Call', date: '2026-02-19', time: '11:30', color: 'bg-yellow-500', type: 'meeting' },
  { id: '6', title: 'Release v2.0', date: '2026-02-25', color: 'bg-primary', type: 'deadline' },
  { id: '7', title: 'Workshop', date: '2026-02-22', time: '13:00', color: 'bg-cyan-500', type: 'event' },
  { id: '8', title: 'Review Metrics', date: '2026-02-24', color: 'bg-orange-500', type: 'reminder' },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const getEventsForDate = (date: string) =>
    mockEvents.filter(e => e.date === date);

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Calendar Grid */}
        <Card className="flex-1 shadow-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date())} className="text-xs">Today</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map(d => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1" />
              ))}
              {days.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const dayEvents = getEventsForDate(dateStr);
                const selected = selectedDate === dateStr;

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`aspect-square p-1 rounded-lg text-sm transition-all relative ${
                      isToday(day)
                        ? 'bg-primary/20 font-bold text-primary'
                        : selected
                        ? 'bg-secondary ring-1 ring-primary'
                        : 'hover:bg-secondary'
                    } ${!isSameMonth(day, currentMonth) ? 'text-muted-foreground/40' : 'text-foreground'}`}
                  >
                    <span className="text-xs sm:text-sm">{format(day, 'd')}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex justify-center gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map(e => (
                          <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Detail */}
        <Card className="w-full sm:w-72 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {selectedDate ? format(new Date(selectedDate + 'T12:00:00'), 'EEEE, MMM d') : 'Select a day'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedEvents.length > 0 ? (
              selectedEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3 p-2 rounded-lg bg-secondary/50">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${event.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    {event.time && <p className="text-xs text-muted-foreground">{event.time}</p>}
                    <Badge variant="outline" className="text-[10px] mt-1 capitalize">{event.type}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                {selectedDate ? 'No events this day' : 'Click a day to see events'}
              </p>
            )}
            {selectedDate && (
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="w-3 h-3 mr-1" /> Add Event
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
