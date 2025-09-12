# Repeating Timer

A simple TypeScript-based Node.js CLI application for a repeating countdown timer with audio alerts.

## Features

- Clean countdown display that updates in place
- Plays custom sound (WAV format) when timer reaches zero
- Automatically restarts immediately after completion
- No delay between timer cycles
- Clear terminal on startup for focused display
- Graceful exit with Ctrl+C

## Installation

### Local Development
```bash
npm install
npm run build
npm run dev <seconds>
```

### Global Installation
```bash
npm install -g .
repeating-timer <seconds>
```

## Usage

```bash
repeating-timer 25    # 25-second repeating timer
repeating-timer 60    # 1-minute repeating timer
repeating-timer 1.5   # 1.5-second repeating timer
repeating-timer 0.5   # Half-second repeating timer
```

The timer accepts both whole numbers and decimal values for precise timing. Fractional timers (less than 1 second) update every 100ms for smooth countdown display.

The timer will:
1. Clear the terminal
2. Display a countdown from your specified seconds to 0
3. Play the `gong.wav` sound file
4. Immediately restart the countdown

Press `Ctrl+C` to stop the timer.

## Requirements

- Node.js

## Development

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev <seconds>` - Run in development mode with ts-node
- `npm start <seconds>` - Run the compiled version

### Project Structure
```
├── src/
│   └── index.ts          # Main application source
├── dist/                 # Compiled JavaScript
├── gong.wav             # Audio file (WAV format required)
├── package.json
└── tsconfig.json
```

## Dependencies

- `cli-sound` - For playing audio files in the terminal
- `typescript` - For TypeScript compilation
- `ts-node` - For development mode execution

## TODO

- [ ] Build and submit package to npm registry
- [ ] Push project to GitHub repository
- [ ] Add support for different sound files
- [ ] Add configuration file for custom sounds
- [ ] Add volume control options
