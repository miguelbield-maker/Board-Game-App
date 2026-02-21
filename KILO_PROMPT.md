# KILO_PROMPT.md — Full Briefing for Kilo AI

Paste this entire prompt at the start of your first Kilo session in VS Code.

---

## Prompt

You are continuing development on **TableForge**, a mobile board game social app. The frontend is fully complete and must not be changed. Your job is to build the backend using Supabase, then prepare the app for App Store and Google Play launch.

---

### Project Overview

TableForge lets board game enthusiasts discover, host, and join local game events. Users can apply to events, get accepted by hosts, chat with their group, review other players, and manage their profile.

The entire frontend is built in a single React file: `TableForge_logo.jsx`. It uses React Context + useState for all state management. All data currently lives in memory and resets on refresh. There is no backend, no auth, and no persistence of any kind yet.

Your job is to wire up a real backend without touching the frontend.

---

### Tech Stack

**Frontend (already built — do not modify):**
- React with hooks and Context API
- Tailwind CSS (utility classes only)
- lucide-react icons
- Single file: `TableForge_logo.jsx`

**Backend (to be built):**
- Supabase (PostgreSQL, Auth, Realtime, Storage)
- `@supabase/supabase-js` SDK
- Supabase client initialised in `lib/supabase.js`
- All credentials in `.env.local` — never hardcoded

---

### The Golden Rule

> **Do not change any UI, className, component structure, layout, colour, or user-facing logic. Only add new files and data-fetching logic. If any change touches the frontend in any way, stop and ask me before proceeding.**

This rule overrides everything. The UX is signed off and final.

---

### Database Schema

Create these tables in Supabase. The shapes mirror the existing React state exactly.

```sql
-- Users (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users primary key,
  email text not null,
  first_name text,
  nickname text unique,
  bio text,
  image_url text,
  created_at timestamptz default now()
);

-- Events
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  game_name text not null,
  date date not null,
  time time not null,
  location text,
  city text,
  country text,
  max_players int not null,
  experience text[] not null,
  host_id uuid references public.users not null,
  status text default 'upcoming',
  created_at timestamptz default now()
);

-- Event Attendees
create table public.event_attendees (
  event_id uuid references public.events on delete cascade,
  user_id uuid references public.users on delete cascade,
  joined_at timestamptz default now(),
  primary key (event_id, user_id)
);

-- Applications
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events on delete cascade,
  user_id uuid references public.users on delete cascade,
  status text default 'pending',
  message text,
  created_at timestamptz default now(),
  unique (event_id, user_id)
);

-- Messages (group chat)
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events on delete cascade,
  user_id uuid references public.users,
  message text not null,
  is_system boolean default false,
  created_at timestamptz default now()
);

-- Notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users on delete cascade,
  message text not null,
  type text not null,
  read boolean default false,
  event_id uuid references public.events on delete set null,
  destination text,
  created_at timestamptz default now()
);

-- Reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid references public.users,
  reviewed_user_id uuid references public.users,
  event_id uuid references public.events,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique (reviewer_id, reviewed_user_id, event_id)
);
```

---

### Row Level Security Policies

Enable RLS on every table. General rules:

- **users** — anyone can read; only the owner can update their own row
- **events** — anyone authenticated can read; only the host can update or delete
- **event_attendees** — attendees can read their own events; host can insert/delete
- **applications** — applicant can read/insert their own; host can read and update status
- **messages** — only attendees of the event can read or insert
- **notifications** — users can only read and update their own
- **reviews** — anyone authenticated can read; reviewer can insert once per event per person

Write all RLS policies before moving on.

---

### Phase Plan

Work through these phases strictly in order. Complete, test, and commit to git before starting the next phase. Update `PROGRESS.md` at the end of every session.

---

#### Phase 1 — Supabase Setup & Schema

- Create `lib/supabase.js` with Supabase client init using env vars
- Create `.env.local` template (with placeholder values, no real keys)
- Create all tables from the schema above
- Enable RLS and write all policies
- Seed a few test rows matching the existing dummy data in `TableForge_logo.jsx`

**Deliverable:** Supabase project is live with schema, RLS, and seed data. `lib/supabase.js` exists.

---

#### Phase 2 — Authentication

Replace the dummy login/signup in `TableForge_logo.jsx` with real Supabase Auth.

Specifically:
- `handleSubmit` in `AuthScreen` should call `supabase.auth.signInWithPassword()` for login and `supabase.auth.signUp()` for registration
- On signup, also insert a row into `public.users` with the profile fields
- Use `supabase.auth.getSession()` and `supabase.auth.onAuthStateChange()` to manage the `currentUser` in Context
- Logout button in `ProfileScreen` should call `supabase.auth.signOut()`
- Error messages must still display in the same UI location as before

