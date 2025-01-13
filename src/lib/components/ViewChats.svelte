<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import MyChats from "./Chat/MyChats.svelte";
  import SubHeaderV2 from "./SubHeaderV2.svelte";
    import CreateChatButton from "./CreateChatButton.svelte";

  export let userId;

  let chats = [];
  let isLoading = true;

  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3014/api/chat/last-messages/${userId}`);
      if (!response.ok) throw new Error(`Failed to fetch chats: ${response.statusText}`);
      const data = await response.json();
      chats = data.map(chat => ({
        userName: chat.sender === userId ? chat.recipient : chat.sender,
        lastMessage: chat.content,
        timestamp: chat.timestamp,
      }));
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      isLoading = false;
    }
  });
</script>

<SubHeaderV2 title="Chats"/>
<div class="chats-view space-y-4 bg-background dark:bg-background-dark text-text dark:text-text-dark p-4">
  {#if isLoading}
    <div class="flex justify-center text-secondary-500 dark:text-secondary-dark-500 items-center py-4">
      <span>Loading chats...</span>
    </div>
  {:else}
    <MyChats {chats} {userId} />
  {/if}
  <!-- <CreateChatButton username="aa"/> -->
</div>