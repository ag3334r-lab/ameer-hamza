import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ApkMetadata } from '../backend';

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllListings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Array<[string, ApkMetadata]>>({
    queryKey: ['apkListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllListings();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: ApkMetadata) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addListing(listing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apkListings'] });
    },
  });
}

export function useUpdateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, listing }: { id: string; listing: ApkMetadata }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateListing(id, listing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apkListings'] });
    },
  });
}

export function useDeleteListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteListing(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apkListings'] });
    },
  });
}
