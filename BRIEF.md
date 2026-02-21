# TableForge — Project Brief

## What is TableForge?

TableForge is a mobile social app for board game enthusiasts. It allows users to discover, host, and join local board game events. Think of it as a Meetup specifically for tabletop gaming.

---

## Current State

The frontend is **fully complete and production-ready**. All screens, user flows, interactions, and the visual design have been finalised. The app is built as a single React JSX file (`TableForge_logo.jsx`) using Tailwind CSS utility classes.

**What exists and works:**
- User authentication UI (login + sign up)
- Home screen with event discovery, search, and filters (city, date, experience level)
- Event detail screen (view info, player profiles, ratings)
- Apply to join an event (with optional intro message)
- Host flow: create events, manage applicants (accept / reject), remove attendees
- My Events screen (hosting, attending, pending applications)
- Group chat per event with @mention support and notifications
- Notifications screen
- Profile screen (edit name, nickname, bio, avatar URL)
- Review & rating system (♠ spade icons, 1–5 scale)
- Full navigation with back history

**What does NOT exist yet:**
- Any backend, database, or server
- Real authentication (currently uses hardcoded dummy accounts in state)
- Data persistence (all state is in-memory and resets on page refresh)
- Real-time features (chat and notifications are local only)
- File/image storage
- Any deployment or app store configuration

---

## Tech Stack (Frontend — already built)

- **React** (functional components, hooks, Context API)
- **Tailwind CSS** (utility classes only — no custom CSS)
- **lucide-react** (icons)
- Single file: `TableForge_logo.jsx`

---

## Chosen Backend Stack

- **Supabase** — PostgreSQL database, Auth, real-time subscriptions, file storage
- **Supabase JS SDK** (`@supabase/supabase-js`)

---

## Color Theme & Branding

- **Primary accent:** `rose-500` (coral) — buttons, active states, highlights
- **Header / Host badge:** `stone-700` — warm charcoal brown
- **Backgrounds:** `slate-50` / `white`
- **Logo:** TableForge — retro slab serif, coral on transparent background, embedded as base64 PNG

---

## Data Model (derived from existing frontend state)

The following data shapes already exist in the React code. The Supabase schema must match these exactly so no frontend logic needs to change.

### `users`
```
id, email, password_hash, first_name, nickname, bio, image_url, created_at
```

### `events`
```
id, title, description, game_name, date, time, location, city, country,
max_players, current_players, experience (array), host_id (→ users),
status ('upcoming' | 'past'), created_at
```

### `event_attendees`
```
event_id (→ events), user_id (→ users), joined_at
```

### `applications`
```
id, event_id (→ events), user_id (→ users), status ('pending' | 'accepted' | 'rejected'),
message, created_at
```

### `messages`
```
id, event_id (→ events), user_id (→ users), message, is_system (bool), created_at
```

### `notifications`
```
id, user_id (→ users), message, type ('success' | 'error' | 'info'),
read (bool), event_id (→ events, nullable), destination (nullable), created_at
```

### `reviews`
```
id, reviewer_id (→ users), reviewed_user_id (→ users), event_id (→ events),
rating (1–5), comment, created_at
```

---

## Development Phases

Work through these phases **in order**. Do not begin the next phase until the current one is tested and committed.

| Phase | Description |
|-------|-------------|
| **1** | Supabase project setup, schema creation, Row Level Security policies |
| **2** | Auth — replace dummy login/signup with Supabase Auth |
| **3** | Data layer — replace all `useState` with Supabase queries, screen by screen |
| **4** | Real-time — upgrade chat and notifications to Supabase live subscriptions |
| **5** | Storage — profile image upload replacing the current URL text input |
| **6** | App store — React Native / Capacitor wrapper, env config, build pipeline |

---

## Absolute Constraints — Read Before Writing Any Code

> These rules are non-negotiable. Violating them requires an immediate revert.

1. **Do not change any UI.** No className values, no component structure, no layout changes, no colour changes, no icon swaps.
2. **Do not refactor components.** The component hierarchy, naming, and props must remain identical.
3. **Do not change any existing user-facing logic.** Filtering, application flow, chat @mentions, notification triggers — all must behave identically.
4. **Only add.** New files, new Supabase calls, new hooks — additive only.
5. **If a change touches the UI in any way, stop and ask before proceeding.**
6. **One phase at a time.** Complete, test, and commit before moving to the next.

---

## Workflow Rules

- Use **one task per session** — one phase per working session maximum
- **Commit to git after every phase** — always maintain a clean rollback point
- Maintain a **`PROGRESS.md`** file updated after every session — paste it at the start of each new session for continuity
- Write **.env.local** for all Supabase keys — never hardcode credentials
- All Supabase config goes in a dedicated `lib/supabase.js` file

---

## App Store Target

- **iOS** (App Store) and **Android** (Google Play)
- Preferred wrapper: **Capacitor** (preserves the React codebase as-is)
- Alternative: **React Native** rewrite (only if Capacitor proves insufficient)

---

## Reference Files

| File | Purpose |
|------|---------|
| `TableForge_logo.jsx` | Complete frontend — single source of truth for UI and data shapes |
| `BRIEF.md` | This document — project context and constraints |
| `PROGRESS.md` | Session-by-session log — update after every working session |
| `KILO_PROMPT.md` | Full briefing prompt for Kilo AI |
| `.env.local` | Supabase credentials (never commit) |
| `lib/supabase.js` | Supabase client initialisation |
