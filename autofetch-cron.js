import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module __dirname/__filename workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTO_FETCH_URL = "https://match-stats-tracker-44e3b4f9.base44.app/AutoFetch";

(async () => {
  console.log("🚀 Launching headless browser to trigger AutoFetch...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Log anything the page prints to the console (for debugging)
  page.on("console", msg => console.log("📜 PAGE LOG:", msg.text()));

  // Visit the AutoFetch page
  await page.goto(AUTO_FETCH_URL, { waitUntil: "networkidle2", timeout: 60000 });

  console.log("⏳ Waiting for '✅ Auto-fetch complete!' message...");

  // Wait until that text appears on the page
  await page.waitForFunction(
    () => document.body.innerText.includes("✅ Auto-fetch complete!"),
    { timeout: 60000 } // give it up to 60 seconds
  );

  console.log("✅ Detected 'Auto-fetch complete!' on the page.");
  console.log("⏱ Waiting 5 more seconds before closing...");

  // ✅ Compatible 5-second wait
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log("🟢 AutoFetch fully finished at", new Date().toISOString());
})();