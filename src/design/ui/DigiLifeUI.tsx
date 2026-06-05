// Shared design atoms for the DigiLife hi-fi screens.
// Ported from the design prototype's digilife-ui.jsx.

import React from 'react';
import {
  T,
  fontDisplay,
  fontMono,
  rgba,
  STATS,
  STAT_KEYS,
  type StatKey,
  type Stats,
} from '../tokens';

// ─────────────────────────────────────────────────────────────
// Shield logo
// ─────────────────────────────────────────────────────────────
export function Shield({ size = 72, accent = T.teal, glow = false }: { size?: number; accent?: string; glow?: boolean }) {
  return (
    <svg
      width={size}
      height={size * 1.16}
      viewBox="0 0 120 140"
      fill="none"
      style={{ filter: glow ? `drop-shadow(0 0 18px ${rgba(accent, 0.45)})` : 'none' }}
    >
      <defs>
        <linearGradient id={`sh-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.18" />
          <stop offset="1" stopColor={accent} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path
        d="M60 8 L108 28 V64 C108 96 86 122 60 132 C34 122 12 96 12 64 V28 Z"
        stroke={accent}
        strokeWidth="3"
        fill={`url(#sh-${accent})`}
      />
      <path d="M44 70 L56 84 L80 56" stroke={accent} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Pill (rounded tag)
// ─────────────────────────────────────────────────────────────
export function Pill({
  children,
  color = T.ink2,
  bg,
  border,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  border?: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 12px',
        borderRadius: 999,
        background: bg ?? 'rgba(255,255,255,0.04)',
        border: `1px solid ${border ?? T.line}`,
        fontFamily: fontMono,
        fontSize: 11,
        color,
        letterSpacing: '0.08em',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Category tag — colored pill with glyph
// ─────────────────────────────────────────────────────────────
type CategoryType = 'misinfo' | 'scam' | 'bully' | 'reactive';

export function CategoryTag({ type, size = 'sm' }: { type: CategoryType; size?: 'sm' | 'lg' }) {
  const meta = {
    misinfo: { color: T.gold, label: 'Misinformation', glyph: '▲' },
    scam: { color: T.coral, label: 'Scam', glyph: '▲' },
    bully: { color: T.purple, label: 'Cyberbullying', glyph: '▲' },
    reactive: { color: T.teal, label: 'Reactive', glyph: '⚡' },
  }[type];
  const fs = size === 'lg' ? 12 : 11;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: size === 'lg' ? '6px 12px' : '5px 10px',
        borderRadius: 8,
        background: rgba(meta.color, 0.14),
        border: `1px solid ${rgba(meta.color, 0.4)}`,
        color: meta.color,
        fontFamily: fontMono,
        fontSize: fs,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ fontSize: fs - 1 }}>{meta.glyph}</span>
      {meta.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Compact stat chip (top bar)
// ─────────────────────────────────────────────────────────────
export function StatChip({
  statKey,
  value,
  deltaDir = null,
  highlighted = false,
}: {
  statKey: StatKey;
  value: number;
  deltaDir?: 'up' | 'down' | null;
  highlighted?: boolean;
}) {
  const meta = STATS[statKey];
  const ringColor = highlighted ? meta.color : T.line;
  const bgColor = highlighted ? rgba(meta.color, 0.1) : 'rgba(255,255,255,0.04)';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '6px 4px',
        borderRadius: 10,
        background: bgColor,
        border: `1px solid ${ringColor}`,
        transition: 'all 0.35s ease',
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: rgba(meta.color, 0.18),
          color: meta.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
        }}
      >
        {meta.icon}
      </div>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 11,
          color: T.ink,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {value}
        {deltaDir === 'up' && <span style={{ color: meta.tone === 'negative' ? T.coral : T.teal, fontSize: 9 }}>▲</span>}
        {deltaDir === 'down' && <span style={{ color: T.coral, fontSize: 9 }}>▼</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Full stat bar (icon + label + animated fill + value)
// ─────────────────────────────────────────────────────────────
export function StatBar({
  statKey,
  value,
  delay = 0,
  sublabel = false,
}: {
  statKey: StatKey;
  value: number;
  delay?: number;
  sublabel?: boolean;
}) {
  const meta = STATS[statKey];
  const [fill, setFill] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setFill(value), 80 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: rgba(meta.color, 0.16),
              color: meta.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}
          >
            {meta.icon}
          </div>
          <div>
            <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>
              {meta.label}
            </div>
            {sublabel && <div style={{ fontSize: 11, color: T.ink3, marginTop: 2 }}>{meta.sub}</div>}
          </div>
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 14, color: T.ink, fontWeight: 600 }}>{value}</div>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.05)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${fill}%`,
            background: `linear-gradient(90deg, ${rgba(meta.color, 0.7)} 0%, ${meta.color} 100%)`,
            boxShadow: `0 0 12px ${rgba(meta.color, 0.5)}`,
            borderRadius: 8,
            transition: 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Choice button (A/B/C with colored badge)
// ─────────────────────────────────────────────────────────────
export function ChoiceButton({
  letter,
  color,
  children,
  delay = 0,
  onClick,
  selected = false,
  dimmed = false,
  disabled = false,
}: {
  letter: string;
  color: string;
  children: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  selected?: boolean;
  dimmed?: boolean;
  disabled?: boolean;
}) {
  const [appear, setAppear] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAppear(true), 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  const active = (hover && !disabled) || selected;
  return (
    <div
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 16px',
        alignItems: 'center',
        gap: 14,
        padding: '16px 16px 16px 14px',
        background: selected ? rgba(color, 0.12) : active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1.5px solid ${selected || active ? color : T.line}`,
        borderRadius: 14,
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: appear ? (dimmed ? 0.4 : 1) : 0,
        transform: `translateY(${appear ? 0 : 10}px)`,
        boxShadow: selected ? `0 0 0 1px ${color}, 0 8px 24px ${rgba(color, 0.25)}` : 'none',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: color,
          color: '#0a0d18',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontMono,
          fontWeight: 800,
          fontSize: 15,
          boxShadow: `0 4px 12px ${rgba(color, 0.4)}`,
        }}
      >
        {letter}
      </div>
      <div style={{ fontSize: 15, color: T.ink, lineHeight: 1.35, fontWeight: 500 }}>{children}</div>
      <div style={{ color: T.ink3, fontSize: 14 }}>→</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stat-change pill (+/- with stat label)
// ─────────────────────────────────────────────────────────────
export function StatChangePill({ statKey, delta, delay = 0 }: { statKey: StatKey; delta: number; delay?: number }) {
  const meta = STATS[statKey];
  const isLoss = delta < 0 || (delta > 0 && meta.tone === 'negative');
  const tint = isLoss ? T.coral : meta.color;
  const [appear, setAppear] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAppear(true), 200 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '7px 13px',
        borderRadius: 999,
        background: rgba(tint, 0.12),
        border: `1.5px solid ${rgba(tint, 0.5)}`,
        color: tint,
        fontFamily: fontMono,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.02em',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: appear ? 1 : 0,
        transform: `scale(${appear ? 1 : 0.6})`,
      }}
    >
      <span style={{ fontSize: 13 }}>{meta.icon}</span>
      <span>{meta.label}</span>
      <span style={{ fontWeight: 800 }}>
        {delta > 0 ? '+' : ''}
        {delta}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────
