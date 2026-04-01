# Colin Personal Site Design Spec

Date: 2026-04-01
Project: Colin personal website
Status: Approved in conversation, awaiting final user review of written spec

## Overview

Build a high-impact static personal website for Colin with a unified "game-tech" visual language. The site should feel like a young player and future creator's personal arena: cool, energetic, readable, and polished rather than noisy.

The chosen direction is:

- Visual direction: Energy arena
- Hero framing: Player entrance screen
- Character treatment: Has a character-led visual presence
- Final concept: Champion entrance poster

## Goals

- Make `Colin` the dominant visual focus in the first screen
- Present Colin as a fifth-grade student who loves AI, games, math, and technology
- Keep copy short and easy to scan
- Deliver a static site with strong motion, responsive layout, and solid performance
- Make the gaming section feel like a player profile or achievements system

## Non-Goals

- No backend, CMS, login, or database
- No heavy 3D stack or game engine embed
- No dense biography or essay-style text
- No childish cartoon styling

## Creative Direction

### Visual Thesis

Create a dark, high-contrast, arena-like personal homepage that feels like a champion player entering a futuristic competition stage, using electric blue and heated orange light to frame Colin as the main character.

### Content Plan

- Hero: champion entrance poster with Colin's name, identity, and a single call to scroll
- Support: short "about me" introduction and favorite subjects
- Detail: favorite book and interest set with icon-led presentation
- Final feature block: game zone with cleared, often-played, and currently-playing states

### Interaction Thesis

- A layered hero entrance sequence should feel like the arena powers on before Colin appears
- Mouse movement should produce restrained parallax and particle drift around the hero area
- Hover states should feel like activation effects: glow, scan, lift, and progress highlights

## Experience Principles

- Loud first impression, calm reading rhythm after the hero
- One visual idea per section
- Motion should reinforce hierarchy, not become decoration everywhere
- Strong edges, glows, and HUD accents without turning every block into a heavy card
- Clear mobile readability is required, even when desktop is dramatic

## Information Architecture

The site will be a single-page layout with these sections in order:

1. Hero
2. About Me
3. Favorite Subjects
4. Favorite Book
5. Interests
6. Game Zone
7. Footer / closing signature

## Section Design

### 1. Hero

Purpose: Establish Colin as the main character immediately.

Content:

- Primary heading: `Colin`
- Supporting identity line: fifth-grade student / AI game creator / loves math and technology
- Small supporting line introducing Colin as a young builder and player
- One primary action: `Enter My Arena`

Visual composition:

- Full-bleed first screen with no boxed center-column layout
- A code-drawn poster-style scene combining:
  - a character-like silhouette or stylized young-player figure
  - arena light beams and energy glow behind the figure
  - HUD brackets, scanlines, and small system labels in the periphery
- Blue/orange light contrast should create heat and motion without hiding the text
- `Colin` must be the loudest text on the page

### 2. About Me

Purpose: Give a fast, human introduction.

Content:

- A concise paragraph explaining that Colin is a primary school student who loves games, science, coding, and creating with AI, written in a short, upbeat, first-person voice

Visual treatment:

- Short block with strong typography and one supporting visual motif
- A subtle divider or arena-line transition from the hero

### 3. Favorite Subjects

Purpose: Show Colin's strongest learning interests.

Content:

- Mathematics
- Information Technology

Visual treatment:

- Two featured modules or stat-like panels rather than generic cards
- Each subject gets a strong label, a small icon or glyph, and a short descriptor
- Subject blocks should feel like skill categories or ability stats

### 4. Favorite Book

Purpose: Highlight a personal favorite with a distinct mood change.

Content:

- `《猫武士》`
- Supporting line theme: Colin loves its brave, adventurous world

Visual treatment:

- A focused spotlight section rather than a long recommendation
- Atmospheric treatment can lean slightly more cinematic, but must still match the tech-game system
- Include one short line about why the book stands out to Colin

### 5. Interests

Purpose: Quickly scan Colin's hobbies and curiosity areas.

Content:

- Playing computer games
- Playing ping-pong
- Playing pickleball
- Researching programming
- Reading chemistry books

Visual treatment:

- Icon-led interest grid or badge matrix
- Hover states can activate glow and micro-tilt
- Copy should stay label-sized, not paragraph-sized

### 6. Game Zone

Purpose: Make Colin's game identity feel like a player profile.

Content groups:

- Cleared:
  - 大航海时代四
  - 潜水员戴夫
  - 黑神话：悟空
- Often played:
  - Pummel Party
- Currently playing:
  - 艾尔登法环

Visual treatment:

