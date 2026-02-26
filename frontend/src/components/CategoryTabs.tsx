import { Gamepad2, Smartphone, LayoutGrid } from 'lucide-react';

export type CategoryFilter = 'all' | 'game' | 'app';

interface CategoryTabsProps {
  selected: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
  counts: { all: number; game: number; app: number };
}

const tabs: { id: CategoryFilter; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'game', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'app', label: 'Apps', icon: <Smartphone className="w-4 h-4" /> },
];

export default function CategoryTabs({ selected, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => {
        const isActive = selected === tab.id;
        const count = counts[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              isActive
                ? 'bg-neon-green text-dark-base border-neon-green shadow-neon'
                : 'bg-dark-card text-neon-dim border-neon-border hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5'
            }`}
          >
            {tab.icon}
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-dark-base/30 text-dark-base' : 'bg-neon-green/10 text-neon-green'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
