// A lightweight Figma-ish design canvas: a pan/zoom surface holding labelled
// sections of artboards, with a fullscreen focus overlay (←/→/Esc) for
// inspecting any single artboard.
//
// This recreates the browsing experience documented in the design handoff
// ("zoom in with the scroll wheel/pinch, drag to pan, click any artboard
// title to open it fullscreen with ←/→ navigation") without the prototype's
// editing/persistence tooling, which isn't part of the visual design.

import React from 'react';
import ReactDOM from 'react-dom';
import { fontDisplay, fontMono, T } from '../tokens';

export interface Artboard {
  id: string;
  label: string;
  width: number;
  height: number;
  render: () => React.ReactNode;
  background?: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  artboards: Artboard[];
}

interface FocusTarget {
  sectionIdx: number;
  artboardIdx: number;
}

// ─────────────────────────────────────────────────────────────
// Canvas
// ─────────────────────────────────────────────────────────────
export function DesignCanvas({ sections }: { sections: Section[] }) {
  const [view, setView] = React.useState({ x: 64, y: 64, scale: 0.42 });
  const [focus, setFocus] = React.useState<FocusTarget | null>(null);
  const dragging = React.useRef<{ x: number; y: number } | null>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = surfaceRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setView((v) => {
      const factor = Math.exp(-e.deltaY * 0.0015);
      const nextScale = Math.min(2.5, Math.max(0.12, v.scale * factor));
      const k = nextScale / v.scale;
      // Keep the point under the cursor stationary while zooming.
      return { scale: nextScale, x: px - (px - v.x) * k, y: py - (py - v.y) * k };
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-dc-no-pan]')) return;
    dragging.current = { x: e.clientX - view.x, y: e.clientY - view.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setView((v) => ({ ...v, x: e.clientX - dragging.current!.x, y: e.clientY - dragging.current!.y }));
  };
  const onPointerUp = () => {
    dragging.current = null;
  };

  return (
    <div
      ref={surfaceRef}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: '#080F1F',
        cursor: dragging.current ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
    >
      {/* dotted backdrop (fixed — reads as the canvas surface) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1.2px, transparent 1.2px)',
          backgroundSize: `${40 * view.scale}px ${40 * view.scale}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
          pointerEvents: 'none',
        }}
      />

      {/* transformed world */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          transformOrigin: 'top left',
          display: 'flex',
          flexDirection: 'column',
          gap: 140,
          padding: 40,
        }}
      >
        {sections.map((section, si) => (
          <DCSection key={section.id} section={section} onFocus={(ai) => setFocus({ sectionIdx: si, artboardIdx: ai })} />
        ))}
      </div>

      {/* on-screen hint */}
      <div
        data-dc-no-pan
        style={{
          position: 'fixed',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: fontMono,
          fontSize: 12,
          letterSpacing: '0.1em',
          color: T.ink3,
          background: 'rgba(8,15,31,0.7)',
          border: `1px solid ${T.line}`,
          borderRadius: 999,
          padding: '8px 16px',
          pointerEvents: 'none',
        }}
      >
        SCROLL TO ZOOM · DRAG TO PAN · CLICK A TITLE TO FOCUS
      </div>

      {focus && (
        <DCFocusOverlay
          sections={sections}
          target={focus}
          onChange={setFocus}
          onClose={() => setFocus(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
function DCSection({ section, onFocus }: { section: Section; onFocus: (artboardIdx: number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div data-dc-no-pan style={{ maxWidth: 1400 }}>
        <div style={{ fontFamily: fontDisplay, fontSize: 40, fontWeight: 700, color: T.ink, letterSpacing: '-0.02em' }}>
          {section.title}
        </div>
        {section.subtitle && <div style={{ fontFamily: fontMono, fontSize: 18, color: T.ink3, marginTop: 8, letterSpacing: '0.04em' }}>{section.subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 64 }}>
        {section.artboards.map((ab, ai) => (
          <DCArtboard key={ab.id} artboard={ab} onFocus={() => onFocus(ai)} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Artboard
// ─────────────────────────────────────────────────────────────
function DCArtboard({ artboard, onFocus }: { artboard: Artboard; onFocus: () => void }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div
        data-dc-no-pan
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, color: T.ink2 }}
      >
        <div onClick={onFocus} style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 500, cursor: 'pointer' }} title="Click to focus">
          {artboard.label}
        </div>
        <button
          onClick={onFocus}
          title="Focus"
          style={{
            border: `1px solid ${T.line}`,
            background: 'rgba(255,255,255,0.04)',
            color: T.ink2,
            width: 30,
            height: 30,
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5" />
          </svg>
        </button>
      </div>
      <div
        style={{
          width: artboard.width,
          height: artboard.height,
          background: artboard.background ?? 'transparent',
          borderRadius: 2,
        }}
      >
        {artboard.render()}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Focus overlay — fullscreen single artboard with ←/→/Esc + dots
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  sections,
  target,
  onChange,
  onClose,
}: {
  sections: Section[];
  target: FocusTarget;
  onChange: (t: FocusTarget) => void;
  onClose: () => void;
}) {
  const section = sections[target.sectionIdx];
  const peers = section.artboards;
  const idx = target.artboardIdx;
  const artboard = peers[idx];

  const go = (d: number) => onChange({ ...target, artboardIdx: (idx + d + peers.length) % peers.length });
  const goSection = (d: number) => {
    const n = sections.length;
    const ns = (((target.sectionIdx + d) % n) + n) % n;
    onChange({ sectionIdx: ns, artboardIdx: 0 });
  };

  React.useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goSection(-1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); goSection(1); }
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => {
    const r = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / artboard.width, (vp.h - 260) / artboard.height, 2));

  const Arrow = ({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        position: 'absolute',
        top: '50%',
        [dir]: 28,
        transform: 'translateY(-50%)',
        border: 'none',
        background: 'rgba(255,255,255,.08)',
        color: 'rgba(255,255,255,.9)',
        width: 44,
        height: 44,
        borderRadius: 22,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} />
      </svg>
    </button>
  );

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(8,12,22,.72)',
        backdropFilter: 'blur(14px)',
        fontFamily: fontDisplay,
        color: '#fff',
      }}
    >
      {/* top bar */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, display: 'flex', alignItems: 'flex-start', padding: '16px 20px 0', gap: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{section.title}</div>
          {section.subtitle && <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2, fontFamily: fontMono }}>{section.subtitle}</div>}
        </div>
        <div style={{ flex: 1 }} />
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.7)', width: 32, height: 32, borderRadius: 16, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      {/* centered card */}
      <div style={{ position: 'absolute', top: 64, bottom: 56, left: 100, right: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: artboard.width * scale, height: artboard.height * scale, position: 'relative' }}>
          <div
            style={{
              width: artboard.width,
              height: artboard.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              background: artboard.background ?? '#0E162B',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 20px 80px rgba(0,0,0,.5)',
            }}
          >
            {artboard.render()}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, opacity: 0.85, textAlign: 'center' }}>
          {artboard.label}
          <span style={{ opacity: 0.5, marginLeft: 10, fontVariantNumeric: 'tabular-nums' }}>
            {idx + 1} / {peers.length}
          </span>
        </div>
      </div>

      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      {/* dots */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {peers.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onChange({ ...target, artboardIdx: i })}
            style={{ border: 'none', padding: 0, cursor: 'pointer', width: 6, height: 6, borderRadius: 3, background: i === idx ? '#fff' : 'rgba(255,255,255,.3)' }}
          />
        ))}
      </div>
    </div>,
    document.body,
  );
}
