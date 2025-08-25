# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StudyHub is a fully customizable study/focus companion that provides an immersive workspace environment through a widget-based interface. The app allows users to create their perfect productivity environment by choosing and arranging widgets for focused work sessions.

**Current State**: The app has working Pomodoro timer, Spotify/YouTube integration, dynamic backgrounds, and draggable widgets. However, it requires significant refactoring before new feature development.

**Development Priority**: All refactoring must be completed before Phase 1 feature development begins. See README.md for complete development plan.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally

## Architecture Overview

### State Management (Needs Refactoring)
The app currently uses **Zustand** with separate stores that need consolidation:
- `positionStore.ts` - Manages draggable widget positions (x,y coordinates) 
- `visibilityStore.ts` - Controls widget visibility toggles
- `backgroundStore.tsx` - Handles background selection and rendering
- `valuesStore.ts` - Stores Pomodoro timer values (work/break durations)
- `audioStore.ts` - Manages audio settings and volume

**Refactoring Goal**: Consolidate into single unified store with modular widget sections.

### Component Structure
- `App.tsx` - Main component with responsive layout logic
- `DraggableWrapper/dwrapper.tsx` - Wraps components to make them draggable (desktop only)
- `pomodoro/pomodoro.tsx` - Pomodoro timer with configurable work/break periods
- `spotify/spotify.tsx` - Spotify integration widget
- `youtube/Youtube.tsx` - YouTube embed widget
- `Navbar/SideNav.tsx` - Side navigation for settings and controls
- `backgrounds/` - Dynamic background components (CozyShop, MountainStars, MountainSunset)

### Responsive Design (Needs Refactoring)
The app currently uses a dual-layout approach that needs unification:
- **Desktop (≥768px)**: Widgets are draggable and positioned freely using `react-draggable`
- **Mobile (<768px)**: Widgets stack vertically in a centered layout
- Uses `useMediaQuery` hook to detect screen size and switch layouts

**Refactoring Goal**: Implement unified responsive system with single components that adapt behavior based on screen size.

### Styling & UI
- **Tailwind CSS** for styling with custom configuration
- **Radix UI** components (Dialog, Slider, Slot) for accessible UI primitives  
- **Lucide React** and **React Icons** for iconography
- **shadcn/ui** components in `components/ui/` directory
- Path alias `@/*` maps to `./src/*` for clean imports

### Key Patterns & Issues
1. **State Persistence**: Widget positions are stored in Zustand stores
2. **Z-Index Management**: Global z-index counter in DWrapper for layering
3. **Memory Inefficiency**: All widgets rendered in DOM, hidden with CSS visibility (needs tab-like system)
4. **Asset Management**: Static assets in `src/assets/` with video/image backgrounds
5. **Type Safety Issues**: Multiple `@ts-ignore` comments and `any` types throughout codebase

## File Organization
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── DraggableWrapper/ # Draggable functionality
│   ├── backgrounds/    # Background components
│   └── [widgets]/      # Feature components (pomodoro, spotify, youtube)
├── Store/              # Zustand state stores
├── Hooks/              # Custom React hooks  
├── assets/             # Static assets (images, videos, audio)
└── lib/                # Utility functions
```

## Current Refactoring Priorities

**MUST complete before new features:**

1. **Pomodoro Logic Cleanup** - Extract business logic, apply SOLID principles
2. **Responsive Design System** - Unified component system instead of dual layouts  
3. **Component Props & Typing** - Remove `@ts-ignore`, add proper interfaces
4. **Tab-like Widget System** - Only render active widgets for memory efficiency
5. **Unified State Management** - Consolidate 5 stores into single modular store

## Development Notes
- TypeScript is configured with strict mode and path aliases
- ESLint is set up for React + TypeScript with unused variable detection
- Vite handles bundling with React plugin and path resolution
- No existing test framework is configured
- **Important**: Always run `npm run lint` before committing changes