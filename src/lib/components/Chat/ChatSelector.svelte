<script>
    import MyChats from "./MyChats.svelte";
    import PendingChats from "./PendingChats.svelte";

  let activeTab = "chats"; // Current tab
</script>

<div>
  <!-- Tabs Section -->
  <div class="absolute flex items-center justify-center w-full mt-8 relative h-[2vh] mb-2">
    <!-- Left Divider -->
    <hr
      class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 mr-4"
    />

    <!-- My Chats Tab -->
    <button
      on:click={() => (activeTab = "chats")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500={activeTab === "chats"}
      class:text-primary-700={activeTab !== "chats"}
      class:underline={activeTab === "chats"}
      class:decoration-primary-500={activeTab === "chats"}
      class:text-xl={activeTab === "chats"}
      class:text-base={activeTab !== "chats"}
    >
      My Chats
    </button>

    <!-- Pending Tab -->
    <button
      on:click={() => (activeTab = "pending")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500={activeTab === "pending"}
      class:text-primary-700={activeTab !== "pending"}
      class:underline={activeTab === "pending"}
      class:decoration-primary-500={activeTab === "pending"}
      class:text-xl={activeTab === "pending"}
      class:text-base={activeTab !== "pending"}
    >
      Pending
    </button>

    <!-- Right Divider -->
    <hr
      class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 ml-4"
    />
  </div>

  <!-- Listings Section -->
  {#if activeTab === "chats"}
    <MyChats />
  {:else if activeTab === "pending"}
    <PendingChats />
  {/if}
</div>
