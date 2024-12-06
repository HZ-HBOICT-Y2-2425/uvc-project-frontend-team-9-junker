<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";
  import ChatHeader from "./ChatHeader.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import ChatInput from "./ChatInput.svelte";

  export let messages = [];
  export let sender = "";
  export let recipient = "";

  const dispatch = createEventDispatcher();

  function sendMessage(event) {
    const content = event.detail.content;
    const newMessage = { sender, recipient, content, timestamp: Date.now() };
    messages = [...messages, newMessage];
    dispatch("send", newMessage);
  }
</script>

<div class="chat-window">
  <ChatHeader {recipient} />
  <div class="messages">
    {#each messages as message}
      <ChatMessage {message} isSender={message.sender === sender} />
    {/each}
  </div>
  <ChatInput on:send={sendMessage} />
</div>