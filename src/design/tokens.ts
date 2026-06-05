// Shared design tokens for the DigiLife hi-fi screens.
// Ported verbatim from the design prototype (digilife-ui.jsx) so the
// recreated screens stay pixel-faithful to the mockups.

export const T = {
  bg: '#0E162B',
  bgRaised: '#172240',
  bgCard: '#1B2748',
  bgCard2: '#22305A',
  line: '#2E3D63',
  lineSoft: '#28365A',
  ink: '#EDF1FB',
  ink2: '#A6B0CC',
  ink3: '#6B7596',
  teal: '#2DD4BF',
  tealDeep: '#0E9A89',
  coral: '#FB7185',
  coralDeep: '#E11D48',
  gold: '#FBBF24',
  goldDeep: '#D97706',
  purple: '#A78BFA',
  purpleDeep: '#7C3AED',
} as const;

// Font stacks.
export const fontDisplay = "'Space Grotesk', system-ui, sans-serif";
export const fontBody = "'Space Grotesk', system-ui, sans-serif";
export const fontMono = "'JetBrains Mono', ui-monospace, monospace";
export const fontSerif = "'Fraunces', Georgia, serif";

// rgba from a hex string.
export function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export type StatKey =
  | 'brain'
  | 'rep'
  | 'squad'
  | 'wallet'
  | 'armour'
  | 'receipts'
  | 'brain2';

export interface StatMeta {
  icon: string;
  label: string;
  sub: string;
  color: string;
  tone: 'positive' | 'negative';
}

// Stat metadata — color, icon (emoji per brief), label, sublabel.
export const STATS: Record<StatKey, StatMeta> = {
  brain: { icon: '🧠', label: 'Brain Battery', sub: 'Mental wellbeing', color: T.teal, tone: 'positive' },
  rep: { icon: '⭐', label: 'Rep Meter', sub: 'How others see you', color: T.purple, tone: 'positive' },
  squad: { icon: '💛', label: 'Squad Strength', sub: 'Friendships', color: T.gold, tone: 'positive' },
  wallet: { icon: '💳', label: 'Wallet HP', sub: 'Money', color: T.coral, tone: 'positive' },
  armour: { icon: '🛡️', label: 'Scam Armour', sub: 'Scam protection', color: T.teal, tone: 'positive' },
  receipts: { icon: '🌐', label: 'Internet Receipts', sub: 'Digital footprint', color: T.coral, tone: 'negative' },
  brain2: { icon: '💡', label: 'Big Brain Mode', sub: 'Critical thinking', color: T.gold, tone: 'positive' },
};

export const STAT_KEYS: StatKey[] = ['brain', 'rep', 'squad', 'wallet', 'armour', 'receipts', 'brain2'];

export type Stats = Record<StatKey, number>;
