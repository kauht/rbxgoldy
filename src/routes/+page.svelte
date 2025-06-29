<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  let botStatus = '';

  async function startBot() {
    botStatus = await invoke<string>('run_bot');
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">

  <button class="px-10 py-2 bg-green-600 text-white rounded hover:bg-green-700" onclick={startBot}>
    Start Bot
  </button>
  {#if botStatus}
    <div class="mt-4 text-green-700 dark:text-green-400">{botStatus}</div>
  {/if}
</main>