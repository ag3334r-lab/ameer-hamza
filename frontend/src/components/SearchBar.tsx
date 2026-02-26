import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-dim pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search APKs..."
        className="w-full pl-10 pr-10 py-2.5 bg-dark-card border border-neon-border rounded-lg text-sm text-neon-text placeholder:text-neon-dim/50 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/30 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-dim hover:text-neon-green transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
