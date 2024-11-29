<script>
// @ts-nocheck

    import { darkModeEnabled, items } from "$lib/stores/AllPurposeStore";
    import CommunityListingCard from "./CommunityListings/CommunityListingCard.svelte";

    // Reactive variables for search and filters
    let searchTerm = '';
    let selectedCategory = '';

    // Filtered items
    $: filteredItems = items.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.categories.some( (category) => category === selectedCategory);
      return matchesName && matchesCategory;
    });
</script>

<div>
  <div class="filter-bar">
    <!-- Search Bar -->
    <input
      type="text"
      bind:value={searchTerm}
      placeholder="Search by name..."
    />

    <!-- Category Filter -->
    <select bind:value={selectedCategory}>
      <option value="">All Categories</option>
      <option value="Outdoors">Outdoors</option>
      <option value="Furniture">Furniture</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Clothing">Clothing</option>
      <option value="Sports">Sports</option>
    </select>
  </div>
</div>

<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">

  <div class="text-text dark:text-text-dark overflow-y-auto" style="max-height: 100vh;">
        
    <div class="flex flex-col items-center p-4 space-y-8">
    
        <!-- Community Grid -->
        <!--TODO: Get rid of top margin-->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
            <!-- Community Cards -->
            {#if filteredItems.length > 0}
              {#each filteredItems as item}
                <CommunityListingCard
                item = {item}
                />
              {/each}
            {:else}
              <li>No items match your search.</li>
            {/if}
        </div>
    </div>
</div>
</div>

<style>
  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .item-list {
    list-style-type: none;
    padding: 0;
  }

  .item-list li {
    margin-bottom: 10px;
  }
</style>