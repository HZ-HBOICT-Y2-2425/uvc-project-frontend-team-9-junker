<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import ChatWindow from "$lib/components/Chat/ChatWindow.svelte";

  const sender = "user2"; // Replace this with your logged-in user logic.
  const recipient = $page.params.username; // Get the recipient username from the route.

  let messages = [];
  let isLoading = true; // Loading state

  onMount(async () => {
    try {
      const chatId = [sender, recipient].sort().join("_");
      const response = await fetch(`http://localhost:3014/api/chat/${chatId}`);
      if (!response.ok) throw new Error(`Failed to fetch messages: ${response.statusText}`);
      const data = await response.json();

      messages = data.map((msg) => ({
        sender: msg.sender,
        recipient: msg.recipient,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      isLoading = false; // Ensure isLoading is set to false
    }
  });

  async function handleSend(event) {
    const content = event.detail.content;

    // Construct the required fields for the payload
    const chatId = [sender, recipient].sort().join("_");
    const newMessage = { chatId, sender, recipient, content, timestamp: Date.now() };

    try {
      const response = await fetch("http://localhost:3014/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) throw new Error(`Failed to send message: ${response.statusText}`);
      messages = [...messages, newMessage];
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
</script>

<ChatWindow {messages} {sender} {recipient} {isLoading} on:send={handleSend} />