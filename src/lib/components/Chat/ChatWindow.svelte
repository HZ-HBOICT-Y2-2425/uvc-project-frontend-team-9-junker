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

  // Reference for the messages container
  let messagesContainer;
  let showScrollButton = false; // Controls the visibility of the scroll button

  /**
   * Scroll to the bottom of the messages container
   */
  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth", // Smooth scrolling for a polished experience
      });
    }
  }

  /**
   * Check if the user is scrolled to the bottom of the messages container
   */
  function handleScroll() {
    if (messagesContainer) {
      const isAtBottom =
        messagesContainer.scrollHeight -
          messagesContainer.scrollTop -
          messagesContainer.clientHeight <=
        50; // Add tolerance (50px)
      showScrollButton = !isAtBottom;
    }
  }

  // Automatically scroll to the bottom when messages change or loading finishes
  $: if (messagesContainer && !isLoading) {
    scrollToBottom();
  }

  function sendMessage(event) {
    const content = event.detail.content;
    const newMessage = { sender, recipient, content, timestamp: Date.now() };
    messages = [...messages, newMessage];
    dispatch("send", newMessage);
    scrollToBottom(); // Ensure scrolling happens after sending
  }
</script>

<div class="flex flex-col h-screen bg-background dark:bg-background-dark relative">
  <!-- Chat Header -->
  <div class="sticky top-0 z-10">
    <ChatHeader {recipient} />
  </div>

  <!-- Messages Section -->
  <div
    class="flex-grow overflow-y-auto p-4 bg-background dark:bg-background-dark relative"
    bind:this={messagesContainer}
    on:scroll={handleScroll}
  >
    {#if isLoading}
      <div class="absolute inset-0 flex justify-center items-center bg-background dark:bg-background-dark">
        <span class="text-secondary-500 dark:text-secondary-dark-500">Loading chats...</span>
      </div>
    {:else}
      {#each messages as message, i}
        <!-- Display user's ID dynamically aligned -->
        {#if i === 0 || message.sender !== messages[i - 1]?.sender}
          <div
            class={`mb-1 font-bold text-sm ${
              message.sender === sender ? 'text-right pr-4 text-secondary-500 dark:text-secondary-dark-500' : 'text-left pl-4 text-primary-500 dark:text-primary-dark-500'
            }`}
          >
            {message.sender}
          </div>
        {/if}
        <div class="mb-4">
          <ChatMessage {message} isSender={message.sender === sender} />
        </div>
      {/each}
    {/if}
  </div>

  <!-- Scroll to Bottom Button -->
  {#if showScrollButton}
    <button
      on:click={scrollToBottom}
      class="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 transition-all"
      aria-label="Scroll to Bottom"
    >
      <i class="fas fa-chevron-down"></i>
    </button>
  {/if}

  <!-- Input Section -->
  <div class="sticky bottom-0 z-10">
    <ChatInput on:send={sendMessage} />
  </div>
</div>