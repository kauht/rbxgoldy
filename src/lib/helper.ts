export function RNG(a: number, b: number) {
  return Math.floor(Math.random() * ( b - a + 1) + a ) 
}

export function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}