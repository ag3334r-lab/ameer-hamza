# Specification

## Summary
**Goal:** Allow all authenticated (logged-in) users to submit new APK listings, not just admins.

**Planned changes:**
- Update backend access control so any authenticated user can call the add APK endpoint (unauthenticated callers remain rejected; admin-only delete/update operations stay restricted to admins).
- Update the frontend Header to show the "Upload APK" button and open the ApkUploadModal for any logged-in user, not just admins.

**User-visible outcome:** Any logged-in user can see the "Upload APK" button in the header, open the submission modal, and successfully submit a new APK listing. Delete and update controls remain admin-only.
