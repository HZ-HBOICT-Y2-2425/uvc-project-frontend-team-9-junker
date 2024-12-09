<script>
  import { createEventDispatcher } from "svelte";
  let message = "";
  const dispatch = createEventDispatcher();

  function sendMessage() {
    if (message.trim()) {
      dispatch("send", { content: message });
      message = "";
    }
  }
</script>

<div class="flex items-center gap-2 p-2 border-t-4 border-secondary-500 dark:border-secondary-dark-500 bg-background dark:bg-background-dark">
  <input
    type="text"
    bind:value={message}
    class="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-background-dark text-black dark:text-text-dark focus:ring focus:ring-primary-300 dark:focus:ring-primary-dark-300 focus:outline-none"
    placeholder="Type a message..."
    on:keypress={(e) => e.key === "Enter" && sendMessage()}
  />
  <button
    class="bg-primary-500 dark:bg-primary-dark-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-dark-600"
    on:click={sendMessage}
  >
    Send
  </button>
</div>