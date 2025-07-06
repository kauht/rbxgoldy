import { begin, add_cookie, add_user } from "./browser.ts";
import { sleep, RNG } from "./helper.ts";
// TEMP CONSTANTS
// REMOVE THESE LATER FOR MULTI-ACCOUNT SUPPORT
const USER = "kauht";
const PASS = "S@muel1212!Kaughts";

const COOKIE = "RbHD56FcsA9w2EVpsxACx~CuGznxdrx57xGPXBsa8iF";

export async function main() {

  add_cookie(COOKIE);
  add_cookie("pfOHQhwc-5CStpkp9PGhG~RCH2M9W_G9gG-R5lo1A_b");
  
  add_user(USER, PASS);

  await begin(COOKIE);

  await sleep(200000);
}

main();