**Do not change any UI. Do not change any classNames.**

**Deliverable:** Login, signup, and logout work against real Supabase Auth. Session persists on refresh.

---

#### Phase 3 — Data Layer (screen by screen)

Replace all in-memory useState data with real Supabase queries. Work through one screen at a time in this order:

1. **Events** — fetch all upcoming events on HomeScreen; create event in CreateEventScreen
2. **Event Detail** — fetch single event with attendees, host profile, and applicant list
3. **Applications** — submit application; host accepts/rejects (updates status + moves to attendees)
4. **My Events** — fetch hosted events, attending events, pending applications for current user
5. **Notifications** — fetch and mark-as-read from notifications table
6. **Reviews** — submit reviews; fetch average rating per user

For each screen:
- Add a loading state (a simple spinner or skeleton is fine — do not change the overall screen layout)
- Add basic error handling (console.error is acceptable for now)
- Ensure the data shape returned from Supabase matches what the component already expects

**Deliverable:** All screens read from and write to Supabase. No more hardcoded dummy data.

---

#### Phase 4 — Real-time (Chat + Notifications)

Upgrade the two features that need live updates:

**Group Chat (`EventChatScreen`):**
- Subscribe to `messages` table filtered by `event_id` using `supabase.channel()`
- New messages from any attendee appear instantly without refresh
- Unsubscribe when the component unmounts

**Notifications:**
- Subscribe to the `notifications` table filtered by `user_id`
- The bell badge count in the header updates in real time when new notifications arrive

**Deliverable:** Chat is live. Notification badge updates without refresh.

---

#### Phase 5 — Profile Image Storage

Replace the current "Profile Image URL" text input with a real file upload:

- Add an image picker button to `ProfileScreen` (keep it in the same location as the current input field)
- Upload the selected file to a Supabase Storage bucket called `avatars`
- Store the returned public URL in `public.users.image_url`
- Display the uploaded image everywhere a user's avatar appears (already handled by existing `img` tags)

**Do not change the layout of the profile screen.**

**Deliverable:** Users can upload a real profile photo. It persists and appears throughout the app.

---

#### Phase 6 — App Store Preparation

Wrap the React app for native deployment using **Capacitor**.

Steps:
- Install Capacitor and configure `capacitor.config.ts`
- Add iOS and Android platforms (`npx cap add ios`, `npx cap add android`)
- Configure app metadata: name ("TableForge"), bundle ID, icons, splash screen
- Set up environment-specific Supabase URLs for dev vs production
- Configure deep linking for auth redirects
- Test on iOS simulator and Android emulator
- Prepare App Store and Google Play store listings checklist

**Deliverable:** App builds and runs natively on iOS and Android. Ready to submit to stores.

---

### Session Workflow Rules

Follow these rules every session without exception:

1. **Read `BRIEF.md` and `PROGRESS.md` before writing any code**
2. **One phase per session maximum** — do not bleed into the next phase
3. **Commit to git after completing a phase** — use clear commit messages like `feat: phase 2 - supabase auth`
4. **Update `PROGRESS.md`** at the end of every session with: what was completed, what was tested, what is next, and any blockers or decisions made
5. **Never hardcode credentials** — always use `process.env` or `import.meta.env`
6. **If you are unsure whether a change affects the UI, stop and ask**

---

### PROGRESS.md Template

Create this file now and keep it updated:

```markdown
# TableForge — Progress Log

## Status
Current phase: [Phase number and name]
Last updated: [Date]

## Completed
- [ ] Phase 1 — Schema & Setup
- [ ] Phase 2 — Auth
- [ ] Phase 3 — Data Layer
- [ ] Phase 4 — Real-time
- [ ] Phase 5 — Storage
- [ ] Phase 6 — App Store

## Session Log

### [Date]
**Phase:** X
**Completed:**
- 

**Tested:**
- 

**Next session:**
- 

**Decisions / notes:**
- 
```

---

### Where to Start

Begin with **Phase 1**:

1. Create `lib/supabase.js`
2. Create `.env.local` with placeholder keys
3. Run the full schema SQL in Supabase dashboard
4. Enable RLS and write all policies
5. Seed test data matching the dummy users and events in `TableForge_logo.jsx`
6. Confirm the Supabase project is reachable from the app
7. Commit with message: `feat: phase 1 - supabase schema and setup`
8. Update `PROGRESS.md`

Do not touch `TableForge_logo.jsx` during Phase 1.
