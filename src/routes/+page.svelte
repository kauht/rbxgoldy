<script lang="ts">  
  import '../app.css';
  import { invoke } from "@tauri-apps/api/core";
  let botStatus = '';

  async function startBot() {
    botStatus = await invoke<string>('run_bot');
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-black dark:bg-gray-900">

  <button class="px-10 py-2 bg-green-600 text-white rounded hover:bg-green-700" on:click={startBot}>
    Start Bot
  </button>
  {#if botStatus}
    <div class="mt-4 text-green-700 dark:text-green-400 bg-black">{botStatus}</div>
  {/if}

  <div class="mt-4">
    <input type="string" placeholder="Username" />
    <input type="string" placeholder="Password" />
  </div>
  
  <div class="bg-red-500 text-white p-4">If this is red, Tailwind is working inline!</div>

</main>