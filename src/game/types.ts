// Core game types for DigiLife.

import type { StatKey, Stats } from '../design/tokens';

export type { StatKey, Stats };

export type Deltas = Partial<Record<StatKey, number>>;

export type ChoiceColor = 'coral' | 'teal' | 'purple';

export type Category = 'misinfo' | 'scam' | 'bully' | 'reactive';

// A single A/B/C option in a scenario.
export interface Choice {
  letter: 'A' | 'B' | 'C';
  color: ChoiceColor;
  text: string;
  // Stat changes applied when this choice is taken.
  deltas: Deltas;
  // Narrative shown on the Consequence screen.
  outcome: string;
  // Counter / flag side-effects (drive the Report Card + the Receipts callback).
  harmful?: boolean; // a harmful action — otherwise counts toward "harmful actions avoided"
  factCheck?: boolean; // paused to verify before reacting
  protectedFriend?: boolean; // stood up for / protected someone
  scammed?: boolean; // got scammed
  setsFlag?: string; // sets a story flag, e.g. 'postedHotTake'
}

// The aged "dug-up post" rendered on the Receipts callback scenario.
export interface CallbackPost {
  handle: string;
  avatar: string;
  time: string;
  text: string;
  likes: string;
  reshares: string;
  comments: string;
  intro: string; // the "someone screenshotted your post…" framing line
}

export interface Scenario {
  id: string;
  category: Category;
  time: string; // timestamp chip, e.g. '12:47 AM'
  title: string;
  setup: string; // opening paragraph
  quote?: string; // pulled-out quote block
  detail?: string; // extra paragraph after the quote
  prompt?: string; // closing question, e.g. 'What do you do?'
  choices: Choice[];
  variant?: 'receipts'; // renders the aged callback card instead of a plain card
  callback?: CallbackPost;
}

// Spot-the-Scam mini-game.
export interface ScamFlag {
  id: string;
  label: string;
  correct: boolean; // is this an actual red flag?
}

export interface ScamGame {
  sender: string;
  phone: string;
  banner: string;
  body: string;
  link: string;
  body2: string;
  flags: ScamFlag[];
  perCorrect: number; // armour gained per correct flag
  perMiss: number; // wallet lost per missed flag
}

export type GamePhase = 'title' | 'setup' | 'scenario' | 'consequence' | 'scam' | 'scamResult' | 'report';

export interface Counters {
  scamFlags: number; // red flags correctly identified
  factChecks: number; // times you verified before reacting
  harmfulAvoided: number; // harmful actions you didn't take
  timesScammed: number;
  friendsProtected: number;
}

export interface GameState {
  phase: GamePhase;
  year: number; // 1..TOTAL_YEARS
  username: string;
  avatar: string; // emoji
  avatarIndex: number;
  stats: Stats;
  flags: Record<string, boolean>;
  counters: Counters;
  activeScenario: Scenario | null; // the scenario being shown / just resolved
  chosenIndex: number | null; // index into activeScenario.choices for Consequence
  scamFound: string[]; // flag ids the player selected, for the scam result screen
}
