import { useState, useMemo } from 'react';
import { Category } from '../backend';
import ApkCard from '../components/ApkCard';
import SearchBar from '../components/SearchBar';
import CategoryTabs, { type CategoryFilter } from '../components/CategoryTabs';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch, Loader2 } from 'lucide-react';
import { useGetAllListings } from '../hooks/useQueries';

function ApkCardSkeleton() {
  return (
    <div className="bg-dark-card border border-neon-border rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="w-16 h-16 rounded-xl bg-dark-surface" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-dark-surface" />
          <Skeleton className="h-3 w-1/2 bg-dark-surface" />
        </div>
      </div>
      <Skeleton className="h-3 w-full bg-dark-surface" />
      <Skeleton className="h-3 w-5/6 bg-dark-surface" />
      <Skeleton className="h-10 w-full rounded-lg bg-dark-surface" />
    </div>
  );
}

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const { data: rawListings, isLoading, isError } = useGetAllListings();

  // Flatten [id, ApkMetadata][] into objects with id
  const listings = useMemo(() => {
    if (!rawListings) return [];
    return rawListings.map(([id, metadata]) => ({ id, ...metadata }));
  }, [rawListings]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'game' && listing.category === Category.game) ||
        (selectedCategory === 'app' && listing.category === Category.app);
      return matchesSearch && matchesCategory;
    });
  }, [listings, searchQuery, selectedCategory]);

  const counts = useMemo(() => ({
    all: listings.length,
    game: listings.filter((l) => l.category === Category.game).length,
    app: listings.filter((l) => l.category === Category.app).length,
  }), [listings]);

  return (
    <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-neon-text mb-1">
          Latest <span className="text-neon-green">Modded APKs</span>
        </h2>
        <p className="text-sm text-neon-dim">Download premium modded games and apps for free</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryTabs
          selected={selectedCategory}
          onChange={setSelectedCategory}
          counts={counts}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ApkCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Loader2 className="w-12 h-12 text-neon-red/50 mb-4" />
          <h3 className="text-lg font-bold text-neon-dim mb-2">Failed to Load APKs</h3>
          <p className="text-sm text-neon-dim/60">Please try refreshing the page.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredListings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageSearch className="w-16 h-16 text-neon-dim/30 mb-4" />
          <h3 className="text-lg font-bold text-neon-dim mb-2">
            {listings.length === 0 ? 'No APKs Yet' : 'No APKs Found'}
          </h3>
          <p className="text-sm text-neon-dim/60">
            {listings.length === 0
              ? 'Admin can upload APK listings using the Upload APK button.'
              : 'Try adjusting your search or category filter'}
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && filteredListings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((listing) => (
            <ApkCard key={listing.id} {...listing} />
          ))}
        </div>
      )}

      {/* Results count */}
      {!isLoading && !isError && filteredListings.length > 0 && (
        <p className="text-xs text-neon-dim/60 mt-6 text-center">
          Showing {filteredListings.length} of {listings.length} APKs
        </p>
      )}
    </section>
  );
}
