<script>
  // @ts-nocheck
  import ChatListItem from "./ChatListItem.svelte";
  import { goto } from "$app/navigation";

  export let chats = [];

  function openChat(userName) {
    goto(`/chats/${userName}`);
  }
</script>

<div class="my-chats space-y-4">
  {#each chats as chat}
    <button
      type="button"
      class="w-full text-left"
      on:click={() => openChat(chat.userName)}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openChat(chat.userName)}
      aria-label={`Open chat with ${chat.userName}`}
    >
      <ChatListItem
        sender={chat.userName}
        content={chat.lastMessage}
        timestamp={chat.timestamp}
      />
    </button>
  {/each}
</div>