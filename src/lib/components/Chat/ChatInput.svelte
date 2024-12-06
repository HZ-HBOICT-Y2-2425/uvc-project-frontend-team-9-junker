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

<div class="chat-input flex items-center space-x-4">
  <input
    type="text"
    bind:value={message}
    class="flex-grow p-2 border rounded-lg"
    placeholder="Type a message..."
    on:keypress={(e) => e.key === 'Enter' && sendMessage()}
  />
  <button class="bg-blue-500 text-white p-2 rounded-lg" on:click={sendMessage}>
    Send
  </button>
</div>