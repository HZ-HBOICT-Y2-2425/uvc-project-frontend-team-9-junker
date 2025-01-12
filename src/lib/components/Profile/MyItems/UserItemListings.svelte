<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let userId;

  let items = [];
  let isLoading = true;
  let errorMessage = null;

  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3017/items/user/${userId}`);
      const data = await response.json();

      if (response.ok && data.meta.status === 200) {
        items = data.data;
      } else {
        errorMessage = data.meta.message || "Failed to fetch listings.";
      }
    } catch (error) {
      errorMessage = "An error occurred while fetching the listings.";
      console.error(error);
    } finally {
      isLoading = false;
    }
  });

  const handleItemClick = (itemId, itemName) => {
    goto(`/item_details/${itemId}_${itemName}`);
  };
</script>

<div class="p-4 space-y-6">
  {#if isLoading}
    <p class="text-center text-gray-500">Loading your listings...</p>
  {:else if errorMessage}
    <p class="text-center text-red-500">{errorMessage}</p>
  {:else if items.length === 0}
    <p class="text-center text-gray-500">No listings found.</p>
  {:else}
    <div class="space-y-4">
      {#each items as item}
        <div
          class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          on:click={() => handleItemClick(item.id, item.name)}
        >
          <!-- Left Content -->
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Created on: {new Date(item.created_at).toLocaleDateString()}
            </p>
            <p
              class={`text-sm font-medium ${
                item.available
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {item.available ? "Available" : "Traded/Given Away"}
            </p>
          </div>

          <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <!-- Image -->
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>