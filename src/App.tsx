// DigiLife — a playable choice-driven game teaching SG teens to navigate
// scams, misinformation, and cyberbullying. Title → Setup → six yearly
// scenarios (with a Spot-the-Scam mini-game and a delayed Receipts callback)
// → a computed Report Card.

import { GameProvider, useGame } from './game/GameContext';
import { PhoneShell } from './PhoneShell';
import { TitleScreen } from './screens/TitleScreen';
import { SetupScreen } from './screens/SetupScreen';
import { ScenarioScreen } from './screens/ScenarioScreen';
import { ConsequenceScreen } from './screens/ConsequenceScreen';
import { ScamScreen } from './screens/ScamScreen';
import { ReportCardScreen } from './screens/ReportCardScreen';

function Stage() {
  const { state } = useGame();

  let screen;
  switch (state.phase) {
    case 'title':
      screen = <TitleScreen />;
      break;
    case 'setup':
      screen = <SetupScreen />;
      break;
    case 'scenario':
      screen = <ScenarioScreen />;
      break;
    case 'consequence':
      screen = <ConsequenceScreen />;
      break;
    case 'scam':
    case 'scamResult':
      screen = <ScamScreen />;
      break;
    case 'report':
      screen = <ReportCardScreen />;
      break;
    default:
      screen = <TitleScreen />;
  }

  // Re-key on phase + year so each new screen plays its mount animations.
  return (
    <div key={`${state.phase}-${state.year}`} className="screen-enter" style={{ height: '100%' }}>
      {screen}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <PhoneShell>
        <Stage />
      </PhoneShell>
    </GameProvider>
  );
}
