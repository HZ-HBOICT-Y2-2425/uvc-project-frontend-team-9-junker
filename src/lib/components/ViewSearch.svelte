<script>
// @ts-nocheck

    import { categories, darkModeEnabled, items } from "$lib/stores/AllPurposeStore";
    import { onMount } from "svelte";
    import { getAllItems } from "$lib/stores/ItemStore";
    import CommunityListingCard from "./CommunityListings/CommunityListingCard.svelte";
    import { Category } from "$lib/models/Category.js";

    // Reactive variables for search and filters
    let searchTerm = '';
    let selectedCategory = '';
    let thisItems = items;

    // Filtered items
    $: filteredItems = thisItems.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.categories === selectedCategory;
      return matchesName && matchesCategory;
    });

    onMount( async () => {
      thisItems = await getAllItems();
      console.log(thisItems);
    });

</script>

<!-- Content Wrapper -->
<div class="h-full w-full overflow-scroll">
<div class="filter-bar-container">
  <!-- Enhanced Filter Bar -->
  <div class="filter-bar shadow-lg px-4 py-2">
    <!-- Search Bar with Icon -->
    <div class="search-bar">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search by name..."
        class="search-input rounded-full border p-2 w-full mb-2"
      />
    </div>

    <!-- Category Filter -->
    <select bind:value={selectedCategory} class="category-select rounded-full border p-2 w-full">
      <option value="">All Categories</option>
      {#each categories as category}
      <option value="{String(category.id)}">{category.name}</option>
      {/each}
    </select>
  </div>
</div>

<!-- Main Content -->
<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark flex flex-col flex-nowrap">
  <div class="text-text dark:text-text-dark">
    <div class="flex flex-col items-center p-4 space-y-8">
      <!-- Community Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-full overflow-hidden">
        {#if filteredItems.length > 0}
          {#each filteredItems as item}
            {#key item}
              <CommunityListingCard item={item} />
            {/key}
          {/each}
        {:else}
          <li>No items match your search.</li>
        {/if}
      </div>
    </div>
  </div>
</div>
</div>

<!--style>
  :root {
    --mint-color: #39c69c; /*color*/
    --mint-hover: #a3ebe1; 
  }

  .filter-bar-container {
    margin: 20px 10px;
    text-align: center;
  }

  .filter-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--mint-color); 
    border-radius: 25px;
    padding: 10px 15px;
    width: 90%;
    margin: 0 auto;
  }

  .search-bar {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    height: 20px;
    width: 20px;
    color: #4a5568;
  }

  .search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 2px solid var(--mint-hover); 
    border-radius: 20px;
    font-size: 1rem;
    background-color: white; 
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  .search-input:focus {
    border-color: var(--mint-hover); 
    box-shadow: 0 0 10px rgba(51, 204, 204, 0.4);
  }

  .category-select {
    margin-left: 10px;
    padding: 10px 15px;
    border: 2px solid var(--mint-hover); 
    border-radius: 20px;
    font-size: 1rem;
    background-color: white;
    color: #4a5568;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .category-select:focus {
    border-color: var(--mint-hover);
    box-shadow: 0 0 10px rgba(51, 204, 204, 0.4); 
  }
</style-->
