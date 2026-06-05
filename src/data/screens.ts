// The 8 hi-fi screens, in play order. Each maps to a component that renders
// the screen content inside an iPhone-class device frame.

import type { ComponentType } from 'react';
import { ScreenTitle, ScreenSetup, ScreenMainGame, ScreenViralClip } from '../design/screens/ScreensA';
import { ScreenConsequence, ScreenSpotTheScam, ScreenReceipts, ScreenReportCard } from '../design/screens/ScreensB';

export interface ScreenEntry {
  id: string;
  label: string;
  meta: string;
  Component: ComponentType;
}

export const SCREENS: ScreenEntry[] = [
  { id: 'title', label: '01 · Title', meta: 'Entry · Pause. Think. Protect.', Component: ScreenTitle },
  { id: 'setup', label: '02 · Setup', meta: 'Username + avatar + starting 50/50', Component: ScreenSetup },
  { id: 'main', label: '03 · Main Game', meta: 'Core loop · shared layout', Component: ScreenMainGame },
  { id: 'viral', label: '04 · The Viral Clip', meta: 'Scenario · worked example', Component: ScreenViralClip },
  { id: 'consequence', label: '05 · Consequence', meta: 'Outcome · animated stat deltas', Component: ScreenConsequence },
  { id: 'scam', label: '06 · Spot the Scam', meta: 'Mini-game · test mode', Component: ScreenSpotTheScam },
  { id: 'receipts', label: '07 · Receipts Resurface', meta: 'Delayed consequence · callback', Component: ScreenReceipts },
  { id: 'report', label: '08 · Report Card', meta: 'Shareable closer', Component: ScreenReportCard },
];
