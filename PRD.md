# Japan Hotel Booking Platform

A sophisticated hotel booking platform showcasing premium accommodations across Japan with elegant design and seamless user experience.

**Experience Qualities**:
1. **Serene** - Clean, minimal interface that evokes the tranquility of Japanese hospitality
2. **Sophisticated** - Premium feel with attention to detail and refined interactions
3. **Intuitive** - Effortless booking flow that guides users naturally through their journey

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple interconnected features including search, filtering, booking, and user preferences with persistent state management

## Essential Features

### Hotel Search & Discovery
- **Functionality**: Search hotels by location, dates, and guest count with real-time filtering
- **Purpose**: Help users quickly find suitable accommodations matching their needs
- **Trigger**: User enters search criteria on homepage
- **Progression**: Search input → Results display → Filter refinement → Hotel selection
- **Success criteria**: Users can find relevant hotels within 3 clicks

### Hotel Detail View
- **Functionality**: Comprehensive hotel information with photo gallery, amenities, and room options
- **Purpose**: Provide complete information for informed booking decisions
- **Trigger**: User clicks on hotel from search results
- **Progression**: Hotel card click → Detail view → Room selection → Booking initiation
- **Success criteria**: Users can access all necessary booking information on one screen

### Booking Management
- **Functionality**: Create, view, and manage hotel reservations with confirmation details
- **Purpose**: Enable users to complete bookings and track their reservations
- **Trigger**: User selects room and proceeds to book
- **Progression**: Room selection → Guest details → Payment info → Confirmation → Booking history
- **Success criteria**: Users can complete bookings and access confirmation details

### Reviews & Ratings System
- **Functionality**: Multi-category rating system with detailed written reviews and photo uploads
- **Purpose**: Enable guests to share experiences and help future travelers make informed decisions
- **Trigger**: User completes stay and clicks "Write Review" or accesses review form from hotel details
- **Progression**: Review form → Category ratings → Written review → Photo upload → Submission → Display in hotel reviews
- **Success criteria**: Users can easily submit comprehensive reviews with photos and browse authentic guest feedback
- **Photo Upload Features**:
  - Support up to 5 photos per review with 5MB limit per image
  - Base64 encoding for storage with caption support
  - Responsive photo gallery with lightbox viewing
  - Drag & drop or click to upload interface
  - Real-time preview with caption editing

### Favorites System
- **Functionality**: Save preferred hotels for easy access and comparison
- **Purpose**: Allow users to curate and revisit hotels of interest
- **Trigger**: User clicks heart icon on hotel cards
- **Progression**: Heart icon click → Added to favorites → Accessible via favorites page
- **Success criteria**: Users can save and retrieve favorite hotels across sessions

## Edge Case Handling
- **Empty Search Results**: Display helpful suggestions and alternative locations
- **Invalid Date Selection**: Prevent past dates and guide users to valid date ranges
- **Unavailable Rooms**: Show alternative room types or suggest nearby hotels
- **Incomplete Booking**: Save draft booking details and allow users to resume
- **Network Errors**: Display retry options and offline-friendly messaging

## Design Direction
The design should evoke premium Japanese hospitality - sophisticated, serene, and meticulously crafted with clean lines and purposeful negative space that creates a sense of calm luxury.

## Color Selection
Analogous color scheme inspired by traditional Japanese aesthetics - warm earth tones that create harmony and sophistication.

- **Primary Color**: Deep Forest Green (oklch(0.35 0.08 140)) - Communicates nature, tranquility, and premium quality
- **Secondary Colors**: Warm Stone (oklch(0.85 0.02 85)) for backgrounds, Soft Charcoal (oklch(0.25 0.01 0)) for text
- **Accent Color**: Warm Copper (oklch(0.65 0.15 45)) - Attention-grabbing highlight for CTAs and important elements
- **Foreground/Background Pairings**:
  - Background (Warm White oklch(0.98 0.005 85)): Soft Charcoal text (oklch(0.25 0.01 0)) - Ratio 16.2:1 ✓
  - Card (Pure White oklch(1 0 0)): Soft Charcoal text (oklch(0.25 0.01 0)) - Ratio 17.8:1 ✓
  - Primary (Deep Forest oklch(0.35 0.08 140)): White text (oklch(1 0 0)) - Ratio 8.9:1 ✓
  - Accent (Warm Copper oklch(0.65 0.15 45)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓

## Font Selection
Typography should convey modern elegance with Japanese-inspired clarity - clean, readable sans-serif that feels both contemporary and timeless.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal letter spacing  
  - H3 (Hotel Names): Inter Medium/20px/normal letter spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line height
  - Caption (Details): Inter Regular/14px/normal letter spacing

## Animations
Subtle, purposeful animations that enhance usability without drawing attention to themselves - smooth transitions that guide the eye and provide satisfying feedback.

- **Purposeful Meaning**: Gentle fade-ins for content loading, smooth hover states for interactive elements, elegant page transitions
- **Hierarchy of Movement**: Hotel cards get priority animation attention, followed by navigation elements, with background elements remaining stable

## Component Selection
- **Components**: Card components for hotels, Dialog for booking flow, Calendar for date selection, Form components for search and booking, Badge for amenities, Button variants for different action levels
- **Customizations**: Custom hotel card layout, specialized date range picker, booking progress indicator
- **States**: Hover states with subtle elevation, active states with accent colors, loading states with skeleton placeholders, error states with constructive messaging
- **Icon Selection**: Phosphor icons for clean, consistent iconography - MapPin for location, Calendar for dates, Users for guests, Heart for favorites
- **Spacing**: Consistent 4px grid system using Tailwind's spacing scale (4, 8, 12, 16, 24, 32px)
- **Mobile**: Stack layout on mobile with full-width cards, collapsible filters, bottom-sheet modals for booking flow