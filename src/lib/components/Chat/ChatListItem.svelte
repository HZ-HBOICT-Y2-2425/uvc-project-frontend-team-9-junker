<script>
  export let sender;
  export let content;
  export let timestamp;

  // Define the character limit
  const CHARACTER_LIMIT = 30;

  // Truncate the content if it exceeds the character limit
  $: truncatedContent = content.length > CHARACTER_LIMIT
    ? content.substring(0, CHARACTER_LIMIT) + "..."
    : content;
</script>

<div class="flex items-center justify-between p-4 bg-background dark:bg-background-dark hover:bg-primary-100 dark:hover:bg-primary-dark-100 rounded-lg shadow">
  <div>
    <p class="text-lg font-rem text-primary-500 dark:text-primary-dark-500">{sender}</p>
    <p class="text-sm text-secondary-500 dark:text-secondary-dark-500 truncate">{truncatedContent}</p>
  </div>
  <div class="text-sm text-gray-400 text-right pr-2">{new Date(timestamp).toLocaleString()}</div>
</div>