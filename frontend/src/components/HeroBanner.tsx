import { Download, Zap, Shield } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="Ameer Hamza APK Mod"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-base/90 via-dark-base/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-green/20 border border-neon-green/40 text-neon-green text-xs font-bold tracking-wider uppercase">
                  <Zap className="w-3 h-3" />
                  Premium Mods
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
                Ameer Hamza{' '}
                <span className="text-neon-green drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">
                  APK Mod
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neon-dim mb-5 leading-relaxed">
                Download the latest modded APKs for games and apps. Unlimited features, unlocked content, and more — all for free.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-xs text-neon-dim">
                  <Download className="w-3.5 h-3.5 text-neon-green" />
                  <span>Free Downloads</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neon-dim">
                  <Shield className="w-3.5 h-3.5 text-neon-green" />
                  <span>Verified Safe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neon-dim">
                  <Zap className="w-3.5 h-3.5 text-neon-green" />
                  <span>Latest Versions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
