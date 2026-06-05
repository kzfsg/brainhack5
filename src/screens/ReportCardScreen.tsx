import { T, fontDisplay, fontMono, rgba, STATS, STAT_KEYS } from '../design/tokens';
import { Shield, PrimaryButton, GhostButton, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';
import { digitalSafetyScore, verdictFor, standoutMoments } from '../game/state';

export function ReportCardScreen() {
  const { state, dispatch } = useGame();
  const finals = state.stats;
  const score = digitalSafetyScore(finals);
  const verdict = verdictFor(finals, score);
  const moments = standoutMoments(state.counters);

  const share = () => {
    const text = `My DigiLife verdict: ${verdict.prefix} ${verdict.highlight} · Digital Safety Score ${score}/1000`;
    if (navigator.share) {
      navigator.share({ title: 'DigiLife', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).catch(() => {});
    }
  };

  return (
    <Screen scroll>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
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
          <div style={{ position: 'absolute', top: 14, right: 14, opacity: 0.6 }}>
            <Shield size={28} accent={T.teal} />
          </div>

          <div style={{ fontFamily: fontMono, fontSize: 11, color: T.teal, letterSpacing: '0.24em', fontWeight: 700 }}>YOUR DIGITAL LIFE</div>
          <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>
            {state.avatar} @{state.username} · Sec 1 → Sec 4
          </div>

          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px dashed ${T.line}` }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.14em', fontWeight: 600 }}>VERDICT</div>
            <div style={{ fontFamily: fontDisplay, fontSize: 42, fontWeight: 800, lineHeight: 0.95, marginTop: 6, letterSpacing: '-0.03em' }}>
              {verdict.prefix} <span style={{ color: T.teal }}>{verdict.highlight}</span>
            </div>
          </div>

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
              {score}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <div style={{ flex: 1 }}>
            <GhostButton size="md" onClick={() => dispatch({ type: 'RESTART' })}>
              ↻ Live Another Life
            </GhostButton>
          </div>
          <div style={{ flex: 1 }}>
            <PrimaryButton size="md" onClick={share}>
              ↗ Share
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}