export function PrimaryButton({
  children,
  size = 'lg',
  accent = T.teal,
  onClick,
}: {
  children: React.ReactNode;
  size?: 'lg' | 'md';
  accent?: string;
  onClick?: () => void;
}) {
  const padding = size === 'lg' ? '18px 22px' : '14px 18px';
  const fs = size === 'lg' ? 17 : 15;
  return (
    <div
      onClick={onClick}
      style={{
        padding,
        borderRadius: 16,
        background: `linear-gradient(180deg, ${accent}, ${rgba(accent, 0.85)})`,
        color: '#062722',
        fontFamily: fontDisplay,
        fontWeight: 700,
        fontSize: fs,
        textAlign: 'center',
        letterSpacing: '0.01em',
        boxShadow: `0 8px 28px ${rgba(accent, 0.35)}, inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 ${rgba(accent, 0.5)}`,
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
}

export function GhostButton({
  children,
  size = 'lg',
  onClick,
}: {
  children: React.ReactNode;
  size?: 'lg' | 'md';
  onClick?: () => void;
}) {
  const padding = size === 'lg' ? '16px 18px' : '12px 16px';
  const fs = size === 'lg' ? 15 : 14;
  return (
    <div
      onClick={onClick}
      style={{
        padding,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${T.line}`,
        color: T.ink,
        fontFamily: fontDisplay,
        fontWeight: 600,
        fontSize: fs,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar (persistent — age + 7 stat chips)
// ─────────────────────────────────────────────────────────────
export function TopBar({
  age,
  sec,
  subtitle,
  stats,
  highlights = {},
  deltas = {},
}: {
  age: number;
  sec: number;
  subtitle: string;
  stats: Stats;
  highlights?: Partial<Record<StatKey, boolean>>;
  deltas?: Partial<Record<StatKey, 'up' | 'down'>>;
}) {
  return (
    <div
      style={{
        padding: '14px 18px 16px',
        background: 'linear-gradient(180deg, rgba(45,212,191,0.04), transparent)',
        borderBottom: `1px solid ${T.lineSoft}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>
            Age {age} · Sec {sec}
          </div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3, letterSpacing: '0.12em', marginTop: 2 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: T.teal, boxShadow: `0 0 0 4px ${rgba(T.teal, 0.18)}` }} />
          <span style={{ fontFamily: fontMono, fontSize: 11, color: T.teal, letterSpacing: '0.14em' }}>LIVE</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
        {STAT_KEYS.map((k) => (
          <StatChip key={k} statKey={k} value={stats[k]} highlighted={highlights[k]} deltaDir={deltas[k] ?? null} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Progress dots
// ─────────────────────────────────────────────────────────────
export function ProgressDots({ current = 2, total = 6 }: { current?: number; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i < current ? 22 : 8,
            height: 8,
            borderRadius: 999,
            background: i < current ? T.teal : T.line,
            transition: 'all 0.4s',
            boxShadow: i < current ? `0 0 8px ${rgba(T.teal, 0.4)}` : 'none',
          }}
        />
      ))}
      <span style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3, letterSpacing: '0.12em', marginLeft: 8 }}>
        YEAR {current} / {total}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen wrapper — handles the dark bg + safe area below status bar
// ─────────────────────────────────────────────────────────────
export function Screen({ children, scroll = false }: { children: React.ReactNode; scroll?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        background: T.bg,
        color: T.ink,
        fontFamily: fontDisplay,
        paddingTop: 60 /* status bar safe area */,
        paddingBottom: 34 /* home indicator */,
        display: 'flex',
        flexDirection: 'column',
        overflow: scroll ? 'auto' : 'hidden',
        position: 'relative',
      }}
    >
      {/* subtle gradient bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at top, rgba(45,212,191,0.04), transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}
