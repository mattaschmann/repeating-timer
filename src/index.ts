#!/usr/bin/env node
import { Player } from "cli-sound";

const player = new Player();

function playBeep(): void {
  player.play("gong.wav");
}

function displayCountdown(seconds: number): void {
  const displayValue = seconds % 1 === 0 ? seconds.toString() : seconds.toFixed(1);
  process.stdout.write(`\rTimer: ${displayValue}s   `);
}

function startTimer(totalSeconds: number): void {
  let remainingSeconds = totalSeconds;
  const interval = totalSeconds >= 1 ? 1000 : 100; // Use 100ms intervals for sub-second timers
  const decrement = totalSeconds >= 1 ? 1 : 0.1;

  const countdown = () => {
    displayCountdown(remainingSeconds);

    if (remainingSeconds <= 0) {
      playBeep();
      remainingSeconds = totalSeconds;
      countdown();
    } else {
      remainingSeconds = Math.max(0, remainingSeconds - decrement);
      setTimeout(countdown, interval);
    }
  };

  countdown();
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length < 1 || args.length > 2) {
    console.error("Usage: repeating-timer <seconds> [multiplier]");
    process.exit(1);
  }

  const baseSeconds = parseFloat(args[0]);
  const multiplier = args[1] ? parseFloat(args[1]) : 1;

  if (isNaN(baseSeconds) || baseSeconds <= 0) {
    console.error("Error: Please provide a positive number of seconds");
    process.exit(1);
  }

  if (isNaN(multiplier) || multiplier <= 0) {
    console.error("Error: Multiplier must be a positive number");
    process.exit(1);
  }

  const seconds = baseSeconds * multiplier;

  console.clear();
  startTimer(seconds);
}

process.on("SIGINT", () => {
  console.log("\nTimer stopped.");
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});

main();
