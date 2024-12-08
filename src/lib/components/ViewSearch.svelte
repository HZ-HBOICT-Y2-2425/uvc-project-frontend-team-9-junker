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
    const matchesCategory = !selectedCategory || item.categories.some((category) => category === selectedCategory);
    return matchesName && matchesCategory;
  });
</script>
 
<div class="filter-bar-container">
  <!-- Enhanced Filter Bar -->
  <div class="filter-bar shadow-lg">
    <!-- Search Bar with Icon -->
    <div class="search-bar">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="search-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m1.9-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
      </svg>
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search by name..."
        class="search-input"
      />
    </div>
 
    <!-- Category Filter -->
    <select bind:value={selectedCategory} class="category-select">
      <option value="">All Categories</option>
      <option value="Outdoors">Outdoors</option>
      <option value="Furniture">Furniture</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Clothing">Clothing</option>
      <option value="Sports">Sports</option>
    </select>
  </div>
</div>
 
<!-- Main Content -->
<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">
  <div class="text-text dark:text-text-dark overflow-y-auto" style="max-height: 100vh;">
    <div class="flex flex-col items-center p-4 space-y-8">
      <!-- Community Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
        {#if filteredItems.length > 0}
          {#each filteredItems as item}
            <CommunityListingCard item={item} />
          {/each}
        {:else}
          <li>No items match your search.</li>
        {/if}
      </div>
    </div>
  </div>
</div>
 
<style>
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
    border-color: var(—mint-hover);
    box-shadow: 0 0 10px rgba(51, 204, 204, 0.4); 
  }
</style>
 