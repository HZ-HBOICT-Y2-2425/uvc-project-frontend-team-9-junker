<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { createNewChat } from "$lib/utils/chatService.js";
  import { authStore } from "$lib/stores/authStore";

  export let username; // Recipient's username

  async function handleCreateChat() {
    const sender = $authStore.username;
    const chatId = [sender, username].sort().join("_"); // Consistent chatId
    try {
      await createNewChat(chatId, sender, username, "Im interested in your item:"); // Optionally send a first message
      goto(`/chats/${username}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }
</script>

<button
  on:click={handleCreateChat}
  class="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
>
  Start Chat with {username}
</button>