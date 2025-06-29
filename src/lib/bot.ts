import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import type { Page } from 'puppeteer';
import { login } from './browser.ts';

// TEMP CONSTANTS
// REMOVE THESE LATER FOR MULTI-ACCOUNT SUPPORT
const USER = "kauht";
const PASS = "S@muel1212!Kaughts";

// Globals
const API_KEY = "1f8bf21469763b0a8b0ccbe21e135dd4";
const SITEKEY = "a3a5a9a9-7210-4dc7-a7bc-39c3fc73143e";
const PAGE_URL = "https://rbxgold.com";
const HEADLESS = false;

puppeteer.use(StealthPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: API_KEY
    },
    visualFeedback: true,
    throwOnError: true
  })
);

export async function main() {
  let browser;
  browser = await puppeteer.launch({ headless: HEADLESS });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.goto("https://rbxgold.com");

  await login(USER, PASS, page);
  console.log("Login process completed.");
  
  // Don't close browser right away (20 seconds)
  await new Promise(resolve => setTimeout(resolve, 20000));
  
  if (browser && browser.connected) {
    await browser.close();
    console.log("Browser closed");
  }
}

main(); 