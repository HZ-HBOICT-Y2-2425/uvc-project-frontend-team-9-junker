<script>
  export let sender;
  export let content;
  export let timestamp;
</script>

<div class="chat-list-item flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:shadow-md">
  <div>
    <p class="text-lg font-bold">{sender}</p>
    <p class="text-sm text-gray-600 truncate">{content}</p>
  </div>
  <div class="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</div>
</div>