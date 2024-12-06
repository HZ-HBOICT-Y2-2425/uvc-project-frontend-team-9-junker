<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import MyChats from "./Chat/MyChats.svelte";
  import SubHeaderV2 from "./SubHeaderV2.svelte";

  let chats = [];
  const loggedInUserId = "user2"; // Replace this with your actual logged-in user logic.

  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3014/api/chat/last-messages/${loggedInUserId}`);
      if (!response.ok) throw new Error(`Failed to fetch chats: ${response.statusText}`);
      const data = await response.json();

      chats = data.map((chat) => ({
        userName: chat.sender === loggedInUserId ? chat.recipient : chat.sender,
        lastMessage: chat.content,
        timestamp: chat.timestamp,
      }));
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  });
</script>

<div class="chats-view space-y-4">
  <SubHeaderV2 title="Chats" />
  <MyChats {chats} />
</div>