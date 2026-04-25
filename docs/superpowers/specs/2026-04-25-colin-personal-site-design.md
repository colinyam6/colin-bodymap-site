# Colin Personal Site Design Spec

Date: 2026-04-25
Project: Colin personal website
Status: Approved in conversation and moving into implementation

## Overview

Build a high-impact one-page personal website for Colin. The site should feel like a fiery hero poster first and an interactive personal profile second. The central visual idea is a virtual body made of glowing lines, heat energy, and light mechanical framing. Different body areas represent different parts of Colin's personality and interests.

The chosen direction is:

- Structure: scroll-based one-page experience
- Core composition: central body map plus expanding detail sections
- Style blend: fire-first hot-blooded look with light mech-scan support
- Interaction priority: obvious wow-factor in the first screen and strong hover tilt on lower cards

## Goals

- Make the first screen feel immediately cool, loud, and memorable
- Present Colin as a fifth-grade student with strong academics and vivid hobbies
- Use a body-map metaphor so each area of the body explains a different part of Colin
- Keep the page readable for parents, teachers, and classmates
- Make the game-related content feel like the most powerful energy core on the page
- Preserve solid mobile behavior and reduced-motion support

## Non-Goals

- No backend, CMS, authentication, or database
- No heavy 3D engine or canvas-driven character renderer
- No generic resume layout, dashboard mosaic, or boxed hero card stack
- No cold cyberpunk blue-purple look as the primary direction

## Creative Direction

### Visual Thesis

Create a full-screen heroic poster driven by fire, amber heat, molten light, and glowing anatomy lines. The site should feel like a young protagonist's power profile activating on screen.

### Content Plan

- Hero: Colin enters as the main character with a large title, short identity line, and body-stage visual
- Sticky body map: the body stays present while each highlighted area explains one part of Colin
- Detail cards: lower profile cards deepen each theme and add obvious hover tilt and glow
- Final close: a short "still leveling up" ending section

### Interaction Thesis

- Hero: layered entrance with title, flames, rings, and body silhouette activating in sequence
- Scroll: body hotspots light up as matching content blocks move into focus
- Hover: lower cards tilt toward the pointer, sharpen their glow, and reveal a moving highlight

## Experience Principles

- The first viewport must read like a poster, not a document
- `Colin` is the loudest text
- The body is the dominant visual anchor
- The game core must be the brightest, hottest region
- Motion supports hierarchy instead of appearing on every element equally
- Desktop should feel cinematic; mobile should feel compact but still bold

## Information Architecture

The site will use this single-page structure:

1. Hero poster
2. Sticky body map / scroll story
3. Tilt-card profile grid
4. Closing section
5. Footer

## Content Mapping

### Hero Poster

Purpose: Deliver the "one glance = cool" reaction.

Content:

- `Colin`
- short identity line: fifth-grade student / strong at math and English / game lover
- short supporting sentence explaining that this is Colin's personal power map
- one CTA that invites the user to scroll

Visual treatment:

- full-bleed background
- warm fire clouds, glow rings, ember particles, scan streaks, and a central body stage
- fiery orange, amber, gold, and white dominate
- small HUD annotations appear as support only

### Sticky Body Map

Purpose: Turn the body into a readable information map.

Body areas:

- Head: strong grades, especially math and English
- Chest: loves reading and has read many books
- Hands: can play piano, but it is not a favorite
- Legs: likes basketball and football, with enthusiasm more important than skill level
- Core / abdomen: loves games the most; this is the strongest visual energy source
- Shoulder / orbit tags: likes playing Pummel Party with classmates
- Outer aura / rear atmosphere: currently exploring Elden Ring

Behavior:

- body stays visible while scroll content changes
- the currently focused content block activates the matching hotspot
- the active hotspot grows brighter and sharper than the others

### Detail Cards

Purpose: Expand the profile into short, energetic modules.

Cards:

- Learning Core
- Reading Heart
- Sports Drive
- Piano Skill
- Game Reactor
- Squad Mode

Visual treatment:

- slanted corners, glow borders, warm gradients, deep shadows
- obvious hover tilt with pointer-based rotation
- light streak or specular highlight moves across the active card

### Closing Section

Purpose: End with momentum instead of a flat footer.

Content:

- short line about Colin still leveling up
- light supportive copy that hints at more adventures to come

## Visual System

### Palette

- Base background: near-black, charcoal red, deep brown-black
- Primary accents: flame orange, amber, molten gold
- Secondary accents: hot white and a small amount of HUD cyan for contrast only
- Utility colors: smoke gray, warm shadow tones

### Typography

- Display face: bold, angular, energetic display font
- Support face: compact readable sans with athletic or technical character
- Chinese copy should remain legible at small sizes

### Shapes and Motifs

- slanted panels
- circular power rings
- line-based body frame
- brackets and target marks
- ember particles and light haze

## Motion System

### Entry Motion

- title fades and rises in first
- body frame and aura activate next
- support labels and CTA follow

### Scroll Motion

- content blocks reveal with short upward motion
- active body hotspot brightens and pulses
- decorative glow shifts subtly with the viewport

### Hover Motion

- cards tilt in both X and Y
- card border glow intensifies
- a highlight follows pointer position

### Accessibility Rule

- respect `prefers-reduced-motion: reduce`
- on reduced motion, keep content visible and readable without parallax or tilt

## Responsive Strategy

### Desktop

- hero uses split composition: text on one side, body stage on the other
- body map uses sticky figure plus scrolling text column
- cards appear in a multi-column grid

### Mobile

- hero collapses into a stacked composition
- body map becomes a vertical sequence with a shorter sticky or static figure treatment
- cards become single-column but retain strong hover/tap affordances visually

## Implementation Architecture

Use a lightweight static site:

- `index.html` for structure and content
- `styles.css` for layout, atmosphere, and animation
- `script.js` for reveal logic, body-map activation, and tilt math

Use progressive enhancement so the page remains readable without JavaScript.

## Data Model

Represent hotspot and card content in JavaScript data arrays so the markup can stay consistent and easier to maintain. Each body area should map to:

- id
- title
- short label
- summary copy
- optional theme tag

Each lower card should map to:

- title
- kicker
- short summary
- supporting list or stat

## Error Handling And Resilience

- body-map content must remain readable if observers fail
- cards must remain readable if pointer events are not available
- reduced-motion mode removes tilt and parallax
- external webfont failure falls back to system-safe faces

## Testing Strategy

### Markup And Content

- verify hero, body map, cards, and closing sections exist
- verify key profile text appears correctly

### Style Hooks

- verify warm palette variables and main layout selectors exist
- verify sticky body map and tilt-card selectors exist
- verify reduced-motion and focus-visible selectors exist

### Motion Logic

- verify hero pointer math stays clamped
- verify card tilt math stays bounded
- verify reveal options adjust for reduced motion

### Responsive Safety

- verify mobile layout switches body map and card grid into stacked layouts

## Deliverable Summary

The final site should feel like a fiery personal power map for Colin: a warm, cool-looking, game-inspired homepage with a central virtual body, scrolling story sections, and dramatic interactive cards that make the page feel alive.
