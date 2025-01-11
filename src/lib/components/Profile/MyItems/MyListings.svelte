<script>
  import { goto } from "$app/navigation";

  export let items = [];

  /**
   * Returns a human-readable description for the listing type.
   * @param {number} action - The action type of the listing (0 for giveaway, 1 for trade offer).
   * @returns {string} - The corresponding text for the action type.
   */
  const getListingType = (action) => {
    return action === 0 ? "Giveaway" : "Trade Offer";
  };

  /**
   * Redirect to the item's details page.
   * @param {number} id - The item's ID.
   * @param {string} title - The item's title.
   */
  const redirectToDetails = (id, title) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-"); // Format title for URL
    goto(`/item_details/${id}_${formattedTitle}`);
  };
</script>

<div class="w-full p-4">
  <h2 class="text-lg sm:text-xl font-bold mb-4 text-center">My Listings</h2>

  {#if items.length > 0}
    <div class="space-y-4">
      {#each items as item}
        <div
          class="flex items-start bg-primary-900 dark:bg-primary-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          on:click={() => redirectToDetails(item.id, item.name)}
        >
          <!-- Item Image -->
          <div
            class="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0"
          >
            <img
              src={item.image || 'https://via.placeholder.com/150'}
              alt={item.name}
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Item Details -->
          <div class="ml-4 flex-1">
            <!-- Title -->
            <h3
              class="text-base sm:text-lg font-bold text-text dark:text-text-dark underline"
              on:click|stopPropagation={() =>
                redirectToDetails(item.id, item.name)
              }
            >
              {item.name}
            </h3>

            <!-- Creation Date -->
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Created: {new Date(item.created_at).toLocaleDateString()}
            </p>

            <!-- Listing Type -->
            <p class="text-sm font-semibold text-accent-400 dark:text-accent-dark-400">
              Type: {getListingType(item.action)}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-gray-500 dark:text-gray-400 text-center">
      No listings available.
    </p>
  {/if}
</div>

<style>
  h2 {
    font-family: "Arial", sans-serif;
    color: #4caf50;
  }

  p {
    font-family: "Arial", sans-serif;
  }

  .cursor-pointer:hover h3 {
    text-decoration: underline;
    color: #45a049;
  }

  .hover\:shadow-lg:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
</style>