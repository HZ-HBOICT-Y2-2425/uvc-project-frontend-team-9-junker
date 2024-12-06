<script>
  export let message = { sender: "", recipient: "", content: "", timestamp: 0 };
  export let isSender = false;
</script>

<div class={`chat-message ${isSender ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'} rounded-lg p-2`}>
  <span class="text-sm">{message.content}</span>
  <span class="text-xs text-gray-500 block text-right">
    {new Date(message.timestamp).toLocaleTimeString()}
  </span>
</div>

<style>
  .chat-message {
    max-width: 70%;
    margin: 4px 0;
  }
</style>