#!/usr/bin/env node

const { spawn } = require("child_process");
const readline = require("readline");

console.log("🚀 BloxMania Development Script");
console.log("================================");
console.log("");
console.log("Available commands:");
console.log("  build    - Build the theme");
console.log("  dev      - Start Shopify development server");
console.log("  watch    - Start file watching (experimental)");
console.log("  exit     - Exit the script");
console.log("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function handleCommand(input) {
  const command = input.trim().toLowerCase();

  try {
    switch (command) {
      case "build":
        console.log("🔨 Building theme...");
        await runCommand("npm", ["run", "build:dev"]);
        console.log("✅ Build completed!");
        break;

      case "dev":
        console.log("🌐 Starting Shopify development server...");
        await runCommand("shopify", ["theme", "dev", "--path=theme", "--live-reload=hot-reload"]);
        break;

      case "watch":
        console.log("👀 Starting file watching (experimental)...");
        await runCommand("npm", ["run", "watch:build:stable"]);
        break;

      case "exit":
        console.log("👋 Goodbye!");
        rl.close();
        process.exit(0);
        break;

      default:
        console.log("❌ Unknown command. Available commands: build, dev, watch, exit");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  console.log("");
  rl.question("Enter command: ", handleCommand);
}

rl.question("Enter command: ", handleCommand);
