// Screens 05–08: Consequence, Spot the Scam, Receipts Resurface, Report Card.
// Ported from the design prototype's digilife-screens-b.jsx.

import React from 'react';
import { T, fontDisplay, fontMono, fontSerif, rgba, STATS, STAT_KEYS, type StatKey, type Stats } from '../tokens';
import {
  Shield,
  StatChangePill,
  PrimaryButton,
  GhostButton,
  TopBar,
  ProgressDots,
  Screen,
} from '../ui/DigiLifeUI';

// ═════════════════════════════════════════════════════════════
// 05 · CONSEQUENCE SCREEN
// ═════════════════════════════════════════════════════════════
export function ScreenConsequence() {
  // animated stats: start from pre-choice values, animate to post-choice
  const [stats, setStats] = React.useState<Stats>({ brain: 62, rep: 54, squad: 48, wallet: 52, armour: 40, receipts: 22, brain2: 55 });
  const [highlights, setHighlights] = React.useState<Partial<Record<StatKey, boolean>>>({});
  const [deltas, setDeltas] = React.useState<Partial<Record<StatKey, 'up' | 'down'>>>({});

  React.useEffect(() => {
    const t = setTimeout(() => {
      setStats({ brain: 54, rep: 64, squad: 48, wallet: 52, armour: 40, receipts: 32, brain2: 55 });
      setHighlights({ brain: true, rep: true, receipts: true });
      setDeltas({ brain: 'down', rep: 'up', receipts: 'up' });
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen scroll>
      <TopBar age={14} sec={2} subtitle="SG_STUDENT_2026" stats={stats} highlights={highlights} deltas={deltas} />

      <div style={{ flex: 1, padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* outcome card */}
        <div
          style={{
            background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgCard2} 100%)`,
            border: `1.5px solid ${T.line}`,
            borderRadius: 20,
            padding: '18px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
          }}
        >
          {/* you chose */}
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 8 }}>
            YOU CHOSE
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingBottom: 14,
              borderBottom: `1px dashed ${T.line}`,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                background: T.coral,
                color: '#2b0a14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fontMono,
                fontWeight: 800,
                fontSize: 14,
                boxShadow: `0 4px 12px ${rgba(T.coral, 0.4)}`,
              }}
            >
              A
            </div>
            <div style={{ fontSize: 14, color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>Post a spicy hot take for engagement</div>
          </div>

          <div style={{ fontSize: 15, color: T.ink, lineHeight: 1.55 }}>
            Your post goes viral overnight — <span style={{ color: T.teal, fontWeight: 700 }}>2K likes, 800 reshares</span>. But the comment
            section turns toxic fast. People are arguing about{' '}
            <em style={{ fontFamily: fontSerif, fontStyle: 'italic' }}>you</em>, not the original video. You're trending for the wrong reasons.
          </div>

          {/* stat pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            <StatChangePill statKey="rep" delta={10} delay={0} />
            <StatChangePill statKey="brain" delta={-8} delay={150} />
            <StatChangePill statKey="receipts" delta={10} delay={300} />
          </div>
        </div>

        {/* receipt saved foreshadowing */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: rgba(T.coral, 0.06),
            border: `1px dashed ${rgba(T.coral, 0.4)}`,
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 18, color: T.coral }}>⟲</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, color: T.coral, letterSpacing: '0.16em', fontWeight: 700 }}>RECEIPT SAVED</div>
            <div style={{ fontSize: 12, color: T.ink2, lineHeight: 1.35, marginTop: 2 }}>
              This post is on record. The internet doesn't forget.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrimaryButton size="lg">Next Year →</PrimaryButton>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressDots current={2} total={6} />
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 06 · SPOT THE SCAM MINI-GAME
// ═════════════════════════════════════════════════════════════
export function ScreenSpotTheScam() {
  const flags = [
    { id: 'link', label: 'Suspicious link', correct: true, found: true },
    { id: 'urg', label: 'Urgent threat', correct: true, found: false },
    { id: 'otp', label: 'Request for OTP', correct: true, found: true },
    { id: 'friendly', label: 'Friendly tone', correct: false, found: true },
    { id: 'prize', label: 'Fake prize', correct: true, found: false },
    { id: 'sender', label: 'Unknown sender', correct: true, found: false },
  ];
  return (
    <Screen scroll>
      <div style={{ padding: '18px 20px 12px', background: rgba(T.gold, 0.05), borderBottom: `1px solid ${rgba(T.gold, 0.25)}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: T.gold, letterSpacing: '0.22em', fontWeight: 700 }}>
              ⚡ MINI-GAME · TEST MODE
            </div>
            <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 800, marginTop: 4, letterSpacing: '-0.01em' }}>Spot the Scam</div>
          </div>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              background: rgba(T.gold, 0.12),
              border: `1px solid ${rgba(T.gold, 0.4)}`,
              fontFamily: fontMono,
              fontSize: 12,
              color: T.gold,
              fontWeight: 700,
            }}
          >
            2 / 6
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* mocked message */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 8 }}>
            INBOUND MESSAGE
          </div>
          <div style={{ background: T.bgCard, border: `1.5px solid ${T.line}`, borderRadius: 18, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: rgba(T.coral, 0.18),
                  color: T.coral,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                !
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>SecureVerify Centre</div>
                <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3 }}>+65 XXXX XXXX · now</div>
              </div>
            </div>

            <div style={{ background: '#0a0f1e', borderRadius: 12, padding: 14, border: `1px solid ${T.line}` }}>
              <div
                style={{
                  background: T.coral,
                  color: '#2b0a14',
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 10,
                  letterSpacing: '0.02em',
                }}
              >
                🚨 URGENT: Your account has been suspended!
              </div>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5 }}>
                Dear user, verify your account IMMEDIATELY or it will be permanently locked.
              </div>
              <div style={{ fontSize: 12, color: '#6BA9F0', textDecoration: 'underline', marginTop: 8, wordBreak: 'break-all', fontFamily: fontMono }}>
                verify-acct-sg.xyz/login
              </div>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5, marginTop: 8 }}>
                Enter your OTP to confirm identity. Your prize of $500 NTUC voucher awaits!
              </div>
            </div>
          </div>
        </div>

        {/* flags */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 10 }}>
            TAP THE RED FLAGS YOU SPOT
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {flags.map((f) => {
              const isTeal = f.found && f.correct;
              const isCoral = f.found && !f.correct;
              const bg = isTeal ? rgba(T.teal, 0.1) : isCoral ? rgba(T.coral, 0.08) : 'rgba(255,255,255,0.025)';
              const bd = isTeal ? T.teal : isCoral ? T.coral : T.line;
              const fg = isTeal ? T.teal : isCoral ? T.coral : T.ink;
              return (
                <div
                  key={f.id}
                  style={{
                    padding: '11px 12px',
                    borderRadius: 12,
                    background: bg,
                    border: `1.5px solid ${bd}`,
                    fontSize: 13,
                    color: fg,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    lineHeight: 1.2,
                  }}
                >
                  {isTeal && <span>✓</span>}
                  {isCoral && <span>✗</span>}
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* results panel */}
        <div
          style={{
            marginTop: 'auto',
            background: T.bgCard,
            border: `1px solid ${T.line}`,
            borderRadius: 14,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: T.teal, fontWeight: 600 }}>✓ Each correct flag</span>
            <span style={{ fontFamily: fontMono, color: T.teal, fontWeight: 700 }}>🛡️ Armour +6</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: T.coral, fontWeight: 600 }}>✗ Each missed flag</span>
            <span style={{ fontFamily: fontMono, color: T.coral, fontWeight: 700 }}>💳 Wallet −4</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <GhostButton size="md">Skip</GhostButton>
          </div>
          <div style={{ flex: 2 }}>
            <PrimaryButton size="md" accent={T.gold}>
              Lock In Answers
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 07 · RECEIPTS RESURFACE — delayed consequence
// ═════════════════════════════════════════════════════════════
export function ScreenReceipts() {
  const stats: Stats = { brain: 50, rep: 72, squad: 52, wallet: 58, armour: 44, receipts: 68, brain2: 60 };
  const outcomes: { stat: StatKey; cond: string; tint: string; txt: string; icon: string }[] = [
    { stat: 'receipts', cond: 'HIGH', tint: T.coral, txt: 'harder to manage', icon: '🌐' },
    { stat: 'rep', cond: 'HIGH', tint: T.purple, txt: 'people trust your apology', icon: '⭐' },
    { stat: 'brain2', cond: 'HIGH', tint: T.gold, txt: 'you handle it confidently', icon: '💡' },
  ];
  return (
    <Screen scroll>
      <TopBar age={15} sec={3} subtitle="SG_STUDENT_2026 · YEAR 3" stats={stats} highlights={{ receipts: true }} />

      <div style={{ flex: 1, padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* eyebrow */}
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 11,
            color: T.coral,
            letterSpacing: '0.22em',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14 }}>⟲</span>
          <span>RECEIPTS RESURFACE · 2 YEARS LATER</span>
        </div>

        {/* aged callback card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(168,124,82,0.18), rgba(120,71,30,0.06))',
            border: `2px solid rgba(168,124,82,0.5)`,
            borderRadius: 18,
            padding: 16,
            position: 'relative',
            boxShadow: `0 12px 28px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,200,140,0.08)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: 12,
              background: T.coral,
              color: '#2b0a14',
              fontFamily: fontMono,
              fontSize: 10,
              padding: '5px 10px',
              borderRadius: 6,
              fontWeight: 800,
              letterSpacing: '0.1em',
              boxShadow: `0 4px 12px ${rgba(T.coral, 0.4)}`,
            }}
          >
            FROM YEAR 1
          </div>

          {/* dug-up post screenshot */}
          <div style={{ background: '#1A1208', border: '1px solid rgba(168,124,82,0.4)', borderRadius: 12, padding: 12, transform: 'rotate(-0.6deg)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                paddingBottom: 8,
                borderBottom: '1px dashed rgba(225,190,140,0.3)',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: 'rgba(225,190,140,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                }}
              >
                🦊
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'rgba(245,220,180,0.9)', fontWeight: 700 }}>@sg_student_2026</div>
                <div style={{ fontFamily: fontMono, fontSize: 9, color: 'rgba(225,190,140,0.6)' }}>12:51 AM · 2 yrs ago</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(245,220,180,0.95)', lineHeight: 1.45, fontFamily: fontSerif, fontStyle: 'italic' }}>
              "this video says it all. wild that they let stuff like this slide at this school 🤡 name and shame fr"
            </div>
            <div style={{ display: 'flex', gap: 14, fontFamily: fontMono, fontSize: 10, color: 'rgba(225,190,140,0.6)', marginTop: 10 }}>
              <span>♥ 2,041</span>
              <span>↺ 812</span>
              <span>💬 304</span>
            </div>
          </div>

          <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.5, marginTop: 14, fontWeight: 500 }}>
            Someone screenshotted your Year 1 hot take. It's circulating again — right when you're being considered for{' '}
            <span style={{ color: T.gold, fontWeight: 700 }}>student leader</span>.
          </div>
        </div>

        {/* conditional outcome panel */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600, marginBottom: 8 }}>
            WHAT HAPPENS DEPENDS ON YOU NOW
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {outcomes.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: rgba(r.tint, 0.08),
                  border: `1px solid ${rgba(r.tint, 0.3)}`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: rgba(r.tint, 0.18),
                    color: r.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                  }}
                >
                  {r.icon}
                </div>
                <div style={{ flex: 1, fontSize: 13, color: T.ink2 }}>
                  <span style={{ fontFamily: fontMono, color: r.tint, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em' }}>IF {r.cond}</span>
                  <span style={{ margin: '0 6px', color: T.ink3 }}>→</span>
                  {r.txt}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton size="lg" accent={T.coral}>
            See what happens →
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 08 · REPORT CARD
// ═════════════════════════════════════════════════════════════
export function ScreenReportCard() {
  const finals: Stats = { brain: 78, rep: 71, squad: 66, wallet: 82, armour: 74, receipts: 28, brain2: 85 };
  const moments = [
    { label: 'Scam red flags identified', value: 7, good: true },
    { label: 'Fake posts fact-checked', value: 4, good: true },
    { label: 'Harmful actions avoided', value: 3, good: true },
    { label: 'Times scammed', value: 1, good: false },
    { label: 'Friends protected', value: 2, good: true },
  ];

  return (
    <Screen scroll>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {/* shareable card */}
        <div
          style={{
            background: `linear-gradient(180deg, #14213F 0%, #0E162B 100%)`,
            border: `1.5px solid ${T.line}`,
            borderRadius: 22,
            padding: 20,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          {/* shield watermark */}
          <div style={{ position: 'absolute', top: 14, right: 14, opacity: 0.6 }}>
            <Shield size={28} accent={T.teal} />
          </div>

          {/* header */}
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.teal, letterSpacing: '0.24em', fontWeight: 700 }}>YOUR DIGITAL LIFE</div>
          <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>@sg_student_2026 · Sec 1 → Sec 4</div>

          {/* verdict */}
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px dashed ${T.line}` }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600 }}>VERDICT</div>
            <div style={{ fontFamily: fontDisplay, fontSize: 42, fontWeight: 800, lineHeight: 0.95, marginTop: 6, letterSpacing: '-0.03em' }}>
              Quietly <span style={{ color: T.teal }}>Wise</span>
            </div>
          </div>

          {/* stats grid */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {STAT_KEYS.map((k) => {
              const meta = STATS[k];
              const v = finals[k];
              const tone = meta.tone === 'negative' ? (v < 50 ? T.teal : T.coral) : v > 50 ? meta.color : T.coral;
              return (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '9px 12px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${T.lineSoft}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: T.ink2 }}>
                    <span style={{ fontSize: 13 }}>{meta.icon}</span>
                    <span style={{ fontWeight: 600 }}>{meta.label.split(' ')[0]}</span>
                  </div>
                  <span style={{ fontFamily: fontMono, fontWeight: 800, fontSize: 14, color: tone }}>{v}</span>
                </div>
              );
            })}
          </div>

          {/* standout moments */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600, marginBottom: 8 }}>
              STANDOUT MOMENTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {moments.map((m) => (
                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: T.ink2 }}>
                  <span>{m.label}</span>
                  <span style={{ fontFamily: fontMono, fontWeight: 800, fontSize: 13, color: m.good ? T.teal : T.coral }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* big safety score */}
          <div
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: `1px dashed ${T.line}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600 }}>DIGITAL SAFETY</div>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600 }}>SCORE</div>
            </div>
            <div
              style={{
                fontFamily: fontDisplay,
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                background: `linear-gradient(180deg, ${T.teal}, ${T.tealDeep})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 4px 18px ${rgba(T.teal, 0.4)})`,
              }}
            >
              782
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <div style={{ flex: 1 }}>
            <GhostButton size="md">↻ Live Another Life</GhostButton>
          </div>
          <div style={{ flex: 1 }}>
            <PrimaryButton size="md">↗ Share</PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}
