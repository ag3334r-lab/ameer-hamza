import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import { LogIn, LogOut, User, Zap, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApkUploadModal from './ApkUploadModal';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neon-border bg-dark-surface/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/generated/ameer-hamza-logo.dim_128x128.png"
                  alt="Ameer Hamza Logo"
                  className="w-10 h-10 rounded-lg object-cover ring-2 ring-neon-green/40"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-surface animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-neon-green leading-none">
                  AMEER HAMZA
                </span>
                <span className="text-xs font-semibold tracking-widest text-neon-dim uppercase leading-none mt-0.5">
                  APK MOD
                </span>
              </div>
            </div>

            {/* Nav Center */}
            <nav className="hidden md:flex items-center gap-1">
              <a
                href="#listings"
                className="px-4 py-2 text-sm font-semibold text-neon-dim hover:text-neon-green transition-colors rounded-md hover:bg-neon-green/10"
              >
                All APKs
              </a>
              <a
                href="#games"
                className="px-4 py-2 text-sm font-semibold text-neon-dim hover:text-neon-green transition-colors rounded-md hover:bg-neon-green/10"
              >
                Games
              </a>
              <a
                href="#apps"
                className="px-4 py-2 text-sm font-semibold text-neon-dim hover:text-neon-green transition-colors rounded-md hover:bg-neon-green/10"
              >
                Apps
              </a>
            </nav>

            {/* Auth + Actions */}
            <div className="flex items-center gap-3">
              {/* Upload APK button — available to all authenticated users */}
              {isAuthenticated && (
                <Button
                  onClick={() => setUploadModalOpen(true)}
                  size="sm"
                  className="bg-neon-green/10 border border-neon-green/40 text-neon-green hover:bg-neon-green/20 hover:border-neon-green/70 transition-all font-bold"
                >
                  <Upload className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">Upload APK</span>
                </Button>
              )}

              {isAuthenticated && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">
                  <User className="w-3.5 h-3.5 text-neon-green" />
                  <span className="text-xs font-semibold text-neon-green truncate max-w-[120px]">
                    {userProfile?.name || 'User'}
                  </span>
                </div>
              )}
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className={
                  isAuthenticated
                    ? 'bg-transparent border border-neon-border text-neon-dim hover:text-neon-green hover:border-neon-green/50 hover:bg-neon-green/5 transition-all'
                    : 'bg-neon-green text-dark-base font-bold hover:bg-neon-bright shadow-neon transition-all'
                }
                size="sm"
              >
                {isLoggingIn ? (
                  <>
                    <Zap className="w-4 h-4 mr-1.5 animate-spin" />
                    Logging in...
                  </>
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4 mr-1.5" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-1.5" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ApkUploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </>
  );
}
