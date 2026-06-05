// Game state: reducer, transitions, and the end-game scoring / verdict logic.

import { STAT_KEYS, type StatKey, type Stats } from '../design/tokens';
import { SCAM_GAME, TOTAL_YEARS, yearEvent, AVATARS } from './content';
import type { Choice, Counters, GameState, Scenario } from './types';

export const STARTING_STATS: Stats = {
  brain: 50,
  rep: 50,
  squad: 50,
  wallet: 50,
  armour: 50,
  receipts: 50,
  brain2: 50,
};

const STARTING_COUNTERS: Counters = {
  scamFlags: 0,
  factChecks: 0,
  harmfulAvoided: 0,
  timesScammed: 0,
  friendsProtected: 0,
};

export const initialState: GameState = {
  phase: 'title',
  year: 0,
  username: 'sg_student_2026',
  avatar: AVATARS[0],
  avatarIndex: 0,
  stats: { ...STARTING_STATS },
  flags: {},
  counters: { ...STARTING_COUNTERS },
  activeScenario: null,
  chosenIndex: null,
  scamFound: [],
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

function applyDeltas(stats: Stats, deltas: Partial<Record<StatKey, number>>): Stats {
  const next = { ...stats };
  for (const k of STAT_KEYS) {
    if (deltas[k]) next[k] = clamp(next[k] + (deltas[k] as number));
  }
  return next;
}

// ─────────────────────────────────────────────────────────────
// Actions
// ─────────────────────────────────────────────────────────────
export type Action =
  | { type: 'START' }
  | { type: 'SET_AVATAR'; index: number }
  | { type: 'SET_USERNAME'; value: string }
  | { type: 'BEGIN' }
  | { type: 'CHOOSE'; index: number }
  | { type: 'SCAM_SUBMIT'; found: string[] }
  | { type: 'NEXT' }
  | { type: 'RESTART' };

// Set up whatever happens in a given year.
function enterYear(state: GameState, year: number): GameState {
  if (year > TOTAL_YEARS) {
    return { ...state, phase: 'report', year: TOTAL_YEARS };
  }
  const event = yearEvent(year, state.flags);
  if (event.type === 'scam') {
    return { ...state, phase: 'scam', year, activeScenario: null, chosenIndex: null, scamFound: [] };
  }
  return { ...state, phase: 'scenario', year, activeScenario: event.scenario, chosenIndex: null };
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START':
      return { ...state, phase: 'setup' };

    case 'SET_AVATAR':
      return { ...state, avatarIndex: action.index, avatar: AVATARS[action.index] };

    case 'SET_USERNAME':
      return { ...state, username: action.value };

    case 'BEGIN':
      return enterYear(state, 1);

    case 'CHOOSE': {
      const scenario = state.activeScenario;
      if (!scenario) return state;
      const choice = scenario.choices[action.index];
      const counters = applyChoiceCounters(state.counters, choice);
      const flags = choice.setsFlag ? { ...state.flags, [choice.setsFlag]: true } : state.flags;
      return {
        ...state,
        stats: applyDeltas(state.stats, choice.deltas),
        counters,
        flags,
        chosenIndex: action.index,
        phase: 'consequence',
      };
    }

    case 'SCAM_SUBMIT': {
      const found = action.found;
      const correct = SCAM_GAME.flags.filter((f) => f.correct && found.includes(f.id)).length;
      const missed = SCAM_GAME.flags.filter((f) => f.correct && !found.includes(f.id)).length;
      const stats = applyDeltas(state.stats, {
        armour: correct * SCAM_GAME.perCorrect,
        wallet: -missed * SCAM_GAME.perMiss,
      });
      return {
        ...state,
        stats,
        scamFound: found,
        counters: { ...state.counters, scamFlags: state.counters.scamFlags + correct },
        phase: 'scamResult',
      };
    }

    case 'NEXT':
      return enterYear(state, state.year + 1);

    case 'RESTART':
      // Keep the chosen identity, reset the run.
      return {
        ...initialState,
        username: state.username,
        avatar: state.avatar,
        avatarIndex: state.avatarIndex,
      };

    default:
      return state;
  }
}

function applyChoiceCounters(counters: Counters, choice: Choice): Counters {
  return {
    scamFlags: counters.scamFlags,
    factChecks: counters.factChecks + (choice.factCheck ? 1 : 0),
    harmfulAvoided: counters.harmfulAvoided + (choice.harmful ? 0 : 1),
    timesScammed: counters.timesScammed + (choice.scammed ? 1 : 0),
    friendsProtected: counters.friendsProtected + (choice.protectedFriend ? 1 : 0),
  };
}

// ─────────────────────────────────────────────────────────────
// Derived helpers
// ─────────────────────────────────────────────────────────────

// In-game age + secondary level for a given year (matches the design's chips).
export function ageFor(year: number): number {
  return 12 + Math.max(1, year);
}
export function secFor(year: number): number {
  return Math.min(4, Math.max(1, year));
}

// Deltas → highlight/direction maps for the persistent TopBar.
export function deltaMaps(choice: Choice): {
  highlights: Partial<Record<StatKey, boolean>>;
  directions: Partial<Record<StatKey, 'up' | 'down'>>;
} {
  const highlights: Partial<Record<StatKey, boolean>> = {};
  const directions: Partial<Record<StatKey, 'up' | 'down'>> = {};
  for (const k of STAT_KEYS) {
    const d = choice.deltas[k];
    if (d) {
      highlights[k] = true;
      directions[k] = d > 0 ? 'up' : 'down';
    }
  }
  return { highlights, directions };
}

// 0–100 weighted wellbeing index → a 0–1000 "Digital Safety Score".
export function digitalSafetyScore(stats: Stats): number {
  const positives = (stats.brain + stats.rep + stats.squad + stats.wallet + stats.armour + stats.brain2) / 6;
  const footprint = 100 - stats.receipts; // smaller footprint is healthier
  const raw = positives * 0.72 + footprint * 0.28;
  return Math.round(raw * 10);
}

export interface Verdict {
  prefix: string;
  highlight: string;
}

// A flavour verdict driven by the standout stats, then the overall score.
export function verdictFor(stats: Stats, score: number): Verdict {
  const split = (s: string): Verdict => {
    const parts = s.split(' ');
    return { highlight: parts.pop() as string, prefix: parts.join(' ') };
  };
  if (stats.brain2 >= 68 && stats.receipts <= 38) return split('Quietly Wise');
  if (stats.armour >= 72) return split('Scam Proof');
  if (stats.receipts >= 62) return split('Chronically Online');
  if (stats.squad >= 72) return split('Ride or Die');
  if (score >= 760) return split('Level Headed');
  if (score >= 600) return split('Still Learning');
  return split('Touch Grass');
}

// Standout-moment rows for the Report Card.
export function standoutMoments(counters: Counters): { label: string; value: number; good: boolean }[] {
  return [
    { label: 'Scam red flags identified', value: counters.scamFlags, good: true },
    { label: 'Posts verified before reacting', value: counters.factChecks, good: true },
    { label: 'Harmful actions avoided', value: counters.harmfulAvoided, good: true },
    { label: 'Friends protected', value: counters.friendsProtected, good: true },
    { label: 'Times scammed', value: counters.timesScammed, good: false },
  ];
}

export type { Scenario };
