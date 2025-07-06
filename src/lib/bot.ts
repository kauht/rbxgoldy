import { begin } from "./browser.ts";
import { sleep, RNG } from "./helper.ts";
// TEMP CONSTANTS
// REMOVE THESE LATER FOR MULTI-ACCOUNT SUPPORT
const USER = "kauht";
const PASS = "S@muel1212!Kaughts";

const cookies: Array<string> = [];

const users: Array<[string, string]> = [];

export function add_cookie(cookie: string) {
  cookies.push(cookie);
}

export function add_user(username: string, password: string) {
  users.push([username, password]);
}


export async function main() {

  add_cookie("RbHD56FcsA9w2EVpsxACx~CuGznxdrx57xGPXBsa8iF");
  //add_cookie("sQW2WXNf8OZrFh22Qfbxp~sOVj6htWTcV8mtlViBIzD");
  
  add_user(USER, PASS);
  for (const cookie of cookies) {
    void begin(cookie);
  }

  await sleep(200000);
}

main();