import { useState } from 'react';
import { Plus, Trash2, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Category } from '../backend';
import { useAddListing } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ApkUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM = {
  name: '',
  category: Category.app as Category,
  description: '',
  version: '',
  fileSize: '',
  downloadUrl: '',
  iconUrl: '',
};

export default function ApkUploadModal({ open, onClose }: ApkUploadModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [modFeatures, setModFeatures] = useState<string[]>(['']);
  const addListing = useAddListing();

  const handleChange = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setModFeatures((prev) => prev.map((f, i) => (i === index ? value : f)));
  };

  const addFeature = () => {
    setModFeatures((prev) => [...prev, '']);
  };

  const removeFeature = (index: number) => {
    setModFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setModFeatures(['']);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fileSizeNum = parseFloat(form.fileSize);
    if (isNaN(fileSizeNum) || fileSizeNum <= 0) {
      toast.error('Please enter a valid file size in MB.');
      return;
    }

    const cleanedFeatures = modFeatures.filter((f) => f.trim() !== '');

    try {
      await addListing.mutateAsync({
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        modFeatures: cleanedFeatures,
        version: form.version.trim(),
        fileSize: BigInt(Math.round(fileSizeNum * 1024 * 1024)),
        downloadUrl: form.downloadUrl.trim(),
        iconUrl: form.iconUrl.trim(),
      });
      toast.success(`"${form.name}" has been added successfully!`);
      handleClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add listing.';
      toast.error(
        message.includes('Unauthorized')
          ? 'You must be logged in to submit APK listings.'
          : message
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="bg-dark-card border border-neon-green/30 text-neon-text max-w-2xl max-h-[90vh] overflow-y-auto shadow-neon-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-neon-green flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload APK Listing
          </DialogTitle>
          <DialogDescription className="text-neon-dim text-sm">
            Fill in the details below to add a new modded APK to the store.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">App Name *</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. PUBG Mobile"
              className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(val) => handleChange('category', val as Category)}
            >
              <SelectTrigger className="bg-dark-surface border-neon-border text-neon-text focus:border-neon-green/60 focus:ring-neon-green/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border-neon-border text-neon-text">
                <SelectItem value={Category.game} className="focus:bg-neon-green/10 focus:text-neon-green">
                  🎮 Game
                </SelectItem>
                <SelectItem value={Category.app} className="focus:bg-neon-green/10 focus:text-neon-green">
                  📱 App
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Description *</Label>
            <Textarea
              required
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the app..."
              rows={3}
              className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20 resize-none"
            />
          </div>

          {/* Mod Features */}
          <div className="space-y-2">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Mod Features</Label>
            <div className="space-y-2">
              {modFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1} (e.g. Unlimited Coins)`}
                    className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
                  />
                  {modFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-neon-red/70 hover:text-neon-red hover:bg-neon-red/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1.5 text-xs text-neon-green/70 hover:text-neon-green transition-colors mt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Feature
            </button>
          </div>

          {/* Version & File Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Version *</Label>
              <Input
                required
                value={form.version}
                onChange={(e) => handleChange('version', e.target.value)}
                placeholder="e.g. 3.1.0"
                className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">File Size (MB) *</Label>
              <Input
                required
                type="number"
                min="0.1"
                step="0.1"
                value={form.fileSize}
                onChange={(e) => handleChange('fileSize', e.target.value)}
                placeholder="e.g. 75.5"
                className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
              />
            </div>
          </div>

          {/* Download URL */}
          <div className="space-y-1.5">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Download URL *</Label>
            <Input
              required
              type="url"
              value={form.downloadUrl}
              onChange={(e) => handleChange('downloadUrl', e.target.value)}
              placeholder="https://example.com/download/app.apk"
              className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
            />
          </div>

          {/* Icon URL */}
          <div className="space-y-1.5">
            <Label className="text-neon-dim text-xs font-bold uppercase tracking-wider">Icon URL</Label>
            <Input
              type="url"
              value={form.iconUrl}
              onChange={(e) => handleChange('iconUrl', e.target.value)}
              placeholder="https://example.com/icon.png"
              className="bg-dark-surface border-neon-border text-neon-text placeholder:text-neon-dim/40 focus:border-neon-green/60 focus:ring-neon-green/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-neon-border/50">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={addListing.isPending}
              className="text-neon-dim hover:text-neon-text hover:bg-neon-green/5 border border-neon-border"
            >
              <X className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addListing.isPending}
              className="bg-neon-green text-dark-base font-bold hover:bg-neon-bright shadow-neon transition-all"
            >
              {addListing.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1.5" />
                  Upload APK
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
