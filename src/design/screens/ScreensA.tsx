// Screens 01–04: Title, Setup, Main Game, Viral Clip.
// Ported from the design prototype's digilife-screens-a.jsx.

import React from 'react';
import { T, fontDisplay, fontMono, fontSerif, rgba, STAT_KEYS, type Stats } from '../tokens';
import {
  Shield,
  Pill,
  CategoryTag,
  StatBar,
  ChoiceButton,
  PrimaryButton,
  GhostButton,
  TopBar,
  ProgressDots,
  Screen,
} from '../ui/DigiLifeUI';

const LOOP_STATS: Stats = { brain: 62, rep: 54, squad: 48, wallet: 52, armour: 40, receipts: 22, brain2: 55 };

// ═════════════════════════════════════════════════════════════
// 01 · TITLE SCREEN
// ═════════════════════════════════════════════════════════════
export function ScreenTitle() {
  const [appear, setAppear] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setAppear(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 28px 30px',
        }}
      >
        {/* top spacer + version */}
        <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.24em' }}>v0.1 · BETA</div>

        {/* hero */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: appear ? 1 : 0,
            transform: `translateY(${appear ? 0 : 14}px)`,
          }}
        >
          <Shield size={112} glow />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: fontMono, fontSize: 13, color: T.teal, letterSpacing: '0.4em', fontWeight: 600, marginBottom: 18 }}>
              DIGILIFE
            </div>
            <h1
              style={{
                fontFamily: fontDisplay,
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: '-0.03em',
                color: T.ink,
              }}
            >
              <span>Pause.</span>
              <br />
              <span style={{ color: T.teal }}>Think.</span>
              <br />
              <span>Protect.</span>
            </h1>
            <div
              style={{
                fontFamily: fontSerif,
                fontStyle: 'italic',
                fontSize: 17,
                color: T.ink2,
                marginTop: 22,
                lineHeight: 1.4,
                maxWidth: 280,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Your feed is the challenge.
              <br />
              Your choices are the shield.
            </div>
          </div>
        </div>

        {/* CTA + meta */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
            opacity: appear ? 1 : 0,
            transform: `translateY(${appear ? 0 : 14}px)`,
          }}
        >
          <PrimaryButton size="lg">Start Your Digital Life →</PrimaryButton>
          <div style={{ textAlign: 'center', fontSize: 14, color: T.ink2, textDecoration: 'underline', textUnderlineOffset: 5 }}>
            How to play
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 16 }}>
            <Pill>SCAMS</Pill>
            <Pill>MISINFO</Pill>
            <Pill>CYBERBULLYING</Pill>
            <Pill>SG · 13–18</Pill>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 02 · CHARACTER SETUP
