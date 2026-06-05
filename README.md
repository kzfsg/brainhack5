# DigiLife — _Pause. Think. Protect._

A playable, choice-driven mobile game that teaches Singapore teens (13–18) to
navigate **scams, misinformation, and cyberbullying**. You play a secondary
school student across six in-game years; every scenario is a real decision, and
your choices move seven life stats — some of which come back to haunt you.

Built from the **DigiLife Hi-Fi** design handoff: the design's exact visual
system (tokens, iPhone device frame, UI atoms, copy, animations) wired into an
actual game with state, branching, scoring, and an end-of-run report card.

## How it plays

1. **Title** → start
2. **Setup** — name yourself, pick an avatar, everyone starts at 50/50
3. **Six years (Sec 1 → Sec 4)** — each year throws a situation at you:
   - **Choice scenarios** (A / B / C) — viral clips, group-chat pile-ons,
     "sure-win" crypto tips, anonymous confession pages, AI-faked audio.
     Each choice applies stat changes and a narrated consequence.
   - **Spot the Scam** mini-game (Year 3) — tap the red flags in a phishing
     message; correct flags raise Scam Armour, missed ones cost Wallet HP.
   - **Receipts Resurface** — a delayed callback: if you posted the Year-1 hot
     take, it gets screenshotted and resurfaces years later, right when it
     matters most. Play clean and you never see it.
4. **Report Card** — a computed verdict (e.g. _Quietly Wise_, _Scam Proof_,
   _Chronically Online_), your final stats, standout moments, and a 0–1000
   **Digital Safety Score**. Share it, or live another life.

### The seven stats

🧠 Brain Battery · ⭐ Rep Meter · 💛 Squad Strength · 💳 Wallet HP ·
🛡️ Scam Armour · 🌐 Internet Receipts (lower is better) · 💡 Big Brain Mode

## Run it

```bash
npm install
npm run dev      # dev server (Vite prints the URL, default :5173)
npm run build    # type-check + production build
npm run preview  # serve the production build
```

It's responsive: full-screen on phones, and a centered iPhone-class frame on
wider screens.

## Structure

```
src/
  App.tsx                     # provider + phase router
  PhoneShell.tsx              # responsive device frame (mobile full-bleed / desktop framed)
  game/
    types.ts                  # game data types
    content.ts                # authored scenarios, scam mini-game, per-year plan
    state.ts                  # reducer, transitions, scoring + verdict logic
    GameContext.tsx           # React context + useGame hook
  screens/                    # Title, Setup, Scenario, Consequence, Scam, ReportCard
  design/
    tokens.ts                 # colors, fonts, stat metadata (from the handoff)
    ios/IOSFrame.tsx          # iPhone device frame + status bar
    ui/DigiLifeUI.tsx         # shared atoms (StatBar, ChoiceButton, TopBar, …)
```

Game logic lives in pure, framework-free modules (`content.ts` / `state.ts`),
so a full playthrough can be simulated and verified without a browser.

> Fonts (Space Grotesk, JetBrains Mono, Fraunces) load from Google Fonts;
> the first load needs internet for type to render exactly right.
