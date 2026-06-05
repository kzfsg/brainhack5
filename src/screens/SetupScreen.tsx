import { T, fontDisplay, fontMono, rgba, STAT_KEYS } from '../design/tokens';
import { StatBar, PrimaryButton, GhostButton, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';
import { AVATARS } from '../game/content';

export function SetupScreen() {
  const { state, dispatch } = useGame();

  const reroll = () => dispatch({ type: 'SET_AVATAR', index: Math.floor(Math.random() * AVATARS.length) });

  return (
    <Screen scroll>
      <div style={{ padding: '24px 24px 24px', display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}
          >
            <input
              value={state.username}
              maxLength={20}
              onChange={(e) => dispatch({ type: 'SET_USERNAME', value: e.target.value })}
              spellCheck={false}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: fontDisplay,
                fontSize: 16,
                color: T.ink,
              }}
            />
            <span style={{ color: state.username.trim() ? T.teal : T.ink3, fontSize: 14 }}>{state.username.trim() ? '✓' : '…'}</span>
          </div>
        </div>

        {/* avatar */}
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.ink3, letterSpacing: '0.12em', marginBottom: 10, fontWeight: 600 }}>
            PICK YOUR AVATAR
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {AVATARS.map((a, i) => (
              <div
                key={a}
                onClick={() => dispatch({ type: 'SET_AVATAR', index: i })}
                style={{
                  aspectRatio: '1',
                  borderRadius: 999,
                  background: i === state.avatarIndex ? rgba(T.teal, 0.18) : T.bgCard,
                  border: `2px solid ${i === state.avatarIndex ? T.teal : T.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  cursor: 'pointer',
                  boxShadow: i === state.avatarIndex ? `0 0 16px ${rgba(T.teal, 0.3)}` : 'none',
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
            <GhostButton size="lg" onClick={reroll}>
              ↻ Reroll
            </GhostButton>
          </div>
          <div style={{ flex: 1 }}>
            <PrimaryButton size="lg" onClick={() => dispatch({ type: 'BEGIN' })}>
              Begin Year 1 →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}
