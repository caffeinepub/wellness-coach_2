# Wellness Coach

## Current State
Wellness coach website with hero, services, about, testimonials, booking form, and footer. Backend stores booking requests with name, email, phone, preferredDate, message, serviceType, and submissionTime. No admin view exists.

## Requested Changes (Diff)

### Add
- Admin dashboard page at `/admin` route
- Password input to gate access (simple frontend password check)
- Table displaying all booking submissions: name, email, phone, service type, preferred date, message, submission time
- Booking count summary at the top

### Modify
- App.tsx to add the `/admin` route

### Remove
- Nothing

## Implementation Plan
1. Create AdminPage component that fetches getAllBookings() from backend
2. Add simple password gate (hardcoded password "wellness2024") stored in localStorage so you stay logged in
3. Display bookings in a clean table sorted newest first
4. Add /admin route to App.tsx
