// Play-flow map: 8 mini-phones connected with labeled wires.
// SVG arrows share the same coordinate space as the absolutely-positioned
// phones, so every arrow points exactly where it should.
// Ported from the design prototype's digilife-flow.jsx.

import React from 'react';
import { T, fontDisplay, fontMono, rgba } from '../tokens';
import { IOSDevice } from '../ios/IOSFrame';
import { ScreenTitle, ScreenSetup, ScreenMainGame, ScreenViralClip } from '../screens/ScreensA';
import { ScreenConsequence, ScreenSpotTheScam, ScreenReceipts, ScreenReportCard } from '../screens/ScreensB';

// ─────────────────────────────────────────────────────────────
// Mini phone — actual screen content rendered at scale
// ─────────────────────────────────────────────────────────────
function MiniPhone({
  Screen,
  scale = 0.45,
  label,
  num,
  accent = T.teal,
  sub,
}: {
  Screen: React.ComponentType;
  scale?: number;
  label: string;
  num: string;
  accent?: string;
  sub?: string;
}) {
  const w = 402 * scale;
  const h = 874 * scale;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
      <div
        style={{
          width: w,
          height: h,
          overflow: 'hidden',
          borderRadius: 48 * scale,
          boxShadow: `0 ${24 * scale}px ${48 * scale}px rgba(0,0,0,0.4), 0 0 0 1.5px ${rgba(accent, 0.4)}`,
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 402, height: 874 }}>
          <IOSDevice width={402} height={874} dark>
            <Screen />
          </IOSDevice>
        </div>
      </div>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div style={{ fontFamily: fontMono, fontSize: 12, color: accent, letterSpacing: '0.2em', fontWeight: 700 }}>{num}</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: T.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.12em' }}>{sub}</div>}
      </div>
    </div>
  );
}

interface Pos {
  x: number;
  y: number;
}

