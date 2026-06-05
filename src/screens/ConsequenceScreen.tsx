import { T, fontMono, rgba, STAT_KEYS } from '../design/tokens';
import { StatChangePill, PrimaryButton, TopBar, ProgressDots, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';
import { ageFor, secFor, deltaMaps } from '../game/state';
import { TOTAL_YEARS } from '../game/content';
import type { Choice } from '../game/types';

const COLOR: Record<Choice['color'], string> = { coral: T.coral, teal: T.teal, purple: T.purple };

export function ConsequenceScreen() {
  const { state, dispatch } = useGame();
  const scenario = state.activeScenario;
  if (!scenario || state.chosenIndex === null) return null;

  const choice = scenario.choices[state.chosenIndex];
  const { highlights, directions } = deltaMaps(choice);
  const changed = STAT_KEYS.filter((k) => choice.deltas[k]);
  const leftReceipt = (choice.deltas.receipts ?? 0) > 0;
  const isLast = state.year >= TOTAL_YEARS;

  return (
    <Screen scroll>
      <TopBar
        age={ageFor(state.year)}
        sec={secFor(state.year)}
        subtitle={`${state.username.toUpperCase()} · YEAR ${state.year}`}
        stats={state.stats}
        highlights={highlights}
        deltas={directions}
      />

      <div style={{ flex: 1, padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div
          style={{
            background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgCard2} 100%)`,
            border: `1.5px solid ${T.line}`,
            borderRadius: 20,
            padding: '18px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.16em', fontWeight: 600, marginBottom: 8 }}>YOU CHOSE</div>
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
                background: COLOR[choice.color],
                color: '#0a0d18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fontMono,
                fontWeight: 800,
                fontSize: 14,
                boxShadow: `0 4px 12px ${rgba(COLOR[choice.color], 0.4)}`,
              }}
            >
              {choice.letter}
            </div>
            <div style={{ fontSize: 14, color: T.ink, fontWeight: 500, lineHeight: 1.3 }}>{choice.text}</div>
          </div>

          <div style={{ fontSize: 15, color: T.ink, lineHeight: 1.55 }}>{choice.outcome}</div>

          {changed.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
              {changed.map((k, i) => (
                <StatChangePill key={k} statKey={k} delta={choice.deltas[k] as number} delay={i * 150} />
              ))}
            </div>
          )}
        </div>

        {leftReceipt && (
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
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrimaryButton size="lg" onClick={() => dispatch({ type: 'NEXT' })}>
            {isLast ? 'See your report card →' : 'Next Year →'}
          </PrimaryButton>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressDots current={state.year} total={TOTAL_YEARS} />
          </div>
        </div>
      </div>
    </Screen>
  );
}