// ═════════════════════════════════════════════════════════════
export function ScreenSetup() {
  const [selected, setSelected] = React.useState(0);
  const avatars = ['🦊', '🐯', '🐼', '🐸', '🦉', '🐙'];
  return (
    <Screen scroll>
      <div style={{ padding: '24px 24px 24px', display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
        {/* header */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.teal, letterSpacing: '0.2em', fontWeight: 600 }}>STEP 1 OF 1</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 32, fontWeight: 700, marginTop: 6, letterSpacing: '-0.02em' }}>Who are you?</div>
          <div style={{ fontSize: 14, color: T.ink3, marginTop: 4 }}>Build the teen you'll play as.</div>
        </div>

        {/* username */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3, letterSpacing: '0.12em', marginBottom: 8, fontWeight: 600 }}>
            USERNAME
          </div>
          <div
            style={{
              background: T.bgCard,
              border: `1.5px solid ${T.line}`,
              borderRadius: 14,
              padding: '14px 16px',
              fontSize: 16,
              color: T.ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              sg_student_2026
              <span style={{ color: T.teal, marginLeft: 1, animation: 'dlblink 1s steps(2) infinite' }}>|</span>
            </span>
            <span style={{ color: T.ink3, fontSize: 13 }}>✓</span>
          </div>
        </div>

        {/* avatar */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3, letterSpacing: '0.12em', marginBottom: 10, fontWeight: 600 }}>
            PICK YOUR AVATAR
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {avatars.map((a, i) => (
              <div
                key={a}
                onClick={() => setSelected(i)}
                style={{
                  aspectRatio: '1',
                  borderRadius: 999,
                  background: i === selected ? rgba(T.teal, 0.18) : T.bgCard,
                  border: `2px solid ${i === selected ? T.teal : T.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  cursor: 'pointer',
                  boxShadow: i === selected ? `0 0 16px ${rgba(T.teal, 0.3)}` : 'none',
                  transition: 'all 0.25s',
                }}
              >
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* context */}
        <div style={{ background: rgba(T.teal, 0.05), border: `1px dashed ${rgba(T.teal, 0.3)}`, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.teal, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 6 }}>
            YOUR STARTING CONTEXT
          </div>
          <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.45 }}>
            Sec 1, neighbourhood school, lives in a 4-room HDB in Tampines.
          </div>
        </div>

        {/* status bars */}
        <div>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 11,
              color: T.ink3,
              letterSpacing: '0.12em',
              marginBottom: 12,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>STARTING STATUS</span>
            <span style={{ color: T.teal }}>ALL 50%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {STAT_KEYS.map((k, i) => (
              <StatBar key={k} statKey={k} value={50} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <div style={{ width: 110 }}>
            <GhostButton size="lg">↻ Reroll</GhostButton>
          </div>
          <div style={{ flex: 1 }}>
            <PrimaryButton size="lg">Begin Year 1 →</PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 03 · MAIN GAME SCREEN
// ═════════════════════════════════════════════════════════════
export function ScreenMainGame() {
  return (
    <Screen>
      <TopBar age={14} sec={2} subtitle="SG_STUDENT_2026" stats={LOOP_STATS} />

      <div style={{ flex: 1, padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* scenario card */}
        <div
          style={{
            background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgCard2} 100%)`,
            border: `1.5px solid ${T.line}`,
            borderRadius: 20,
            padding: '18px 18px 20px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: T.ink3, letterSpacing: '0.06em' }}>⏱ 12:47 AM</span>
            <CategoryTag type="misinfo" />
          </div>
          <div style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, letterSpacing: '-0.01em' }}>
            The Viral Clip
          </div>
          <div style={{ fontSize: 15, color: T.ink2, lineHeight: 1.5 }}>
            A video pops up: someone from a nearby school yelling at a teacher outside a mall. Comments are going feral…
          </div>
          <div style={{ marginTop: 14, fontSize: 14, color: T.teal, fontWeight: 600 }}>Tap a choice ↓</div>
        </div>

        {/* choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ChoiceButton letter="A" color={T.coral} delay={0}>
            Post a spicy hot take for engagement
          </ChoiceButton>
          <ChoiceButton letter="B" color={T.teal} delay={100}>
            Ask for the full context before judging
          </ChoiceButton>
          <ChoiceButton letter="C" color={T.purple} delay={200}>
            Remind people not to expose or harass
          </ChoiceButton>
        </div>

        {/* footer */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
          <ProgressDots current={2} total={6} />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: `1px solid ${T.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: T.ink2,
              fontSize: 16,
            }}
          >
            ⟲
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════
// 04 · VIRAL CLIP SCENARIO (full content)
// ═════════════════════════════════════════════════════════════
export function ScreenViralClip() {
  return (
    <Screen scroll>
      <TopBar age={14} sec={2} subtitle="SG_STUDENT_2026" stats={LOOP_STATS} />

      <div style={{ flex: 1, padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* scenario card with full content */}
        <div
          style={{
            background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgCard2} 100%)`,
            border: `1.5px solid ${rgba(T.gold, 0.25)}`,
            borderRadius: 20,
            padding: '16px 18px 18px',
            boxShadow: `0 12px 28px rgba(0,0,0,0.25), 0 0 0 1px ${rgba(T.gold, 0.08)}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: T.ink3 }}>⏱ 12:47 AM</span>
            <CategoryTag type="misinfo" />
          </div>

          <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, letterSpacing: '-0.01em' }}>
            The Viral Clip
          </div>

          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5, marginBottom: 12 }}>
            A video pops up: someone from a nearby school yelling at a teacher outside a mall. Caption reads:
          </div>

          {/* pulled-out quote */}
          <div
            style={{
              background: rgba(T.gold, 0.06),
              borderLeft: `3px solid ${T.gold}`,
              borderRadius: '0 10px 10px 0',
              padding: '12px 14px',
              margin: '0 0 12px',
            }}
          >
            <div style={{ fontFamily: fontSerif, fontStyle: 'italic', color: T.gold, fontSize: 15, lineHeight: 1.4, fontWeight: 600 }}>
              "This student got caught cheating and STILL had the audacity to scream. Name and shame."
            </div>
          </div>

          <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
            Clip is 9 seconds long. Clearly starts in the middle. Someone claims to know the student's name. Another says the teacher started it.
          </div>

          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px dashed ${T.line}`, fontSize: 16, color: T.ink, fontWeight: 700 }}>
            What do you do?
          </div>
        </div>

        {/* choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <ChoiceButton letter="A" color={T.coral} delay={0}>
            Post a spicy hot take for engagement
          </ChoiceButton>
          <ChoiceButton letter="B" color={T.teal} delay={100}>
            Ask for the full context before judging
          </ChoiceButton>
          <ChoiceButton letter="C" color={T.purple} delay={200}>
            Remind people not to expose or harass
          </ChoiceButton>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <ProgressDots current={2} total={6} />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: `1px solid ${T.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: T.ink2,
              fontSize: 16,
            }}
          >
            ⟲
          </div>
        </div>
      </div>
    </Screen>
  );
}