// ─────────────────────────────────────────────────────────────
// FlowMap — 8 phones laid out with SVG wires + labels
// ─────────────────────────────────────────────────────────────
export function FlowMap() {
  // Coordinate system: 2900 × 1480
  // Phone width/height at scale 0.45: 181 × 393
  const PW = 181;
  const PH = 393;
  const GAP = 200; // horizontal gap between linear-flow phones

  // Phone positions (top-left corner of the phone, in container coords)
  const pos: Record<string, Pos> = {
    title: { x: 80, y: 520 },
    setup: { x: 80 + (PW + GAP) * 1, y: 520 },
    main: { x: 80 + (PW + GAP) * 2, y: 520 }, // inside loop
    viral: { x: 80 + (PW + GAP) * 3, y: 520 }, // inside loop
    consequence: { x: 80 + (PW + GAP) * 4, y: 520 }, // inside loop
    report: { x: 80 + (PW + GAP) * 5 + 200, y: 520 },
    scam: { x: 80 + (PW + GAP) * 3, y: 40 }, // above viral
    receipts: { x: 80 + (PW + GAP) * 4 + 280, y: 990 }, // below-right of consequence
  };

  // Center y of phones in main row
  const mainCy = pos.title.y + PH / 2;

  // Loop bracket bounds (encloses main, viral, consequence)
  const lb = {
    x: pos.main.x - 40,
    y: 500,
    w: pos.consequence.x + PW + 40 - (pos.main.x - 40),
    h: 500,
  };

  // Helper: phone center
  const cx = (p: Pos) => p.x + PW / 2;
  const cy = (p: Pos) => p.y + PH / 2;

  const containerW = 2900;
  const containerH = 1480;

  return (
    <div
      style={{
        width: containerW,
        height: containerH,
        position: 'relative',
        background: `
        radial-gradient(ellipse 1400px 700px at 50% 50%, rgba(45,212,191,0.05), transparent 70%),
        radial-gradient(ellipse at center, #14213F 0%, #0E162B 70%)`,
        padding: 0,
        overflow: 'hidden',
        borderRadius: 24,
      }}
    >
      {/* dotted background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1.2px, transparent 1.2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
          pointerEvents: 'none',
        }}
      />

      {/* page header */}
      <div style={{ position: 'absolute', top: 60, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 16,
              color: T.teal,
              letterSpacing: '0.3em',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ width: 12, height: 12, background: T.teal, borderRadius: 999, boxShadow: `0 0 0 5px ${rgba(T.teal, 0.18)}` }} />
            PLAY FLOW · HOW THE 8 SCREENS LINK
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, margin: '14px 0 8px', color: T.ink, letterSpacing: '-0.02em' }}>
            The full game arc
          </h1>
          <div style={{ fontSize: 19, color: T.ink2, maxWidth: 900, lineHeight: 1.45 }}>
            Screens 03 → 05 are the inner loop, repeated once per in-game year. Screen 06 interrupts ~1×/year. Screen 07 fires when past choices
            resurface. Screen 08 closes the arc at Sec 4.
          </div>
        </div>
        {/* legend */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: '18px 22px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${T.line}`,
            borderRadius: 16,
            fontFamily: fontMono,
            fontSize: 14,
            letterSpacing: '0.14em',
            minWidth: 360,
          }}
        >
          <LegendRow color={T.teal} label="MAIN FLOW" />
          <LegendRow color={T.teal} dashed label="↻ LOOP · NEXT YEAR" />
          <LegendRow color={T.gold} dashed label="MINI-GAME INTERRUPT" />
          <LegendRow color={T.coral} dashed label="DELAYED CALLBACK" />
        </div>
      </div>

      {/* loop bracket */}
      <div
        style={{
          position: 'absolute',
          left: lb.x,
          top: lb.y,
          width: lb.w,
          height: lb.h,
          border: `2px dashed ${T.teal}`,
          borderRadius: 32,
          background: rgba(T.teal, 0.04),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: lb.x + 28,
          top: lb.y - 22,
          background: '#0E162B',
          border: `2px dashed ${T.teal}`,
          borderRadius: 999,
          padding: '8px 20px',
          fontFamily: fontMono,
          fontSize: 16,
          color: T.teal,
          letterSpacing: '0.2em',
          fontWeight: 700,
        }}
      >
        CORE LOOP · ×6 YEARS · 03 → 04 → 05 → ↻
      </div>

      {/* SVG wires (same coordinate space as the absolutely-positioned phones) */}
      <svg
        viewBox={`0 0 ${containerW} ${containerH}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
      >
        <defs>
          <marker id="flMaTeal" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M0,0 L12,6 L0,12 z" fill={T.teal} />
          </marker>
          <marker id="flMaGold" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M0,0 L12,6 L0,12 z" fill={T.gold} />
          </marker>
          <marker id="flMaCoral" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M0,0 L12,6 L0,12 z" fill={T.coral} />
          </marker>
        </defs>

        {/* ────── MAIN FLOW (solid teal) ────── */}
        <Wire from={[pos.title.x + PW, mainCy]} to={[pos.setup.x, mainCy]} color={T.teal} marker="flMaTeal" label="TAP START" />
        <Wire from={[pos.setup.x + PW, mainCy]} to={[pos.main.x, mainCy]} color={T.teal} marker="flMaTeal" label="BEGIN YEAR 1" />
        <Wire from={[pos.main.x + PW, mainCy]} to={[pos.viral.x, mainCy]} color={T.teal} marker="flMaTeal" label="DAY LOADS" />
        <Wire from={[pos.viral.x + PW, mainCy]} to={[pos.consequence.x, mainCy]} color={T.teal} marker="flMaTeal" label="PICK A / B / C" />
        <Wire from={[pos.consequence.x + PW, mainCy]} to={[pos.report.x, mainCy]} color={T.teal} marker="flMaTeal" label="AFTER SEC 4" />

        {/* ────── LOOP-BACK (dashed teal) — routes below the cards ────── */}
        <path
          d={`M ${cx(pos.consequence)} ${pos.consequence.y + PH} Q ${(cx(pos.consequence) + cx(pos.main)) / 2} ${
            pos.consequence.y + PH + 220
          } ${cx(pos.main)} ${pos.main.y + PH}`}
          stroke={T.teal}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="12 8"
          markerEnd="url(#flMaTeal)"
        />
        <LabelPill
          x={(cx(pos.consequence) + cx(pos.main)) / 2}
          y={pos.consequence.y + PH + 220}
          color={T.teal}
          text="↻ NEXT YEAR — REPEAT LOOP ×6"
        />

        {/* ────── MINI-GAME branch (gold dashed) ────── */}
        {/* 03 (top) → 06 (bottom) */}
        <path
          d={`M ${cx(pos.main)} ${pos.main.y} Q ${cx(pos.main)} ${pos.scam.y + PH + 60} ${cx(pos.scam) - 30} ${pos.scam.y + PH}`}
          stroke={T.gold}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="12 8"
          markerEnd="url(#flMaGold)"
        />
        <LabelPill x={cx(pos.main) - 100} y={pos.main.y + 60} color={T.gold} text="INTERRUPT" />

        {/* 06 (bottom) → 05 (top) */}
        <path
          d={`M ${cx(pos.scam) + 30} ${pos.scam.y + PH} Q ${cx(pos.consequence)} ${pos.scam.y + PH + 60} ${cx(pos.consequence)} ${pos.consequence.y}`}
          stroke={T.gold}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="12 8"
          markerEnd="url(#flMaGold)"
        />
        <LabelPill x={cx(pos.consequence) + 120} y={pos.consequence.y + 60} color={T.gold} text="OR JUMP TO 05" />

        {/* ────── DELAYED CALLBACK (coral dashed) ────── */}
        <path
          d={`M ${pos.consequence.x + PW} ${pos.consequence.y + PH - 80} Q ${pos.receipts.x - 80} ${pos.consequence.y + PH - 80} ${
            pos.receipts.x
          } ${cy(pos.receipts)}`}
          stroke={T.coral}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray="12 8"
          markerEnd="url(#flMaCoral)"
        />
        <LabelPill x={pos.receipts.x - 110} y={cy(pos.receipts) - 80} color={T.coral} text="YEARS LATER" />

        {/* 07 fades back into the loop (faint) */}
        <path
          d={`M ${pos.receipts.x} ${pos.receipts.y + PH - 50} Q ${cx(pos.consequence)} ${pos.receipts.y + PH + 150} ${cx(pos.main)} ${
            pos.main.y + PH + 220
          }`}
          stroke={T.coral}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="6 8"
          opacity="0.35"
        />
      </svg>

      {/* Phones (absolutely positioned in the same coord space) */}
      <PhoneSlot p={pos.title}>
        <MiniPhone Screen={ScreenTitle} num="01" label="Title" accent={T.teal} />
      </PhoneSlot>
      <PhoneSlot p={pos.setup}>
        <MiniPhone Screen={ScreenSetup} num="02" label="Setup" accent={T.teal} />
      </PhoneSlot>
      <PhoneSlot p={pos.main}>
        <MiniPhone Screen={ScreenMainGame} num="03" label="Main Game" accent={T.teal} sub="IN LOOP" />
      </PhoneSlot>
      <PhoneSlot p={pos.viral}>
        <MiniPhone Screen={ScreenViralClip} num="04" label="Scenario" accent={T.gold} sub="IN LOOP · MISINFO" />
      </PhoneSlot>
      <PhoneSlot p={pos.consequence}>
        <MiniPhone Screen={ScreenConsequence} num="05" label="Consequence" accent={T.teal} sub="IN LOOP" />
      </PhoneSlot>
      <PhoneSlot p={pos.scam}>
        <MiniPhone Screen={ScreenSpotTheScam} num="06" label="Spot the Scam" accent={T.gold} sub="MINI-GAME · ~1×/YEAR" />
      </PhoneSlot>
      <PhoneSlot p={pos.receipts}>
        <MiniPhone Screen={ScreenReceipts} num="07" label="Receipts Resurface" accent={T.coral} sub="DELAYED CALLBACK" />
      </PhoneSlot>
      <PhoneSlot p={pos.report}>
        <MiniPhone Screen={ScreenReportCard} num="08" label="Report Card" accent={T.gold} sub="SHAREABLE END" />
      </PhoneSlot>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function PhoneSlot({ p, children }: { p: Pos; children: React.ReactNode }) {
  return <div style={{ position: 'absolute', left: p.x, top: p.y, zIndex: 2 }}>{children}</div>;
}

function LegendRow({ color, dashed, label }: { color: string; dashed?: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: T.ink2, fontWeight: 600 }}>
      <svg width="42" height="6">
        <line x1="0" y1="3" x2="42" y2="3" stroke={color} strokeWidth="3" strokeDasharray={dashed ? '6 4' : undefined} />
      </svg>
      <span>{label}</span>
    </div>
  );
}

// A straight horizontal arrow with a label rendered as a pill on top
function Wire({
  from,
  to,
  color,
  marker,
  label,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
  marker: string;
  label?: string;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const midX = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3.5" markerEnd={`url(#${marker})`} />
      {label && <LabelPill x={midX} y={y1} color={color} text={label} />}
    </g>
  );
}

// Label as a filled pill so it stays legible against any wire
function LabelPill({ x, y, color, text, fontSize = 15 }: { x: number; y: number; color: string; text: string; fontSize?: number }) {
  // Render text first to measure, but since SVG measuring is hard, approximate width
  // by character count. ~9.5px per char at fs=15 (mono).
  const charW = fontSize * 0.65;
  const padX = 14;
  const padY = 8;
  const w = text.length * charW + padX * 2;
  const h = fontSize + padY * 2;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} ry={h / 2} fill="#0E162B" stroke={color} strokeWidth="1.5" />
      <text
        x={x}
        y={y + fontSize * 0.36}
        fill={color}
        fontFamily="JetBrains Mono, monospace"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}
