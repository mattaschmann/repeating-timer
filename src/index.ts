import player from "play-sound";
import path from "path";

const sound = player();

function playBeep(): void {
  try {
    const soundPath = path.join(__dirname, "../gong.mp3");
    sound.play(soundPath, (err: Error | null) => {
      if (err) {
        console.log("\x07");
      }
    });
  } catch {
    console.log("\x07");
  }
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
