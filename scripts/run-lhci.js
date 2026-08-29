"use strict";

const { execFileSync } = require("node:child_process");
const puppeteer = require("puppeteer");

(async () => {
  const chromePath = await puppeteer.executablePath();
  execFileSync("npx", ["lhci", "autorun"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, CHROME_PATH: chromePath },
  });
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
