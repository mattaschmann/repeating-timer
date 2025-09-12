import { Player } from "cli-sound";

const player = new Player();

function playBeep(): void {
  player.play("gong.wav");
}

function clearLine(): void {
  process.stdout.write("\r\x1b[K");
}

function displayCountdown(seconds: number): void {
  clearLine();
  process.stdout.write(`Timer: ${seconds}s`);
}

function startTimer(totalSeconds: number): void {
  let remainingSeconds = totalSeconds;

  const countdown = () => {
    displayCountdown(remainingSeconds);

    if (remainingSeconds === 0) {
      playBeep();
      remainingSeconds = totalSeconds;
      countdown();
    } else {
      remainingSeconds--;
      setTimeout(countdown, 1000);
    }
  };

  countdown();
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error("Usage: repeating-timer <seconds>");
    process.exit(1);
  }

  const seconds = parseInt(args[0], 10);

  if (isNaN(seconds) || seconds <= 0) {
    console.error("Error: Please provide a positive number of seconds");
    process.exit(1);
  }

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
