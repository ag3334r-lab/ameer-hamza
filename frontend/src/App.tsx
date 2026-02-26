import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useGetCallerUserProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import ProfileSetupModal from './components/ProfileSetupModal';
import ListingsPage from './pages/ListingsPage';
import { Toaster } from '@/components/ui/sonner';

function AppContent() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen flex flex-col bg-dark-base text-neon-text">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <ListingsPage />
      </main>
      <Footer />
      {showProfileSetup && <ProfileSetupModal />}
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: 'bg-dark-card border border-neon-border text-neon-text',
            title: 'text-neon-text font-bold',
            description: 'text-neon-dim',
            success: 'border-neon-green/40',
            error: 'border-neon-red/40',
          },
        }}
      />
    </div>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
