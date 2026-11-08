---
name: Lost in Space HUD
colors:
  surface: '#10131f'
  surface-dim: '#10131f'
  surface-bright: '#363846'
  surface-container-lowest: '#0b0d1a'
  surface-container-low: '#191b28'
  surface-container: '#1d1f2c'
  surface-container-high: '#272937'
  surface-container-highest: '#323442'
  on-surface: '#e1e1f3'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e1f3'
  inverse-on-surface: '#2d303d'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#ffd799'
  on-secondary: '#432c00'
  secondary-container: '#feb300'
  on-secondary-container: '#6a4800'
  tertiary: '#fff5f5'
  on-tertiary: '#670020'
  tertiary-container: '#ffcfd3'
  on-tertiary-container: '#c00043'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffdeac'
  secondary-fixed-dim: '#ffba38'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2ba'
  on-tertiary-fixed: '#400011'
  on-tertiary-fixed-variant: '#910030'
  background: '#10131f'
  on-background: '#e1e1f3'
  surface-variant: '#323442'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  title-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.16em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes a premium, diegetic space exploration interface engineered for deep-cosmos survival and navigation. It merges military-grade mission control telemetry with atmospheric cybernetic HUD graphics, balancing analytical precision with cinematic sci-fi immersion.

### Personality & Tone
- **Atmospheric & Deep:** Anchored in the chilling void of deep space with luminous, calibrated readouts.
- **Analytical & Precise:** Zero decorative clutter; every graphic token acts as flight telemetry, sensor data, or environmental feedback.
- **High-Stakes & Mission-Critical:** Instant clarity under tension, utilizing crisp neon indicators and unmistakable warning states.

### Target Audience
Exploration gamers, sci-fi enthusiasts, and flight sim operators demanding tactile controls, rapid data parsing, and immersive holographic feedback across desktop displays and responsive mobile touch consoles.

### Visual Aesthetic
Cybernetic HUD Glassmorphism: Translucent dark-matter panels, hairline holographic borders, micro-grid targeting reticles, and tactical neon cyan instrumentation over abyssal voids.

## Colors
The color hierarchy simulates illuminated vacuum glass displays projecting over deep cosmos starfields.

### Palette Architecture
- **Primary (`#00f2fe` - Cyber Cyan):** Primary system telemetry, active targeting reticles, standard ship status, and primary interactive affordances. Supported by sub-glow cyan (`#4facfe`).
- **Secondary (`#ffb300` - Orbital Amber):** Warning tiers, planetary scan data, propulsion drives, and power allocation channels. Transitions to `#ff8c00` on overcharge.
- **Tertiary (`#ff3366` - Crimson Alert):** Critical hull breaches, weapon lock notifications, atmospheric decompression hazards, and destructive cancellation triggers.
- **Neutral Void Foundations:**
  - Base Cosmic Void: `#060814` (root viewport canvas)
  - Pressurized Bay: `#0b0f24` (background container tier)
  - Bulkhead Surface: `#131b3e` (elevated panels and navigation card backgrounds)
  - Sub-neutral Telemetry: `#8ca0ba` (secondary readouts and coordinate grids)
  - Bright HUD Neutral: `#e6f4ff` (primary legible typography and critical readouts)

Use additive color blending (`mix-blend-mode: screen`) sparingly for glowing holograms and sensor trails.

## Typography
The system enforces strict functional segregation between navigational display data and narrative text.

### Font Roles
- **Headlines & HUD Telemetry (`Space Grotesk`):** Renders section headers, sector identifiers, coordinates, instrumentation titles, and system alert banners. Labels use uppercase styling with wide tracking (`0.08em` to `0.16em`) to echo avionics instrumentation panels.
- **Narrative & Mission Logs (`Inter`):** Handles dense logs, inventory descriptions, mission briefing dialogues, and ship manifest tables. Employs tabular numeric features (`tnum`, `zero`) for dynamic real-time readouts and coordinates.

### Scaling & Legibility
All mobile headline styles fold downward past the 768px threshold to preserve display real estate for tactical viewports. Text rendered directly onto the cosmic canvas must incorporate micro-drop shadows (`rgba(6, 8, 20, 0.9)`) to ensure high contrast against celestial assets.

## Layout & Spacing
The layout leverages a disciplined cockpit modularity: outer HUD instrumentation hugs screen perimeters, clearing the center quadrant for deep-space flight navigation.

### Layout Grid Architecture
- **Desktop (1024px+):** 12-column layout with 24px (`gutter-desktop`) gutters and 48px (`margin-desktop`) outer padding. Modular HUD docks lock to the left (flight telemetry), right (sensors/cargo), and bottom (propulsion/thrusters).
- **Tablet (768px - 1023px):** 8-column layout with 16px (`gutter`) gutters and 32px (`margin-tablet`) outer margins. Telemetry panels dock into collapsible side trays.
- **Mobile (< 768px):** 4-column fluid frame with 16px (`margin`) margins. Corner anchors hold vital telemetry; dynamic thumb zones manage responsive touch-joystick clusters.

