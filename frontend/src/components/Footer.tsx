import { Heart, Shield, Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'ameer-hamza-apk-mod');

  return (
    <footer className="border-t border-neon-border bg-dark-surface mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/ameer-hamza-logo.dim_128x128.png"
                alt="Logo"
                className="w-8 h-8 rounded-md object-cover"
              />
              <span className="font-black text-neon-green tracking-tight">AMEER HAMZA APK MOD</span>
            </div>
            <p className="text-sm text-neon-dim leading-relaxed">
              Your trusted source for premium modded APKs. Unlock unlimited features in your favorite games and apps.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-neon-green uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['All APKs', 'Games', 'Apps', 'Latest Mods'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-neon-dim hover:text-neon-green transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-neon-green/50" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-neon-green uppercase mb-4">Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-neon-dim">
                <Shield className="w-3.5 h-3.5 text-neon-green/60" />
                Safe & Verified APKs
              </li>
              <li className="flex items-center gap-2 text-sm text-neon-dim">
                <Zap className="w-3.5 h-3.5 text-neon-green/60" />
                Fast Downloads
              </li>
              <li className="flex items-center gap-2 text-sm text-neon-dim">
                <Heart className="w-3.5 h-3.5 text-neon-green/60" />
                Free Forever
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neon-dim">
            © {year} Ameer Hamza APK Mod. All rights reserved.
          </p>
          <p className="text-xs text-neon-dim flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 text-neon-green fill-neon-green" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:text-neon-bright transition-colors font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
