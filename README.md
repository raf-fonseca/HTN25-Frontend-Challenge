# Hack The North Frontend Challenge

A web application for managing and viewing Hack The North events. Built with
Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 Real-time event search
- 🏷️ Event filtering by type (Workshops, Activities, Tech Talks)
- 🔒 Authentication system for private events
- 📱 Responsive design
- ⌨️ Keyboard shortcuts for better navigation
- 🎨 Smooth animations and transitions

## Project Structure

```
├── app/
│   ├── types.ts           # Shared TypeScript types and constants
│   └── page.tsx           # Main application page
├── components/
│   ├── EventCard.tsx      # Individual event display card
│   ├── EventSidebar.tsx   # Detailed event view sidebar
│   ├── GridLayout.tsx     # Main event grid with filtering
│   ├── LoginButton.tsx    # Authentication button
│   ├── LoginModal.tsx     # Authentication modal
│   ├── Navbar.tsx         # Top navigation with search
│   └── RelatedEvents.tsx  # Related events section
├── contexts/
│   ├── AuthContext.tsx    # Authentication state management
│   └── SearchContext.tsx  # Search functionality state
├── hooks/
│   └── usePreventScroll.ts # Custom hook for scroll management
└── lib/
    ├── api.ts             # API integration
    └── utils.ts           # Shared utility functions
```

## Key Components

### EventCard

Displays individual event information in a card format. Shows:

- Event type with color coding
- Public/Private status
- Date and time
- Speakers (if any)
- Login prompt for private events

### GridLayout

Main content area that:

- Manages event filtering
- Handles search functionality
- Controls event grid display
- Manages sidebar state

### Navbar

Top navigation bar with:

- Search functionality (⌘K shortcut)
- Authentication controls
- Responsive design

### EventSidebar

Detailed event view that shows:

- Complete event information
- Related events
- External links
- Private content (requires authentication)

## Authentication

The platform uses a simple authentication system:

- Username: "hacker"
- Password: "htn2025"
- Protected routes for private events
- Persistent login state

## State Management

Uses React Context for global state:

- `AuthContext`: Manages user authentication state
- `SearchContext`: Handles search functionality

## API Integration

Fetches event data from the Hack The North API:

- Endpoint: `https://api.hackthenorth.com/v3/events`
- Server-side data fetching
- Type-safe response handling

## User Interface Features

1. Search:

   - Real-time filtering
   - Keyboard shortcut (⌘K)
   - ESC to clear and close

2. Event Filtering:

   - Filter by event type
   - Animated transitions
   - Maintains state

3. Responsive Design:
   - Mobile-friendly layout
   - Adaptive grid system
   - Optimized sidebar

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)
