import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ activeView, onViewChange, open, onOpenChange }: MobileNavProps) {
  const handleViewChange = (view: string) => {
    onViewChange(view);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar
          collapsed={false}
          onToggle={() => {}}
          activeView={activeView}
          onViewChange={handleViewChange}
        />
      </SheetContent>
    </Sheet>
  );
}
