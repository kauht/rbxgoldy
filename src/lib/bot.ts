import puppeteer from 'puppeteer';

export async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.goto('https://rbxgold.com');
  // for (;;) {

    
  // }
  if (!browser.connected) {
    await browser.close();
  }
}

main(); 