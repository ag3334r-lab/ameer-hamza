import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ApkMetadata {
    name: string;
    description: string;
    downloadUrl: string;
    fileSize: bigint;
    version: string;
    modFeatures: Array<string>;
    category: Category;
    iconUrl: string;
}
export interface UserProfile {
    name: string;
}
export enum Category {
    app = "app",
    game = "game"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addListing(listing: ApkMetadata): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteListing(id: string): Promise<void>;
    getAllListings(): Promise<Array<[string, ApkMetadata]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getListing(id: string): Promise<ApkMetadata | null>;
    getListingsByCategory(category: Category): Promise<Array<[string, ApkMetadata]>>;
    getListingsByCategoryText(categoryText: string): Promise<Array<[string, ApkMetadata]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchListings(searchTerm: string): Promise<Array<[string, ApkMetadata]>>;
    updateListing(id: string, updatedListing: ApkMetadata): Promise<void>;
}