- This section should feel like an achievements panel or profile terminal
- Use three distinct sub-areas for cleared / often played / currently playing
- Add visual signals such as progress lines, achievement markers, or activation highlights
- Hover interactions can animate progress bars, status outlines, or achievement glow

### 7. Footer / Closing Signature

Purpose: End the page cleanly without losing style.

Content:

- A short closing line reinforcing Colin's identity as a young creator
- Preferred tone: short, proud, and forward-looking rather than sentimental

Visual treatment:

- Minimal footer with restrained glow and a final system-line motif

## Visual System

### Palette

- Base background: near-black and deep navy
- Primary accent: electric blue
- Secondary accent: hot orange / amber
- Supporting tones: cool white, muted steel blue, transparent glow layers

### Typography

- Headline font: a strong techno display face such as `Orbitron` or `Oxanium`
- Supporting font: a more readable condensed or sporty sans face such as `Rajdhani` or `Exo 2`
- Typography should feel game-adjacent and energetic without becoming hard to read

### Shapes and Motifs

- Angular brackets
- HUD lines
- Energy arcs
- Soft scanlines
- Subtle dot-grid or field textures

## Motion System

### Entry Motion

- Hero background glows in first
- Character silhouette and title enter with staggered timing
- Supporting labels and CTA follow with shorter secondary reveals

### Scroll Motion

- Sections reveal with upward drift and fade
- Motion timing should be smooth and quick, not floaty
- Some decorative elements can shift slightly with scroll depth to create atmosphere

### Pointer Motion

- Hero background uses small parallax movement
- Lightweight particles or embers can track pointer direction subtly
- Motion must be capped so text remains stable

### Hover Motion

- Buttons: glow, slight scale increase, energy sweep
- Interest and subject items: lift, slight tilt, brighter border
- Game entries: highlight pulses, progress activation, or achievement-line sweep

### Accessibility Motion Rule

- Respect `prefers-reduced-motion: reduce`
- In reduced-motion mode, replace major transforms with simple opacity changes or static states

## Responsive Strategy

### Desktop

- Full-impact poster hero
- Generous horizontal composition for the arena and character framing
- Sections can alternate layout rhythm to keep the page dynamic

### Mobile

- Hero should re-stack into a readable portrait composition
- The character visual remains present, but text must keep top reading priority
- Subject, interest, and game items should collapse into narrow stacks with preserved glow accents
- Buttons and touch targets must remain easy to tap

## Implementation Architecture

Implement as a static front-end site with three core files:

- `index.html`
- `styles.css`
- `script.js`

Responsibilities:

- `index.html`: semantic structure and section content
- `styles.css`: full visual system, responsive rules, and most animations
- `script.js`: entrance orchestration, scroll reveals, pointer parallax, hover-driven enhancements, and reduced-JS progressive behavior

No framework is required. The page should run by opening the files locally or via a lightweight static server.

## Behavioral Data Flow

- HTML provides semantic section anchors and data attributes for animation targets
- CSS handles baseline styling and hover/interpolation-friendly transitions
- JavaScript progressively enhances:
  - initial loading state
  - intersection-based reveal states
  - hero pointer tracking values
  - optional particle or glow-follow behavior

If JavaScript fails, the page should still render all content in readable static form.

## Error Handling and Resilience

- All content must remain visible without JavaScript
- Decorative effects must fail safely if a browser does not support them
- Avoid layout dependence on external media assets
- Font fallbacks must keep the page usable if web fonts fail to load

## Performance Constraints

- Keep effects CSS-first where practical
- Avoid heavy canvas or constant animation loops unless tightly scoped
- Use modest blur, shadow, and particle counts
- Limit simultaneous animated elements on mobile

## Testing Strategy

### Visual Verification

- Check desktop layout at a common wide viewport
- Check mobile layout at a narrow phone viewport
- Confirm text contrast remains strong in all sections

### Interaction Verification

- Verify hero entrance sequence
- Verify section reveal triggers
- Verify hover states on buttons, subject items, interests, and game entries
- Verify parallax remains subtle and does not cause jitter

### Accessibility Verification

- Verify logical heading order
- Verify keyboard focus visibility on interactive controls
- Verify reduced-motion behavior
- Verify readable color contrast against dark backgrounds

### Failure-Mode Verification

- Load page with JavaScript disabled
- Confirm all main content remains visible and ordered
- Confirm no section becomes unusable if fonts fall back

## Deliverable Summary

The final site should feel like a futuristic player entrance poster that opens into a clean, high-energy personal homepage. It should be exciting at first glance, but organized enough that a parent, teacher, or classmate can quickly understand who Colin is and what he loves.
