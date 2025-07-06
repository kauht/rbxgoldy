import dayjs from 'dayjs';




export function RNG(a: number, b: number) {
  return Math.floor(Math.random() * ( b - a + 1) + a ) 
}

export function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1391289144218619976/NlFUyDaZw5eQupQMT8mRaz33C3H9H8MSWrJ5gmDhen3a45XX7-5Z4HfrCaaC1picN46H';

export async function log(...args: any[]) {
  const now = dayjs().format('MM-DD HH:mm:ss');
  const msg = `[${now}] ${args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}`;
  console.log(msg);
  if (DISCORD_WEBHOOK_URL) {
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: msg })
      });
    } catch (e) {
      // Ignore webhook errors, but print to console
      console.error('[log] Failed to send to Discord webhook:', e);
    }
  }
}