import type { Page, Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import { captcha } from './captcha.js';
//import { login, gamble, cookielogin } from './browser.ts';
import { RNG, sleep } from './helper.ts';
import type { Cookies } from '@sveltejs/kit';


// Globals
const API_KEY = "1f8bf21469763b0a8b0ccbe21e135dd4";
const SITEKEY = "a3a5a9a9-7210-4dc7-a7bc-39c3fc73143e";
const PAGE_URL = "https://rbxgold.com";
const HEADLESS = false;

let last_rain: number;

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
  
  console.log("Cookie set, refreshing page...");
  //await page.reload();
  }

  export async function alert(page: Page) {
    const alert_box = await page.waitForSelector("xpath///html/body/div[1]/div[3]/div/main/div/div[2]");

    return await alert_box?.evaluate(el => el.textContent);
  }
  export async function gamble(amount: number, page: Page) {
    await page.goto("https://rbxgold.com/roll");
    console.log("Starting to gamble");
    
    const chance = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div[1]/div/div[2]/div[3]/div[3]/div/div[1]/input', { timeout: 10000 });
    chance?.type("93");
    console.log("Set Win Chance to 93");

    const price = await page.waitForSelector('xpath///html/body/div[1]/div[3]/div/main/div/div[2]/div/div[1]/div/div[1]/div[2]/div/div[1]/input', { timeout: 10000 });
    if (amount >= 50) {
      let remainder = amount % 10;
      amount = Math.floor(amount / 10);

      console.log("Gambling " + amount + " 10x, then gambling " + remainder);
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
  
  export async function rain(page: Page) {
    console.log("Waiting for rain to start...");
    const join = await page.waitForSelector("xpath///html/body/div[1]/div[4]/div/div/div[2]/div/div[1]/div/div/div/div[2]/button", { timeout: 0 });
    await join?.click();
    await captcha(page);
    console.log("Successfully joined rain.");
    console.log("Waiting for rain to finish...");

    const remaining = await page.waitForSelector("xpath///html/body/div[1]/div[4]/div/div/div[2]/div/div[1]/div/div/div/div[1]/div[1]/span[2]");
    const rain_price = await page.waitForSelector("xpath///html/body/div[1]/div[4]/div/div/div[2]/div/div[1]/div/div/div/div[1]/div[2]/div/span");

    

  }

  export async function login(username: string, password: string, page: Page) {
    const startLogin = await page.waitForSelector('xpath///*[@id="app-body"]/div/header/div/div[2]/div/div[1]/button[1]', { timeout: 10000 });
    console.log("Starting login process.");
  
    await startLogin?.click();
  
    const userbox = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[1]/div[1]/input", { timeout: 10000 });
    console.log("Found username input.");
    const passbox = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[1]/div[2]/input", { timeout: 10000 });
    console.log("Found password input.");
    const loginButton = await page.waitForSelector("xpath///html/body/div[1]/div[5]/div[2]/div/div/div[1]/div/div/div[2]/div[2]/button", { timeout: 10000 });
    console.log("Logged in, starting captcha solver..");
  
    await userbox?.type(username);
    console.log("Typed username.");
    await passbox?.type(password);
    console.log("Typed password.");
    await loginButton?.click();
    console.log("Logging in.");
    
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
      browser = await puppeteer.launch({ headless: HEADLESS });

      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 720});
      await cookielogin(cookie, page, browser);
      await page.goto("https://rbxgold.com");

      //await gamble(51, page);

      rain(page);
      
      await sleep(60000*5);
      console.log("----------------------------------");

      // await login(USER, PASS, page);
      if (browser && browser.connected) {
        await browser.close();
        console.log("Browser closed");
      }
    } catch (err) {
      console.error("Failed to launch browser:", err);
      return;
    }
  }