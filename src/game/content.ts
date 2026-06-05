// Authored game content: the yearly scenarios, the Spot-the-Scam mini-game,
// and the per-year event plan. Copy is written in the design's voice and
// covers the three brief themes — scams, misinformation, cyberbullying.

import type { Scenario, ScamGame } from './types';

export const TOTAL_YEARS = 6;

export const AVATARS = ['🦊', '🐯', '🐼', '🐸', '🦉', '🐙'];

// ─────────────────────────────────────────────────────────────
// Scenarios
// ─────────────────────────────────────────────────────────────

const viralClip: Scenario = {
  id: 'viral-clip',
  category: 'misinfo',
  time: '12:47 AM',
  title: 'The Viral Clip',
  setup: 'A video pops up: someone from a nearby school yelling at a teacher outside a mall. Caption reads:',
  quote: '"This student got caught cheating and STILL had the audacity to scream. Name and shame."',
  detail:
    "Clip is 9 seconds long. Clearly starts in the middle. Someone claims to know the student's name. Another says the teacher started it.",
  prompt: 'What do you do?',
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Post a spicy hot take for engagement',
      deltas: { rep: 10, brain: -8, receipts: 10 },
      outcome:
        "Your post goes viral overnight — 2K likes, 800 reshares. But the comment section turns toxic fast. People are arguing about you, not the original video. You're trending for the wrong reasons.",
      harmful: true,
      setsFlag: 'postedHotTake',
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'Ask for the full context before judging',
      deltas: { brain2: 9, brain: 5, rep: -2 },
      outcome:
        'You comment asking for the full clip. Turns out the student was reacting to being falsely accused — the original cut left that out. A few people quietly delete their posts. You look like the level head in the room.',
      factCheck: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: "Remind people not to expose or harass",
      deltas: { squad: 7, brain2: 5, rep: 3 },
      outcome:
        'You reply: "Even if it\'s real, doxxing a minor isn\'t it." A mod removes the name-and-shame thread. One person calls you boring. Three DM you to say thanks.',
      protectedFriend: true,
    },
  ],
};

const groupChat: Scenario = {
  id: 'group-chat',
  category: 'bully',
  time: '9:12 PM',
  title: 'The Pile-On',
  setup:
    'Your class group chat turns on the quiet kid over a cringe meme they posted. 30 messages in two minutes, all dunking. Someone screenshots it to another chat.',
  prompt: 'You\'re watching it happen live. What do you do?',
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Add a funny jab — everyone\'s doing it',
      deltas: { rep: 6, squad: -7, brain: -4, receipts: 5 },
      outcome:
        'Your jab gets the most laughs. Then the kid goes quiet — leaves the chat. The screenshots keep spreading. Later you notice they skipped school for two days.',
      harmful: true,
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'DM the kid privately to check they\'re okay',
      deltas: { squad: 10, brain2: 6, rep: -2 },
      outcome:
        'You message them: "that chat was out of line, you good?" They reply with a single 🙏. It doesn\'t fix the chat, but it reaches the one person who needed it.',
      protectedFriend: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: 'Call it out: "this is too far"',
      deltas: { squad: 8, brain2: 8, rep: -4 },
      outcome:
        'You post "ok this is actually too far guys." A couple agree and the energy drops. A couple turn on you for being a buzzkill. The pile-on stops.',
      protectedFriend: true,
    },
  ],
};

const cryptoSenior: Scenario = {
  id: 'crypto-senior',
  category: 'scam',
  time: '4:33 PM',
  title: 'The "Sure-Win" Tip',
  setup:
    'A senior you look up to DMs you: easy money flipping crypto, they\'ve "tripled it twice." You just need $50 to start and there are only a few slots left before the pool closes tonight.',
  quote: '"bro I\'m not joking, my account went from 200 to 900 in a week. just dont tell everyone or the slots fill up 🤫"',
  prompt: 'The clock\'s ticking. What do you do?',
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Send $50 — they seem legit',
      deltas: { wallet: -14, armour: -5, brain: -3 },
      outcome:
        'You PayNow the $50. The "returns dashboard" looks amazing for a day. Then the account is deactivated and the senior "doesn\'t remember" recommending it. The money\'s gone.',
      harmful: true,
      scammed: true,
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'Ask for proof + check with a trusted adult',
      deltas: { armour: 9, brain2: 7 },
      outcome:
        'You ask how withdrawals work and screenshot it for your older cousin. "Classic recruitment scam," she says. The "limited slots" urgency was the whole trick. You keep your $50.',
      factCheck: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: 'Report the account and warn your friends',
      deltas: { armour: 7, squad: 6, rep: 4 },
      outcome:
        'You report the DM and drop a heads-up in your friend chat. Two of them got the exact same message. You just stopped a small pyramid in its tracks.',
      protectedFriend: true,
    },
  ],
};

const confessionPage: Scenario = {
  id: 'confession-page',
  category: 'bully',
  time: '11:48 PM',
  title: 'The Confession Page',
  setup:
    'An anonymous IG confession page posts a rumour about your friend — unverified, humiliating, getting traction. Your DMs fill up: "is it true?? you know them right??"',
  prompt: 'Everyone\'s waiting for your move.',
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Drop a hint — the attention is fun',
      deltas: { rep: 6, squad: -9, brain: -5, receipts: 6 },
      outcome:
        'Your "no comment 👀" reads as confirmation. The rumour explodes. Your friend stops replying to you entirely. The page screenshots your hint for clout.',
      harmful: true,
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'Refuse to confirm and report the page',
      deltas: { armour: 5, squad: 8, brain2: 7 },
      outcome:
        'You reply "not spreading that" to everyone and mass-report the post. It gets taken down by morning. Your friend never finds out how close it got — which is the point.',
      protectedFriend: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: 'Screenshot it and warn your friend privately',
      deltas: { squad: 10, brain2: 6, rep: -2 },
      outcome:
        'You send your friend the screenshots first, before they see it from a stranger. "Got your back, already reporting it." They get to brace instead of getting blindsided.',
      protectedFriend: true,
    },
  ],
};

