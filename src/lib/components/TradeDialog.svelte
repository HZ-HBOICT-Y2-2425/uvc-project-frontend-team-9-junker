<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  export let userItems = []; // Items listed by the user
  export let selectedItem = null;

  const dispatch = createEventDispatcher(); // Dispatch events for close and confirm

  let loading = true;

  // Fetch user items when the dialog opens
  $: if (userItems.length > 0) {
    loading = false;
  }

  function selectItem(item) {
    selectedItem = item;
  }

  function confirmTrade() {
    if (selectedItem) {
      dispatch("confirm", selectedItem); // Emit selected item
    }
  }

  function closeDialog() {
    dispatch("close"); // Emit close event
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
  transition:fly={{ y: 20, duration: 300 }}
>
  <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
    <h2 class="text-xl font-bold mb-4">Select an Item for Trade</h2>

    {#if loading}
      <p class="text-center text-gray-500">Loading your items...</p>
    {:else if userItems.length === 0}
      <p class="text-center text-gray-500">You have no items listed for trade.</p>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {#each userItems as item}
          <div
            class="p-4 border rounded-lg cursor-pointer hover:border-primary-500 transition duration-300"
            class:selected={selectedItem?.id === item.id}
            on:click={() => selectItem(item)}
          >
            <img
              src={item.pictures?.split(",")[0] || "https://via.placeholder.com/150"}
              alt={item.name}
              class="h-24 w-full object-cover rounded mb-2"
            />
            <h3 class="text-sm font-bold">{item.name}</h3>
          </div>
        {/each}
      </div>

      <div class="flex justify-end mt-6">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
          on:click={closeDialog}
        >
          Cancel
        </button>
        <button
          class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
          on:click={confirmTrade}
          disabled={!selectedItem}
        >
          Confirm Trade
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.selected) {
    border-color: #4caf50; /* Tailwind primary color */
    background-color: #e8f5e9; /* Light green background for selection */
  }
</style>