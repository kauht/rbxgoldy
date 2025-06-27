# RBXGOLD AutoFarm 🗿

A lightweight Tauri desktop app to automatically join **rains** on the RBXGOLD gambling site, supporting stats tracking and multiple accounts. Core automation is written in JavaScript/TypeScript, with a modern GUI for easy use.

![UI](images/UI.png)

## ✨ Features

- **🤖 Auto Rain Joining**: Automatically clicks the "Join Rain" button when available
- **📊 Stats Tracking**: Tracks number of rains joined, success rate, and more
- **👥 Multi-Account Support**: Easily switch or automate multiple accounts
- **🎲 Human-like Randomness**: Adds random delays and actions to avoid detection
- **📅 Rain Frequency Detection**: Learns how often rains happen to optimize joining
- **🖥️ Desktop App**: Lightweight, cross-platform, and fast (built with Tauri)

## 🐧 Usage

### Requirements
- **Tauri** (Rust, Node.js, and a frontend framework like React)
- **Puppeteer or Playwright** for browser automation (JS/TS)

### Installation
1. Install [Rust](https://www.rust-lang.org/tools/install) and [Node.js](https://nodejs.org/)
2. Clone this repository
3. Install dependencies: `npm install`
4. Run the app in development: `npm run tauri dev`

## 🛠️ Tech Stack
- **Desktop Framework**: Tauri (Rust backend, JS/TS frontend)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Automation**: Puppeteer or Playwright (Node.js)
- **UI Components**: Shadcn/UI + Lucide icons

## 🚀 To-Do

- [ ] Set up Tauri project with React frontend
- [ ] Implement core automation logic in JS/TS (auto-join rain, multi-account, stats)
- [ ] Integrate automation with Tauri backend (call Node.js scripts from Tauri)
- [ ] Build minimal GUI for testing and debugging (start/stop, logs, stats)
- [ ] Add rain frequency detection and randomness
- [ ] Expand GUI for account management and stats dashboard
- [ ] Add user settings/configuration panel
- [ ] Write clear installation and usage instructions
- [ ] Test on Windows, macOS, and Linux

## 🤝 Contributing

Contributions are always welcome! Feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [@kauht](https://discord.gg/WVMHUgrgeH)**
