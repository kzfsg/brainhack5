import React from 'react';
import { T, fontDisplay, fontMono, fontSerif } from '../design/tokens';
import { Shield, Pill, PrimaryButton, Screen } from '../design/ui/DigiLifeUI';
import { useGame } from '../game/GameContext';

export function TitleScreen() {
  const { dispatch } = useGame();
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
        <div style={{ fontFamily: fontMono, fontSize: 10, color: T.ink3, letterSpacing: '0.24em' }}>v0.1 · BETA</div>

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
          <PrimaryButton size="lg" onClick={() => dispatch({ type: 'START' })}>
            Start Your Digital Life →
          </PrimaryButton>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 4 }}>
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