const deepfakeDM: Scenario = {
  id: 'deepfake-dm',
  category: 'misinfo',
  time: '7:05 AM',
  title: 'The Too-Real Audio',
  setup:
    'A voice note is circulating that sounds exactly like your form teacher saying something awful about a student. It\'s spreading across year groups before school even starts.',
  detail: 'The audio is weirdly clean. The "s" sounds buzz a little. No one can say where it first came from.',
  prompt: 'First period is in an hour.',
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Reshare it — people deserve to know',
      deltas: { rep: 5, brain: -6, receipts: 8, armour: -3 },
      outcome:
        'You reshare. By recess it\'s everywhere. Then IT confirms it\'s AI-generated — a prank that got out of hand. Your name is on one of the loudest reposts.',
      harmful: true,
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'Pause — clean audio + no source is a red flag',
      deltas: { brain2: 9, armour: 6 },
      outcome:
        'Something feels off, so you don\'t spread it. You\'re right: it was generated. The kids who reshared spend the week walking it back. You don\'t have to.',
      factCheck: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: 'Flag it to a teacher quietly',
      deltas: { armour: 6, brain2: 6, rep: 2 },
      outcome:
        'You forward it to a teacher you trust with "this might be fake, thought you should know." The school gets ahead of it before lunch. Quietly, the right call.',
      factCheck: true,
    },
  ],
};

// The delayed-consequence callback. Only appears if you posted the Year-1 hot take.
const receipts: Scenario = {
  id: 'receipts-resurface',
  category: 'reactive',
  time: '3:21 PM',
  title: 'Receipts Resurface',
  variant: 'receipts',
  setup: '',
  prompt: 'What happens next depends on you, right now.',
  callback: {
    handle: '@sg_student_2026',
    avatar: '🦊',
    time: '12:51 AM · 2 yrs ago',
    text:
      '"this video says it all. wild that they let stuff like this slide at this school 🤡 name and shame fr"',
    likes: '2,041',
    reshares: '812',
    comments: '304',
    intro:
      "Someone screenshotted your Year 1 hot take. It's circulating again — right when you're being considered for student leader.",
  },
  choices: [
    {
      letter: 'A',
      color: 'coral',
      text: 'Delete everything and deny it was you',
      deltas: { receipts: 6, rep: -9, brain: -6 },
      outcome:
        'You scrub your account and deny it. But the screenshots were saved years ago. The denial becomes the new story. The internet really doesn\'t forget.',
      harmful: true,
    },
    {
      letter: 'B',
      color: 'teal',
      text: 'Own it, apologise, show you\'ve grown',
      deltas: { rep: 11, brain2: 9, receipts: -6 },
      outcome:
        '"That was me at 13. I was wrong, and I\'d handle it completely differently now." People can tell it\'s genuine. The honesty lands better than the post ever did.',
      factCheck: true,
    },
    {
      letter: 'C',
      color: 'purple',
      text: 'Stay silent and let it blow over',
      deltas: { rep: -3, brain: -4, squad: -2 },
      outcome:
        'You say nothing and wait it out. It mostly fades — but the silence reads as "didn\'t care." You\'re passed over for the role this round.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Spot-the-Scam mini-game
// ─────────────────────────────────────────────────────────────
export const SCAM_GAME: ScamGame = {
  sender: 'SecureVerify Centre',
  phone: '+65 XXXX XXXX · now',
  banner: '🚨 URGENT: Your account has been suspended!',
  body: 'Dear user, verify your account IMMEDIATELY or it will be permanently locked.',
  link: 'verify-acct-sg.xyz/login',
  body2: 'Enter your OTP to confirm identity. Your prize of $500 NTUC voucher awaits!',
  flags: [
    { id: 'link', label: 'Suspicious link', correct: true },
    { id: 'urg', label: 'Urgent threat', correct: true },
    { id: 'otp', label: 'Request for OTP', correct: true },
    { id: 'friendly', label: 'Friendly tone', correct: false },
    { id: 'prize', label: 'Fake prize', correct: true },
    { id: 'sender', label: 'Unknown sender', correct: true },
  ],
  perCorrect: 6,
  perMiss: 4,
};

// ─────────────────────────────────────────────────────────────
// Per-year event plan
// ─────────────────────────────────────────────────────────────
export type YearEvent = { type: 'scenario'; scenario: Scenario } | { type: 'scam' };

// Year 3 is always the scam mini-game. Year 6 becomes the Receipts callback
// if the player posted the Year-1 hot take; otherwise a fresh misinfo scenario.
export function yearEvent(year: number, flags: Record<string, boolean>): YearEvent {
  switch (year) {
    case 1:
      return { type: 'scenario', scenario: viralClip };
    case 2:
      return { type: 'scenario', scenario: groupChat };
    case 3:
      return { type: 'scam' };
    case 4:
      return { type: 'scenario', scenario: cryptoSenior };
    case 5:
      return { type: 'scenario', scenario: confessionPage };
    case 6:
    default:
      return flags.postedHotTake
        ? { type: 'scenario', scenario: receipts }
        : { type: 'scenario', scenario: deepfakeDM };
  }
}
