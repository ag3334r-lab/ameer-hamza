import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, Zap } from 'lucide-react';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(true);
  const saveProfile = useSaveCallerUserProfile();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveProfile.mutateAsync({ name: name.trim() });
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="bg-dark-surface border border-neon-border text-neon-text max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center">
              <User className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <DialogTitle className="text-neon-green font-black text-lg">Welcome!</DialogTitle>
              <DialogDescription className="text-neon-dim text-sm">
                Set up your profile to get started
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-neon-dim text-sm font-semibold">
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="bg-dark-card border-neon-border text-neon-text placeholder:text-neon-dim/50 focus:border-neon-green focus:ring-neon-green/20"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="w-full bg-neon-green text-dark-base font-bold hover:bg-neon-bright shadow-neon transition-all"
          >
            {saveProfile.isPending ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
