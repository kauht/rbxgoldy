export function RNG(a: number, b: number) {
  return Math.floor(Math.random() * ( b - a + 1) + a ) 
}

export function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export function log(...args: any[]) {
  const now = new Date().toISOString();
  console.log(`[${now}]`, ...args);
}