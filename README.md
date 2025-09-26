# SkillSwap MVP (React Native + Expo Router)

## Overview
SkillSwap is a peer-to-peer skill exchange app. This MVP demonstrates the core user flows: logging in, browsing skill offers, creating a new offer, and viewing a profile — all with a modern, responsive UI.

## Key Features
- 🔐 Authentication (demo-only)
  - Single combined Login/Signup screen
  - Animated yet accessible inputs and buttons
  - Theming support (light/dark)
- 🏠 Home Feed
  - Searchable list of skill offers (dummy data)
  - Tappable cards with quick details
- ➕ Create Post
  - Minimal form (title, category, description)
  - Lightweight category chips
  - Logs submission and navigates back to Home (assignment behavior)
- 👤 Profile
  - Shows demo user info, skills offered/wanted, simple stats
  - Logout with confirmation

## Demo Credentials
- Email: `test@student.com`
- Password: `12345`

Log in with the credentials above to load the demo profile and access the app.

## Tech Stack
- React Native, Expo, Expo Router
- React Context (Auth)
- Reanimated-based UI components (selectively used)
- TypeScript-friendly code style

## Project Structure
```
app/
├── _layout.tsx         # Root layout with providers
├── index.tsx           # Redirects to login or tabs based on auth
├── login.tsx           # Login/Signup combined screen
└── (tabs)/
    ├── _layout.tsx     # Bottom tab navigator
    ├── index.tsx       # Home feed
    ├── explore.tsx     # Create Post
    └── profile.tsx     # Profile
components/             # Reusable UI components
contexts/               # App contexts (e.g., AuthContext)
constants/              # Theme, spacing, colors
hooks/                  # Custom hooks
```

## Getting Started
1) Install dependencies
```bash
npm install
```

2) Start the development server
```bash
npm start
```

3) Run on device/simulator
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Or scan the QR code with Expo Go

## How To Use
1) Open the app and log in with the demo credentials above.
2) Browse the Home feed and search for offers.
3) Tap ➕ Create to add a new skill post. On submit, the data is logged and you’re navigated back to Home (per assignment requirements).
4) View Profile to see demo user details and logout.

## Notes & Limitations
- No backend — all data is local and non-persistent.
- Create Post logs to console instead of saving to a database.
- Animations are kept subtle for performance and clarity.

## Troubleshooting
- Profile shows blank: ensure you log in using `test@student.com` / `12345`.
- Metro not starting: clear cache with `npx expo start -c`.
- Stuck on old code: try restarting Expo Go and your emulator/device.

## Roadmap
- Real authentication and backend API
- Persistent database (offers, sessions, reviews)
- Booking flow and notifications
- Advanced search and filters
- Reviews and ratings

---
This MVP focuses on clean UX and a maintainable structure to accelerate future backend integration.
