import { T, fontDisplay, fontMono, fontSerif, rgba } from '../design/tokens';
import { CategoryTag, ChoiceButton, TopBar, ProgressDots, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';
import { ageFor, secFor } from '../game/state';
import { TOTAL_YEARS } from '../game/content';
import type { Choice, Scenario } from '../game/types';

const COLOR: Record<Choice['color'], string> = { coral: T.coral, teal: T.teal, purple: T.purple };

export function ScenarioScreen() {
  const { state, dispatch } = useGame();
  const scenario = state.activeScenario;
  if (!scenario) return null;

  const subtitle = `${state.username.toUpperCase()} · YEAR ${state.year}`;
  const isReceipts = scenario.variant === 'receipts';

  return (
    <Screen scroll>
      <TopBar
        age={ageFor(state.year)}
        sec={secFor(state.year)}
        subtitle={subtitle}
        stats={state.stats}
        highlights={isReceipts ? { receipts: true } : {}}
      />

      <div style={{ flex: 1, padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {isReceipts ? <ReceiptsCard scenario={scenario} /> : <ScenarioCard scenario={scenario} />}

        {/* choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {scenario.choices.map((c, i) => (
            <ChoiceButton key={c.letter} letter={c.letter} color={COLOR[c.color]} delay={i * 100} onClick={() => dispatch({ type: 'CHOOSE', index: i })}>
              {c.text}
            </ChoiceButton>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <ProgressDots current={state.year} total={TOTAL_YEARS} />
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

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const tinted = scenario.category === 'misinfo' || scenario.category === 'scam';
  const accent = scenario.category === 'scam' ? T.coral : T.gold;
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${T.bgCard} 0%, ${T.bgCard2} 100%)`,
        border: `1.5px solid ${tinted ? rgba(accent, 0.25) : T.line}`,
        borderRadius: 20,
        padding: '16px 18px 18px',
        boxShadow: `0 12px 28px rgba(0,0,0,0.25)${tinted ? `, 0 0 0 1px ${rgba(accent, 0.08)}` : ''}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: T.ink3 }}>⏱ {scenario.time}</span>
        <CategoryTag type={scenario.category} />
      </div>

      <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, letterSpacing: '-0.01em' }}>
        {scenario.title}
      </div>

      <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5, marginBottom: scenario.quote ? 12 : 0 }}>{scenario.setup}</div>

      {scenario.quote && (
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
            {scenario.quote}
          </div>
        </div>
      )}

      {scenario.detail && <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>{scenario.detail}</div>}

      {scenario.prompt && (
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px dashed ${T.line}`, fontSize: 16, color: T.ink, fontWeight: 700 }}>
          {scenario.prompt}
        </div>
      )}
    </div>
  );
}

function ReceiptsCard({ scenario }: { scenario: Scenario }) {
  const post = scenario.callback!;
  return (
    <>
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
              {post.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'rgba(245,220,180,0.9)', fontWeight: 700 }}>{post.handle}</div>
              <div style={{ fontFamily: fontMono, fontSize: 9, color: 'rgba(225,190,140,0.6)' }}>{post.time}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(245,220,180,0.95)', lineHeight: 1.45, fontFamily: fontSerif, fontStyle: 'italic' }}>
            {post.text}
          </div>
          <div style={{ display: 'flex', gap: 14, fontFamily: fontMono, fontSize: 10, color: 'rgba(225,190,140,0.6)', marginTop: 10 }}>
            <span>♥ {post.likes}</span>
            <span>↺ {post.reshares}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>

        <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.5, marginTop: 14, fontWeight: 500 }}>{post.intro}</div>
      </div>

      {scenario.prompt && (
        <div style={{ fontSize: 16, color: T.ink, fontWeight: 700, marginTop: 2 }}>{scenario.prompt}</div>
      )}
    </>
  );
}
