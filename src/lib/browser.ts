import type { Page } from 'puppeteer';
import { captcha } from './captcha.js';

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
    
    // await new Promise(resolve => setTimeout(resolve, 500));
    
    await captcha(page);
  }
export async function gamble(amount: Number, page: Page) {
  const dice = await page.waitForSelector("xpath///html/body/div[1]/div[1]/div[2]/a[8]", { timeout: 10000 });
  console.log("Found dice button.");
  await dice?.click();
  console.log("Starting to gamble");

  // after allat change gamble amount to amount set in function parameters, then click gamble, then do "await page.goto("https://rbxgold.com");"
}
