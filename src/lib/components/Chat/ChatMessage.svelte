<script>
  export let message = { sender: "", recipient: "", content: "", timestamp: 0 };
  export let isSender = false;
</script>

<div class={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
  <div
    class={`max-w-[70%] p-3 rounded-lg shadow ${
      isSender
        ? " bg-secondary-500 text-text dark:text-black dark:bg-secondary-dark-500"
        : " bg-primary-500 text-text dark:text-black dark:bg-primary-dark-500"
    }`}
  >
    <span class="text-sm">{message.content}</span>
    <span class="text-xs text-white dark:text-black block text-right">
      {new Date(message.timestamp).toLocaleTimeString()}
    </span>
  </div>
</div>