### Spatial Rhythm
Internal element spacing adheres strictly to a 4px base modular scale (`0.25rem`). Component clusters use `space-xs` and `space-sm` for compact avionics readouts, while mission-critical action clusters utilize `space-md` through `space-xl` to prevent input collisions.

## Elevation & Depth
Elevation is conveyed through volumetric glass refraction, luminescent edge conduits, and spatial atmospheric depth rather than standard diffuse drop shadows.

### Atmospheric HUD Depth Levels
- **Layer 0 (Cosmic Deep):** Background space view (`#060814`). Raw visual render layer; stars, nebula gas, and celestial bodies.
- **Layer 1 (Sub-Panel Instrumentation):** Semi-opaque dark-matter panels (`#0b0f24` at 65% opacity) with `backdrop-filter: blur(16px)` and an ambient hairline border (`1px solid rgba(0, 242, 254, 0.15)`).
- **Layer 2 (Active Holographic Windows):** Foreground telemetry containers (`#131b3e` at 80% opacity) with `backdrop-filter: blur(24px)`, framed by structural cyan rim-lighting (`1px solid rgba(0, 242, 254, 0.4)`) and a delicate neon perimeter cast (`box-shadow: 0 0 15px rgba(0, 242, 254, 0.15)`).
- **Layer 3 (Tactical Overlays & Reticles):** Projective floating layers with transparent backings, acute 100% neon border lines (`#00f2fe`), corner targeting brackets, and radial cyan back-glows (`box-shadow: 0 0 24px rgba(0, 242, 254, 0.3)`).
- **Layer 4 (Critical Threat Alert):** Crimson state modals (`#ff3366` accentuation) with high-intensity perimeter pulsing (`box-shadow: 0 0 30px rgba(255, 51, 102, 0.4)`).

## Shapes
Geometry is utilitarian, industrial, and high-tech. The core roundedness is locked at `1` (`0.25rem` base radius), delivering crisp, near-square corners reminiscent of spaceborne consoles, tactical displays, and reinforced flight panels.

### Structural Chamfers & Corner Cutouts
Key telemetry housings employ a 45-degree cybernetic chamfer (clipped corner) style via CSS `clip-path: polygon(...)` for top-left and bottom-right edges (cut depth: `8px`). This breaks standard rectangular ergonomics and reinforces diegetic military-hardware styling. Small inputs, tags, and chips keep micro-rounded corners (`0.25rem`) to maintain UI accessibility and clean border-rendering performance.

## Components

### Tactical Action Buttons
- **Primary Thrust/Fire:** Backed with semi-transparent cyan (`rgba(0, 242, 254, 0.12)`), framed with a 1px solid `#00f2fe` border. Label in uppercase Space Grotesk (`label-lg`) with `#00f2fe` text. On hover/active, transitions to solid `#00f2fe` with `#060814` text and an outer glow (`0 0 20px rgba(0, 242, 254, 0.5)`). Corner brackets extend 4px past edges.
- **Secondary / Orbital:** Amber outline (`#ffb300`), dark amber fill (`rgba(255, 179, 0, 0.1)`). Used for hyperspace jumps and planetary scans.
- **Destructive / Abort:** Crimson outline (`#ff3366`), pulsing crimson border glow.

### Telemetry Dials & Gauges
- Circular and arc gauges rendered with precision SVG curves. Inactive tracks: `rgba(140, 160, 186, 0.15)`; active tracks: linear gradient from `#4facfe` to `#00f2fe`. Centered values use tabular Inter numerals with miniature Space Grotesk measurement units stacked below.

### Holographic Cards & Cockpit Panels
- Framed in deep space glass (`#0b0f24` at 70% opacity, 20px blur) with 1px top-edge cyan highlighting (`rgba(0, 242, 254, 0.45)`) and subtle chamfered corners. Header bars feature micro-status indicators (e.g., green dot for online, flashing amber for degraded).

### Chips & Sensor Tags
- Height: 24px. Padding: 0 8px. Typography: Space Grotesk (`label-sm`).
- Border: 1px solid `rgba(0, 242, 254, 0.3)`. Background: `rgba(6, 8, 20, 0.6)`. Used for atmospheric composition, oxygen levels, and orbital velocity vectors.

### Mission Control Switches & Radios
- Checkboxes and toggles render as mechanical rectangular triggers. Checked state displays a glowing cyan core (`#00f2fe`) with inner crosshairs. Radio indicators utilize concentric targeting rings.

### Inputs & Sensor Fields
- Background: `rgba(11, 15, 36, 0.8)`. Bottom-only border or full hairline perimeter in `rgba(140, 160, 186, 0.3)`. On focus: full border illuminates to `#00f2fe` with an internal linear cyan wash and a flashing monospaced cursor.

### Responsive Mobile Touch Joystick Overlays
- Floating dual-concentric touch circle. Outer ring: 120px diameter, 1px dashed `rgba(0, 242, 254, 0.3)` border. Thumb nub: 44px solid circular puck with radial cyan glow (`#00f2fe`), translating smoothly within vector boundaries while transmitting polar coordinates.