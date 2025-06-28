# RBXGOLD AutoFarm 🗿

A lightweight Tauri desktop app to automatically join **rains** on the RBXGOLD gambling site, supporting multiple accounts. Automation is written in TypeScript, with a modern GUI.

![UI](images/UI.png)

## ✨ Features

- **🤖 Auto Rain Joining**: Automaticly joins rains accross all accounts
- **📊 Stats Tracker**: Tracks stats like number of rains joined, bet success rate, etc.
- **👥 Multi-Account Support**: Easily automate multiple accounts
- **🎲 Randomness**: Lots of bot detection-prevention, adds random delays and actions
- **🖥️ Desktop App**: Lightweight, cross-platform, and fast

## 🐧 Usage

### Requirements
- **Tauri** (Rust, Node.js, and a frontend framework like React)
- **Puppeteer or Playwright** for browser automation (JS/TS)

### Installation
1. Install [Rust](https://www.rust-lang.org/tools/install) and [Node.js](https://nodejs.org/)
2. Clone this repository: `git clone https://github.com/kauht/rbxgoldy/`
3. Install dependencies: `pnpm install`
4. Run the app: `pnpm tauri dev`

## 🛠️ Tech Stack
- **Framework**: Tauri (Rust backend, TS frontend)
- **Frontend**: React + TypeScript + Tailwind
- **Automation**: Puppeteer (Node.js)
- **UI Components**: Shadcn/UI + Lucide icons (probably)

## 🚀 To-Do

- [ ] Captcha solver integration
- [ ] Login support (cookieand password-based auth)
- [ ] Auto-join rains (detect notifications, click join button, add random delays)
- [ ] Auto-wagering system (detect winnings, calculate requirements, place bets)
- [ ] Multiple account support (account switching, credentials management, parallel automation)
- [ ] Auto-claim daily chests (detect availability, auto-click, track history)
- [ ] Stats tracking (rains joined, winnings/losses, wager completion rates, export data)
- [ ] Basic control panel GUI (start/stop buttons, real-time logs, basic stats display)
- [ ] Advanced dashboard GUI (detailed charts, account management, settings panel)
- [ ] User settings & configuration (timing settings, risk management, notifications)
- [ ] Auto-gambling system (betting strategies, risk management, profit tracking)
- [ ] Rain frequency detection (learn patterns, optimize timing, predictive analytics)

## 🤝 Contributing

Contributions are always welcome! Feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [@kauht](https://discord.gg/WVMHUgrgeH)**
**For any questions join the discord^^**
