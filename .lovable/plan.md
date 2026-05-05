## StationSense — Railway Station Facility Awareness System

A clean, map-driven web app that helps travellers see what's available at a station before they arrive: lounges, lockers, washrooms, seating — with live-feeling availability counts and an interactive Leaflet map.

> Note on stack: We're building this on Lovable's supported stack (TanStack Start + Lovable Cloud Postgres). It delivers the same features you described (auth, facilities API, feedback, dynamic crowd level) and deploys on Lovable hosting with no 404 issues — no separate Vercel/Express/MongoDB setup needed.

### Design system
Warm, earthy palette applied as semantic tokens:
- `#C08C6A` Lounge / primary accent
- `#D7B9A2` Locker
- `#EAD3BF` Washroom / soft surfaces
- `#A7A792` Seating
- `#6B6F5A` Secondary text / muted
- `#4E543F` Headings / deep accent

Rounded cards, soft shadows, generous spacing, mobile-responsive.

### Pages & routes
- `/` — Home: hero "Know Your Station Before You Wait", search bar, four feature cards (Facility Map, Availability, Pricing, Safety)
- `/login` — Name + Email + Phone form (validated with Zod), stored in DB, session in localStorage
- `/stations` — List of all stations with search
- `/station/:id` — Station detail: name, dynamic crowd level badge, four facility cards (Lounge / Locker / Washroom / Seating) each showing availability X/Y, price, distance, **Navigate** button + **Open Map** button
- `/station/:id/map` — Full-screen Leaflet map centered on station, colored markers per facility type, popups with name/availability/price/distance, **Navigate** mode draws a straight polyline from station → selected facility, Back button
- `/safety` — Emergency contacts, help desk info, feedback form (message + 1–5 star rating)

### Stations seeded
New Delhi (NDLS), Mumbai CST (CSMT), Howrah (HWH), Chennai Central (MAS), Bengaluru (SBC), Secunderabad (SC) — each with 4 facilities at realistic coordinates near the station.

### Availability & crowd level (data-driven)
Each facility row stores `total_capacity` and `available_units`. UI shows bold "X / Y" with a progress bar colored:
- Green when >60% available
- Orange 30–60%
- Red <30%
- "Availability unknown" fallback if null

Crowd level for a station is computed server-side from aggregated facility usage:
- usage = 1 − (Σ available / Σ capacity)
- >70% → **High** (red), 40–70% → **Medium** (orange), <40% → **Low** (green)

Availability auto-fluctuates: a server function on each station-page load nudges `available_units` by ±1–2 within bounds (timestamped, throttled to ~1 update per minute per facility) so numbers feel live.

### Map (Leaflet)
- `react-leaflet` + OpenStreetMap tiles, no API keys
- Markers colored by facility type using the palette above
- Popups: name, availability X/Y, price, distance
- Navigate mode: when arriving with `?facility=<id>`, highlight that marker, draw a straight `Polyline` station → facility, fit bounds to both
- Otherwise show all markers with default zoom

### Authentication
Simple custom form (per your spec): Name, Email, Phone — Zod-validated client + server. On submit, insert into `users` table and store `{ id, name, email, phone }` in localStorage as the session. A small header avatar shows the signed-in name; logout clears localStorage. Protected routes (station detail, map, safety feedback) redirect to `/login` if no session.

### Backend (Lovable Cloud / Postgres + server functions)
Tables:
- `stations` (id, name, code, city, lat, lng, created_at)
- `facilities` (id, station_id, type, name, total_capacity, available_units, price, distance_m, lat, lng, updated_at)
- `users` (id, name, email unique, phone, created_at) — RLS open insert, select-by-email
- `feedback` (id, user_id nullable, message, rating, created_at)

Server functions:
- `getStations()` — list + search
- `getStation(id)` — station + facilities + computed crowd level (with fluctuation tick)
- `getFacilities(stationId)` — list facilities
- `registerUser({name,email,phone})` — upsert and return user
- `submitFeedback({message, rating, userId?})`

### Technical notes
- TanStack Start file routes under `src/routes/` (no Vercel config needed; Lovable hosting handles deep links)
- `react-leaflet` + `leaflet` added as deps; Leaflet CSS imported in root
- Tailwind v4 tokens extended with the StationSense palette in `src/styles.css`
- All inputs validated with Zod on both client and server
- Loaders are thin and call `createServerFn`s; each route has `errorComponent` + `notFoundComponent`

### Out of scope
- No real-time GPS routing (straight line only, per spec)
- No Google/OAuth login
- No admin dashboard for editing facilities (seed + auto-fluctuation only)
