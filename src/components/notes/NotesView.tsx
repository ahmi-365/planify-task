import { useState } from 'react';
import { FileText, Plus, Search, Star, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  starred: boolean;
  updatedAt: string;
}

const mockNotes: Note[] = [
  { id: '1', title: 'Sprint Planning Notes', content: 'Discussed priorities for Q1. Focus on onboarding flow and dashboard redesign. Need to allocate more resources to mobile responsiveness.', category: 'Meeting', starred: true, updatedAt: '2 hours ago' },
  { id: '2', title: 'API Integration Ideas', content: 'Look into Toggl API for time tracking sync. Slack webhooks for notifications. Consider Zapier for custom workflows.', category: 'Ideas', starred: false, updatedAt: '1 day ago' },
  { id: '3', title: 'Design System Updates', content: 'Update button variants. Add new card styles with glassmorphism. Refine color palette for better accessibility.', category: 'Design', starred: true, updatedAt: '3 days ago' },
  { id: '4', title: 'Client Feedback Summary', content: 'Positive feedback on the weekly planner. Request for calendar view integration. Need better export options.', category: 'Feedback', starred: false, updatedAt: '5 days ago' },
  { id: '5', title: 'Release Checklist v2.0', content: 'Final QA testing, update documentation, prepare changelog, notify beta users, deploy to staging first.', category: 'Checklist', starred: false, updatedAt: '1 week ago' },
];

const categoryColors: Record<string, string> = {
  Meeting: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Ideas: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Feedback: 'bg-green-500/20 text-green-400 border-green-500/30',
  Checklist: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function NotesView() {
  const [notes, setNotes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(mockNotes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n));
  };

  const addNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      category: 'Ideas',
      starred: false,
      updatedAt: 'Just now',
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
  };

  return (
    <div className="flex gap-4 sm:gap-6 h-[calc(100vh-8rem)] animate-fade-in">
      {/* Notes List */}
      <div className="w-full sm:w-80 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-0"
            />
          </div>
          <Button onClick={addNote} size="icon" className="gradient-accent text-primary-foreground shadow-glow shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredNotes.map(note => (
            <Card
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`cursor-pointer transition-all duration-200 hover:shadow-elevated ${
                selectedNote?.id === note.id ? 'ring-1 ring-primary shadow-glow' : 'shadow-card'
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-sm text-foreground truncate flex-1">{note.title}</h3>
                  <button onClick={(e) => { e.stopPropagation(); toggleStar(note.id); }}>
                    <Star className={`w-4 h-4 ${note.starred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-[10px] ${categoryColors[note.category] || ''}`}>
                    {note.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {note.updatedAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <Card className="hidden sm:flex flex-1 flex-col shadow-card">
        {selectedNote ? (
          <>
            <CardHeader className="pb-3">
              <Input
                value={selectedNote.title}
                onChange={(e) => {
                  const updated = { ...selectedNote, title: e.target.value };
                  setSelectedNote(updated);
                  setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
                }}
                className="text-xl font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              />
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={categoryColors[selectedNote.category] || ''}>
                  {selectedNote.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {selectedNote.updatedAt}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <Textarea
                value={selectedNote.content}
                onChange={(e) => {
                  const updated = { ...selectedNote, content: e.target.value };
                  setSelectedNote(updated);
                  setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
                }}
                className="h-full min-h-[300px] border-0 bg-transparent resize-none focus-visible:ring-0 text-sm leading-relaxed"
                placeholder="Start writing..."
              />
            </CardContent>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
