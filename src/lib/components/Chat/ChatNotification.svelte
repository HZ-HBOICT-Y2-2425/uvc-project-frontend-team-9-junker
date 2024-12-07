<script>
  export let message;
</script>

<div class="bg-yellow-500 dark:bg-yellow-700 text-white p-2 rounded-lg shadow-md">
  New message from {message.sender}: {message.content}
</div>