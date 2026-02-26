import { Download, Star, HardDrive, Tag, CheckCircle2 } from 'lucide-react';
import { Category } from '../backend';

interface ApkCardProps {
  id?: string;
  name: string;
  category: Category;
  description: string;
  modFeatures: string[];
  version: string;
  fileSize: bigint;
  downloadUrl: string;
  iconUrl: string;
}

function formatFileSize(bytes: bigint): string {
  const mb = Number(bytes) / (1024 * 1024);
  if (mb >= 1000) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(1)} MB`;
}

export default function ApkCard({
  name,
  category,
  description,
  modFeatures,
  version,
  fileSize,
  downloadUrl,
  iconUrl,
}: ApkCardProps) {
  const isGame = category === Category.game;

  return (
    <article className="group relative bg-dark-card border border-neon-border rounded-xl overflow-hidden hover:border-neon-green/50 hover:shadow-neon-card transition-all duration-300 flex flex-col">
      {/* Card Header */}
      <div className="p-4 flex items-start gap-3">
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <img
            src={iconUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a0a0a&color=00ff41&size=64&bold=true`}
            alt={name}
            className="w-16 h-16 rounded-xl object-cover border border-neon-border group-hover:border-neon-green/40 transition-colors"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a0a0a&color=00ff41&size=64&bold=true`;
            }}
          />
          <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs ${isGame ? 'bg-neon-purple' : 'bg-neon-blue'}`}>
            {isGame ? '🎮' : '📱'}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-neon-text text-base leading-tight truncate group-hover:text-neon-green transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${
                isGame
                  ? 'bg-neon-purple/20 text-neon-purple border-neon-purple/30'
                  : 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
              }`}
            >
              <Tag className="w-2.5 h-2.5" />
              {isGame ? 'Game' : 'App'}
            </span>
            <span className="flex items-center gap-1 text-xs text-neon-dim">
              <Star className="w-3 h-3 text-neon-yellow fill-neon-yellow" />
              MOD
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pb-3">
        <p className="text-xs text-neon-dim leading-relaxed line-clamp-2">{description}</p>
      </div>

      {/* Mod Features */}
      {modFeatures.length > 0 && (
        <div className="px-4 pb-3">
          <p className="text-xs font-bold text-neon-green uppercase tracking-wider mb-2">Mod Features</p>
          <ul className="space-y-1">
            {modFeatures.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-neon-dim">
                <CheckCircle2 className="w-3 h-3 text-neon-green flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {modFeatures.length > 3 && (
              <li className="text-xs text-neon-green/60 pl-4.5">+{modFeatures.length - 3} more features</li>
            )}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-4 pb-4 pt-2 border-t border-neon-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neon-dim flex items-center gap-1">
              <span className="text-neon-green font-semibold">v{version}</span>
            </span>
            <span className="text-xs text-neon-dim flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              {formatFileSize(fileSize)}
            </span>
          </div>
        </div>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-neon-green text-dark-base font-bold text-sm rounded-lg hover:bg-neon-bright shadow-neon transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          Download APK
        </a>
      </div>
    </article>
  );
}
