<script>
  export let message;
</script>

<div class="chat-notification bg-yellow-500 text-white p-2 rounded-lg shadow-md">
  New message from {message.sender}: {message.content}
</div>