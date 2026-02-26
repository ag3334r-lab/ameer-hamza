import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type Category = {
    #game;
    #app;
  };

  public type ApkMetadata = {
    name : Text;
    category : Category;
    description : Text;
    modFeatures : [Text];
    version : Text;
    fileSize : Nat;
    downloadUrl : Text;
    iconUrl : Text;
  };

  let listings = Map.empty<Text, ApkMetadata>();

  // Any authenticated user can add APK listings to the curated store
  public shared ({ caller }) func addListing(listing : ApkMetadata) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit new listings");
    };

    let id = listing.name.concat(listing.version);
    listings.add(id, listing);
    id;
  };

  // Only admins can update existing listings
  public shared ({ caller }) func updateListing(id : Text, updatedListing : ApkMetadata) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update listings");
    };

    switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing could not be found") };
      case (_) {
        listings.add(id, updatedListing);
      };
    };
  };

  // Only admins can delete listings
  public shared ({ caller }) func deleteListing(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete listings");
    };

    switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing could not be found") };
      case (_) {
        listings.remove(id);
      };
    };
  };

  // Anyone (including guests) can view APK listings
  public query func getListing(id : Text) : async ?ApkMetadata {
    listings.get(id);
  };

  // Public query endpoint to fetch all APK listings
  public query func getAllListings() : async [(Text, ApkMetadata)] {
    listings.toArray();
  };

  // Query APK listings by category (games or apps)
  public query func getListingsByCategory(category : Category) : async [(Text, ApkMetadata)] {
    let filtered = listings.filter(
      func(_id, listing) {
        listing.category == category;
      }
    );
    filtered.toArray();
  };

  // Query APK listings by category text (games or apps)
  public query func getListingsByCategoryText(categoryText : Text) : async [(Text, ApkMetadata)] {
    let filtered = listings.filter(
      func(_id, listing) {
        switch (categoryText, listing.category) {
          case ("apps", #app) { true };
          case ("games", #game) { true };
          case ("Apps", #app) { true };
          case ("Games", #game) { true };
          case ("APP", #app) { true };
          case ("GAME", #game) { true };
          case (_, _) { false };
        };
      }
    );
    filtered.toArray();
  };

  // Query APK listings by name (partial search)
  public query func searchListings(searchTerm : Text) : async [(Text, ApkMetadata)] {
    let lowerCaseTerm = toLowerCase(searchTerm);
    let filtered = listings.filter(
      func(_id, listing) {
        toLowerCase(listing.name).contains(#text lowerCaseTerm);
      }
    );
    filtered.toArray();
  };

  // Helper function to convert Text to lowercase
  func toLowerCase(s : Text) : Text {
    let chars = s.toArray().map(
      func(c) {
        if (c >= 'A' and c <= 'Z') {
          Char.fromNat32(c.toNat32() + 32);
        } else {
          c;
        };
      }
    );
    Text.fromArray(chars);
  };
};
