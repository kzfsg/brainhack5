import React from 'react';
import { T, fontDisplay, fontMono, rgba } from '../design/tokens';
import { PrimaryButton, GhostButton, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';
import { SCAM_GAME } from '../game/content';

export function ScamScreen() {
  const { state, dispatch } = useGame();
  const isResult = state.phase === 'scamResult';
  const [selected, setSelected] = React.useState<string[]>([]);

  const found = isResult ? state.scamFound : selected;
  const toggle = (id: string) => {
    if (isResult) return;
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const correctCount = SCAM_GAME.flags.filter((f) => f.correct && found.includes(f.id)).length;
  const missedCount = SCAM_GAME.flags.filter((f) => f.correct && !found.includes(f.id)).length;

  return (
    <Screen scroll>
      <div style={{ padding: '18px 20px 12px', background: rgba(T.gold, 0.05), borderBottom: `1px solid ${rgba(T.gold, 0.25)}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: T.gold, letterSpacing: '0.22em', fontWeight: 700 }}>⚡ MINI-GAME · TEST MODE</div>
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
            {isResult ? `${correctCount} / ${SCAM_GAME.flags.filter((f) => f.correct).length}` : `YEAR ${state.year}`}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* mocked message */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 8 }}>INBOUND MESSAGE</div>
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
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{SCAM_GAME.sender}</div>
                <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3 }}>{SCAM_GAME.phone}</div>
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
                {SCAM_GAME.banner}
              </div>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5 }}>{SCAM_GAME.body}</div>
              <div style={{ fontSize: 12, color: '#6BA9F0', textDecoration: 'underline', marginTop: 8, wordBreak: 'break-all', fontFamily: fontMono }}>
                {SCAM_GAME.link}
              </div>
              <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.5, marginTop: 8 }}>{SCAM_GAME.body2}</div>
            </div>
          </div>
        </div>

        {/* flags */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 10 }}>
            {isResult ? 'RESULTS' : 'TAP THE RED FLAGS YOU SPOT'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SCAM_GAME.flags.map((f) => {
              const picked = found.includes(f.id);
              // During play: picked = teal highlight. In result: green if correctly found,
              // coral if wrongly picked or a real flag that was missed.
              let bg: string = 'rgba(255,255,255,0.025)';
              let bd: string = T.line;
              let fg: string = T.ink;
              let icon = '';
              if (isResult) {
                if (f.correct && picked) {
                  bg = rgba(T.teal, 0.1); bd = T.teal; fg = T.teal; icon = '✓';
                } else if (f.correct && !picked) {
                  bg = rgba(T.coral, 0.08); bd = T.coral; fg = T.coral; icon = '✗'; // missed
                } else if (!f.correct && picked) {
                  bg = rgba(T.coral, 0.08); bd = T.coral; fg = T.coral; icon = '✗'; // false positive
                }
              } else if (picked) {
                bg = rgba(T.teal, 0.1); bd = T.teal; fg = T.teal; icon = '✓';
              }
              return (
                <div
                  key={f.id}
                  onClick={() => toggle(f.id)}
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
                    cursor: isResult ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {icon && <span>{icon}</span>}
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* results / scoring panel */}
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
            <span style={{ color: T.teal, fontWeight: 600 }}>✓ {isResult ? `${correctCount} correct` : 'Each correct flag'}</span>
            <span style={{ fontFamily: fontMono, color: T.teal, fontWeight: 700 }}>
              🛡️ Armour {isResult ? `+${correctCount * SCAM_GAME.perCorrect}` : `+${SCAM_GAME.perCorrect}`}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: T.coral, fontWeight: 600 }}>✗ {isResult ? `${missedCount} missed` : 'Each missed flag'}</span>
            <span style={{ fontFamily: fontMono, color: T.coral, fontWeight: 700 }}>
              💳 Wallet {isResult ? `−${missedCount * SCAM_GAME.perMiss}` : `−${SCAM_GAME.perMiss}`}
            </span>
          </div>
        </div>

        {isResult ? (
          <PrimaryButton size="md" onClick={() => dispatch({ type: 'NEXT' })}>
            Next Year →
          </PrimaryButton>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <GhostButton size="md" onClick={() => dispatch({ type: 'SCAM_SUBMIT', found: [] })}>
                Skip
              </GhostButton>
            </div>
            <div style={{ flex: 2 }}>
              <PrimaryButton size="md" accent={T.gold} onClick={() => dispatch({ type: 'SCAM_SUBMIT', found: selected })}>
                Lock In Answers
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
