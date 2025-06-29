import type { Page } from 'puppeteer';

export async function captcha(page: Page) {
    try {
      console.log("Solving captcha...");
  
      await page.solveRecaptchas();
      
      console.log("Captcha solved");
      
    } catch (error) {
      console.error("Error solving captcha:", error);
      throw error;
    }
  }