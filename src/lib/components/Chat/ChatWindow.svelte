<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";
  import ChatHeader from "./ChatHeader.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import ChatInput from "./ChatInput.svelte";

  export let messages = [];
  export let sender = "";
  export let recipient = "";
  export let isLoading = true; // Loading state passed from parent

  const dispatch = createEventDispatcher();

  // Auto-scroll to the bottom when messages update
  let messagesContainer;
  $: if (messagesContainer && !isLoading) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function sendMessage(event) {
    const content = event.detail.content;
    const newMessage = { sender, recipient, content, timestamp: Date.now() };
    messages = [...messages, newMessage];
    dispatch("send", newMessage);
  }
</script>

<div class="flex flex-col h-screen bg-background dark:bg-background-dark">
  <!-- Chat Header -->
  <div class="sticky top-0 z-10">
    <ChatHeader {recipient} />
  </div>

  <!-- Messages Section -->
  <div
    class="flex-grow overflow-y-auto p-4 bg-background dark:bg-background-dark relative"
    bind:this={messagesContainer}
  >
    {#if isLoading}
      <div class="absolute inset-0 flex justify-center items-center bg-background dark:bg-background-dark">
        <span class="text-secondary-500 dark:text-secondary-dark-500">Loading chats...</span>
      </div>
    {:else}
      {#each messages as message}
        <ChatMessage {message} isSender={message.sender === sender} />
      {/each}
    {/if}
  </div>

  <!-- Input Section -->
  <div class="sticky bottom-0 z-10">
    <ChatInput on:send={sendMessage} />
  </div>
</div>