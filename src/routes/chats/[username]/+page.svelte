<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import ChatWindow from "$lib/components/Chat/ChatWindow.svelte";
  import { authStore } from "$lib/stores/authStore";
  import { page } from "$app/stores";
  import fetchUserData from "$lib/utils/fetchUserWithAuth";

  fetchUserData();
  
  const { username } = $authStore;
  const userId = username;

  const recipient = $page.params.username;

  let messages = [];
  let isLoading = true;

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  async function loadMessages() {
    const chatId = [userId, recipient].sort().join("_");
    try {
      const response = await fetch(`http://localhost:3014/api/chat/${chatId}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      messages = await response.json();
    } catch (error) {
      console.error("Error loading messages:", error.message);
    } finally {
      isLoading = false;
    }
  }

  async function handleSend(event) {
    const chatId = [userId, recipient].sort().join("_");
    const newMessage = {
      chatId,
      sender: userId,
      recipient,
      content: event.detail.content,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch("http://localhost:3014/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) throw new Error("Failed to send message");
      messages = [...messages, newMessage];
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }

  onMount(loadMessages);
</script>

<ChatWindow {messages} sender={userId} recipient={recipient} {isLoading} on:send={handleSend} />