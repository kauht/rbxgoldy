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
- **Puppeteer** for browser automation

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

- [x] Captcha solver integration (hCaptcha)
- [x] Auto-login
- [x] Random Number Generator
- [x] Auto-join rains
- [x] Auto-gamble
- [x] Multiple account support
- [ ] Auto-claim daily chests
- [ ] Stats tracking
- [ ] Basic control panel GUI (start/stop buttons, real-time logs, basic stats display)

## 🤝 Contributing

Contributions are always welcome! Feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [@kauht](https://discord.gg/WVMHUgrgeH)**

**For any questions join the discord^^**
