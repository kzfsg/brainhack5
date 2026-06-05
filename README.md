# DigiLife — Hi-Fi Screens

A pixel-faithful implementation of the **DigiLife Hi-Fi** design — an
educational mobile game that teaches Singapore teens (13–18) to navigate
scams, misinformation, and cyberbullying through choice-driven scenarios.

This recreates the design handoff's `DigiLife Hi-Fi.html` prototype as a real
Vite + React + TypeScript app: eight phone screens rendered in iPhone-class
device frames, plus a play-flow map showing how the screens link, all browsable
on a pan/zoom design canvas.

## The 8 screens

| # | Screen | Role |
|---|--------|------|
| 01 | **Title** | Entry — _Pause. Think. Protect._ |
| 02 | **Setup** | Username + avatar + starting 50/50 stats |
| 03 | **Main Game** | Core loop — shared scenario layout |
| 04 | **The Viral Clip** | Worked scenario example (misinformation) |
| 05 | **Consequence** | Outcome with animated stat deltas |
| 06 | **Spot the Scam** | Mini-game — red-flag test mode |
| 07 | **Receipts Resurface** | Delayed consequence — a past post comes back |
| 08 | **Report Card** | Shareable closer with a digital-safety score |

The **Play Flow** map links them end-to-end: the inner loop (03 → 04 → 05,
repeated once per in-game year), the mini-game interrupt (06), and the
delayed callback (07).

## Using the canvas

- **Scroll / pinch** to zoom
- **Drag** to pan
- **Click an artboard title** (or its expand button) to open it fullscreen
- In focus mode: **← / →** to step between screens, **↑ / ↓** between sections,
  **Esc** to exit

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx                     # assembles sections → DesignCanvas
  data/screens.ts             # the 8 screens, in play order
  design/
    tokens.ts                 # colors, fonts, stat metadata
    ios/IOSFrame.tsx          # iPhone device frame + status bar
    ui/DigiLifeUI.tsx         # shared atoms (StatBar, ChoiceButton, TopBar, …)
    screens/ScreensA.tsx      # screens 01–04
    screens/ScreensB.tsx      # screens 05–08
    flow/FlowMap.tsx          # the linked-screens flow map
    canvas/DesignCanvas.tsx   # pan/zoom canvas + focus overlay
```

Screens are built with the design's exact tokens, copy, and animations
(stat bars fill on mount, choice buttons stagger-fade in, Consequence stat
deltas pop with bounce easing). Fonts — Space Grotesk, JetBrains Mono, and
Fraunces — load from Google Fonts.
