# StudyHub - Development Plan

## Product Vision

**StudyHub is a fully customizable study/focus companion that provides an immersive workspace environment through a widget-based interface.**

**Core Mission:** Enable users to create their perfect productivity environment by choosing and arranging the tools they need for focused work sessions.

**Key Principles:**
- **Customization First**: Every aspect should be user-configurable
- **Widget Ecosystem**: Modular tools that users can mix and match
- **Immersive Experience**: Full-screen environment that replaces traditional desktop workflows
- **Tool Variety**: Rich selection of productivity widgets to choose from

**Target User:** Anyone who needs focused work sessions - students, remote workers, freelancers, and knowledge workers who want a personalized productivity environment.

**Unique Value:** Unlike traditional productivity apps, StudyHub offers a spatial, customizable workspace where users build their ideal focus environment through widget selection and arrangement.

**Growth Vision:** Personal tool that demonstrates development capabilities with potential to scale into a larger productivity platform.

## Current State

### Working Features
- **Pomodoro Timer**: Configurable work/break sessions with audio notifications
- **Spotify Integration**: Embedded playlists with URL input
- **YouTube Integration**: Embedded videos with URL input  
- **Background System**: 3 dynamic backgrounds (2 static images, 1 video)
- **Draggable Widgets**: Desktop positioning with z-index management
- **Responsive Design**: Mobile stacked layout, desktop draggable layout
- **Settings System**: Timer configuration and volume control
- **State Management**: Zustand stores for positions, visibility, values, audio
- **Navigation**: Sidebar with widget toggles and settings dialogs

### Technical Debt
- **Type Safety**: Multiple `@ts-ignore` comments and `any` types throughout codebase
- **Code Organization**: Large components (SideNav ~377 lines) with mixed concerns
- **Memory Inefficiency**: All widgets rendered in DOM, hidden with CSS visibility
- **State Architecture**: Scattered across 5 separate Zustand stores
- **Component Props**: Loose typing, especially in DraggableWrapper
- **Business Logic**: Mixed with presentation logic, violates SOLID principles
- **Responsive Handling**: Duplicated layout logic in App.tsx

## Refactoring Plan

### Priority 1: Critical Issues
**1. Pomodoro Logic Cleanup**
- Extract timer business logic from component
- Apply SOLID principles - separate concerns
- Create proper state management for timer lifecycle
- Remove mixed session/timer logic

**2. Responsive Design System** 
- Implement unified responsive component system
- Single component with adaptive behavior based on screen size
- Eliminate duplicate mobile/desktop layout code
- Create responsive widget wrapper

**3. Component Props & Typing**
- Remove all `@ts-ignore` comments
- Replace `any` types with proper interfaces
- Define strict widget component interfaces
- Add proper prop validation

### Priority 2: Architecture for Extensibility
**4. Tab-like Widget System**
- Only render active widgets in DOM
- Implement proper mounting/unmounting lifecycle
- Create widget registry system
- Memory-efficient widget switching

**5. Unified State Management**
- Consolidate 5 separate stores into single unified store
- Organize state by widget modules within single store
- Implement proper state selectors for performance
- Add state persistence layer

**6. Component Organization**
- Break down large components (SideNav, App)
- Implement proper separation of concerns
- Create reusable component patterns
- Establish clear component hierarchy

### Priority 3: Development Experience
**7. File Structure Reorganization**
- Group related components logically
- Implement feature-based folder structure
- Separate business logic from UI components
- Create proper utility and hook organization

**8. TypeScript Experience Enhancement**
- Add strict TypeScript configuration
- Implement proper type inference
- Create shared type definitions
- Add development-time type checking

## Feature Development Phases

### Phase 1: Simple Widgets & Core Features
**New Widgets:**
- Notes widget (simple text area with auto-save)
- Todo list widget (add/check/delete items with persistence)

**Widget Improvements:**
- Enhanced Spotify widget (better UI, playlist management)
- Enhanced YouTube widget (playlist support, better controls)

**Core Features:**
- Light/dark theme system with user preference persistence
- Widget resizing functionality with snap-to-grid
- Save/load workspace configurations (local storage based)
- Widget position and size persistence

### Phase 2: User System & Backend Infrastructure
**Backend System:**
- User authentication and account management
- Database design for user profiles and workspace configurations
- API design for workspace CRUD operations
- Session management and security

**Cloud Storage:**
- Object store integration (S3 or UploadThing) for background images
- User-uploaded custom background support
- Image optimization and CDN integration
- Background asset management system

**User Profiles:**
- Multiple profile system per user account
- Profile-specific workspace configurations
- Profile switching interface
- Cloud-based workspace synchronization
- Migration from local storage to cloud storage

### Phase 3: Integrations & Payments
**Third-party Integrations:**
- Google Calendar integration (events, reminders)
- Outlook integration (calendar sync)
- Notion integration (notes, databases)
- Jira integration (task management, time tracking)

**Payment System:**
- Stripe integration for subscription management
- Tiered pricing model implementation
- Payment flow and billing management
- Premium features access control

### Phase 4: Advanced Collaboration (Optional)
**Collaboration Features:**
- Workspace sharing between users
- Real-time collaborative editing
- Group chat functionality
- Team workspace management

## Technical Decisions

### Architecture Choices
**Widget System**: Tab-like rendering system chosen over visibility toggles for memory efficiency and better performance with many widgets.

**Responsive Strategy**: Unified responsive system chosen over dual-layout approach to eliminate code duplication and improve maintainability.

**State Management**: Single unified Zustand store with modular widget sections chosen over multiple stores to improve state coordination and reduce complexity.

**Backend Stack**: To be determined based on Phase 2 requirements - likely Node.js/Express with PostgreSQL for relational data and S3/UploadThing for object storage.

**Authentication**: To be determined - considering NextAuth.js or Auth0 for Phase 2 implementation.

### Implementation Notes
- All refactoring must be completed before Phase 1 feature development
- Each phase should be fully functional before moving to the next
- Maintain backward compatibility during transitions where possible
- Focus on performance optimization at each phase