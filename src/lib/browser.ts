import type { Page, Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import { captcha } from './captcha.js';
//import { login, gamble, cookielogin } from './browser.ts';
import { RNG, sleep, log } from './helper.ts';
import type { Cookies } from '@sveltejs/kit';


// Globals
const API_KEY = "1f8bf21469763b0a8b0ccbe21e135dd4";
const SITEKEY = "a3a5a9a9-7210-4dc7-a7bc-39c3fc73143e";
const PAGE_URL = "https://rbxgold.com";
const HEADLESS = false;

let last_rain: number;
let recent_alert: string | null = null;
let stopWatching = false;

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

const cookies: Array<string> = [];

const users: Array<[string, string]> = [];

  export async function cookielogin(cookie: string, page: Page, browser: Browser) {
    await page.setCookie({
      name: 'SID',
      value: cookie,
      domain: 'api.rbxgold.com',
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'None'
  });
  
  log("Cookie set, refreshing page...");
  //await page.reload();
  }

  
  export async function gamble(amount: number, page: Page) {
    await page.goto("https://rbxgold.com/roll");
    log("Starting to gamble");
    
    const chance = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div[1]/div/div[2]/div[3]/div[3]/div/div[1]/input', { timeout: 10000 });
    chance?.type("93");
    log("Set Win Chance to 93");

    const price = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div[1]/div/div[1]/div[2]/div/div[1]/input', { timeout: 10000 });
    if (amount >= 50) {
      let remainder = amount % 10;
      amount = Math.floor(amount / 10);

      log("Gambling " + amount + " 10x, then gambling " + remainder);
      await price?.type(amount.toString());
      const play = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div/div/div[1]/div[3]/button', { timeout: 10000 });
      
      for (let i = 0; i < 10; i++) {
        await play?.click();
        const accept = await page.waitForSelector('xpath///html/body/div[1]/div[5]/div[2]/div/div/div[3]/button[1]', {timeout: 1000});
        await accept?.click();
        await sleep(RNG(2000, 3000));
      }
      if (remainder) {
        await price?.type(remainder.toString());
        await play?.click();
        const accept = await page.waitForSelector('xpath///html/body/div[1]/div[5]/div[2]/div/div/div[3]/button[1]', {timeout: 1000});
        await accept?.click();
      }
      await page.goto("https://rbxgold.com/roll");
      return;
    }
    await price?.type(amount.toString());

    const play = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div/div/div[1]/div[3]/button', { timeout: 10000 });
    await play?.click();

    await page.goto("https://rbxgold.com/roll");
    return;
  }
  
  async function watchAlerts(page: Page) {
    let lastAlert: string | null = null;
    while (!stopWatching) {
      try {
        const alertMessage = await page.evaluate(() => {
          const alertContainer = document.evaluate(
            '/html/body/div[1]/div[3]/div/main/div/div[2]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue as HTMLElement | null;

          if (!alertContainer) return null;

          // Get all direct child divs (alert boxes)
          const alertBoxes = Array.from(alertContainer.children).filter(child => child.tagName === 'DIV');
          for (const box of alertBoxes) {
            const firstChild = box.firstElementChild;
            if (firstChild && firstChild.tagName === 'SPAN') {
              const text = firstChild.textContent;
              if (text && text.trim().length > 0) {
                return text.trim();
              }
            }
          }
          return null;
        });

        if (alertMessage && alertMessage !== lastAlert) {
          recent_alert = alertMessage;
          log(`[ALERT] recent_alert changed: ${recent_alert}`);
          lastAlert = alertMessage;
        }
        await sleep(500);
      } catch (e: any) {
        if (e.message && e.message.includes('Context destroyed')) {
          break;
        } else {
          throw e;
        }
      }
    }
  }

  async function waitForAlert(target: RegExp | string, timeout = 600000): Promise<string | null> {
    const start = Date.now();
    let lastSeen = recent_alert;
    while (Date.now() - start < timeout) {
      if (recent_alert !== lastSeen && recent_alert) {
        if (
          (typeof target === 'string' && recent_alert.includes(target)) ||
          (target instanceof RegExp && target.test(recent_alert))
        ) {
          log("[ALERT] ", recent_alert);
          return recent_alert;
        }
        lastSeen = recent_alert;
      }
      await sleep(200);
    }
    return null;
  }

  async function captchaTimeout(page: Page, ms: number): Promise<boolean> {
    try {
      await Promise.race([
        captcha(page),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Captcha timeout')), ms))
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  export async function rain(page: Page) {
    stopWatching = false;
    log("Waiting for rain to start...");

    void watchAlerts(page);

    const joinSelector = "xpath///html/body/div[1]/div[4]/div/div/div[2]/div/div[1]/div/div/div/div[2]/button";
    await page.waitForSelector(joinSelector, { timeout: 0 });
    log("[!] Rain started, joining...");
    await page.click(joinSelector);
    
    log("[!] Solving captcha...");
    let solved = await captchaTimeout(page, 60000);
    if (!solved) {
      log("[!] Could not solve Captcha in 60s, retrying...");
      solved = await captchaTimeout(page, 60000);
      if (!solved) {
        log("[!] Captcha not solved after two attempts. Giving up.");
        last_rain = 0;
        stopWatching = true;
        return;
      }
    }
    log("[!] Captcha solved.");
    const joinedText = await waitForAlert("Successfully joined rain!");
    log("[!] Waiting for rain to finish...");
    const wonText = await waitForAlert(/You won \d+ tokens from rain!/);
    // Extract number won from the message
    let match: RegExpMatchArray | null = null;
    if (typeof wonText === 'string') {
      // The regex gets the number (\d+)
      match = wonText.match(/You won (\d+) tokens from rain!/);
    }
    if (match) {
      last_rain = parseInt(match[1], 10); // Convert the extracted string to a base-10 number
      log(`[!] Set last_rain to ${last_rain}`);
      log(`[!] last_rain is now ${last_rain}`);
    } else {
      log("[?] What the fuck...");
    }
    stopWatching = true;
  }

  export async function login(username: string, password: string, page: Page) {
    const startLogin = await page.waitForSelector('xpath///*[@id="app-body"]/div/header/div/div[2]/div/div[1]/button[1]', { timeout: 10000 });
    log("[!] Starting login process.");
  
    await startLogin?.click();
  
    const userbox = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[1]/div[1]/input", { timeout: 10000 });
    log("[!] Found username input.");
    const passbox = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[1]/div[2]/input", { timeout: 10000 });
    log("[!] Found password input.");
    const loginButton = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[2]/button", { timeout: 10000 });
    log("[!] Logged in, starting captcha solver..");
  
    await userbox?.type(username);
    log("[!] Typed username.");
    await passbox?.type(password);
    log("[!] Typed password.");
    await loginButton?.click();
    log("[!] Logging in.");
    
    await captcha(page);
  }


  export function add_cookie(cookie: string) {
    cookies.push(cookie);
  }

  export function add_user(username: string, password: string) {
    users.push([username, password]);
  }

  export async function begin(cookie: string) {
    let browser;
    try {
      browser = await puppeteer.launch({ headless: HEADLESS, protocolTimeout: 7200 * 1000 });

      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 720});
      await cookielogin(cookie, page, browser);
      await page.goto("https://rbxgold.com");

      
      while (1) {
        await rain(page);
        //set_last_rain_transaction(page);
        await gamble(last_rain, page);
      }
      
      await sleep(60000*5);
      console.log("----------------------------------");

      // await login(USER, PASS, page);
      if (browser && browser.connected) {
        await browser.close();
        log("[!] Automation Ended");
      }
    } catch (err) {
      log("[!] Failed to launch:", err);
      return;
    }
  }