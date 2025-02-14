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

## Write Up

### Development Process

I approached this project with a focus on user experience. After initial
planning of the component architecture and user flows, I chose Next.js for its
server-side rendering capabilities (useful for fetching data from the API),
TypeScript for type safety, and Tailwind CSS for rapid UI development. The
combination of Framer Motion and Shadcn UI allowed for polished animations and
accessible components out of the box.

During development, I encountered several challenges. Keeping authentication
state was initially a concern, which I solved by implementing React Context for
state management. Managing scroll behavior when the sidebar was open required a
custom hook solution. Type safety across components was achieved by centralizing
types and implementing proper error handling.

I'm particularly proud of the clean component architecture, responsive design,
and keyboard accessibility implementation. The separation of concerns and
type-safe approach throughout the codebase ensures maintainability and
scalability.

### Future Extensions

With additional time, I would:

- Add user profiles through Clerk, linked to a database such as Supabase or
  PostgreSQL
- Add calendar integration
- Add a comprehensive testing suite
- Add proper analytics tracking to view event popularity

The UX could be enhanced with dark mode support, and a proper authentication
system would replace the current simple implementation.

### Additional Thoughts

While the current implementation provides a solid foundation, there's room for
improvement in some areas. Accessibility could be enhanced with better ARIA
labels and screen reader support and testing coverage could be expanded to
ensure long-term reliability.
