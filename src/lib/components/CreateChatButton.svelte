<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { createNewChat } from "$lib/utils/chatService.js";
  import { authStore } from "$lib/stores/authStore";

  export let username; // Recipient's username
  export let itemName; // 

  async function handleCreateChat() {
    const sender = $authStore.username;
    const chatId = [sender, username].sort().join("_"); // Consistent chatId
    try {
      let msg = "Im interested in your item: " + itemName;
      await createNewChat(chatId, sender, username, msg); // Optionally send a first message
      goto(`/chats/${username}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }
</script>

<button
  class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background hover:text-background dark:hover:text-text-dark"
  on:click={handleCreateChat}
  aria-label="Chats">
  <i class="fa-solid fa-comment text-6xl"></i>
</button>