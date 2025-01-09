<script>
  import Card from './Card.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import fetchUserData from '$lib/utils/fetchUserWithAuth';

  let communities = [];
  let userData;
  let searchTerm = ''; // Search term for filtering communities

  onMount(async () => {
    try {
      // Fetch user data
      userData = await fetchUserData();

      // Fetch communities
      const response = await fetch(`http://localhost:3011/`);
      const data = await response.json();
      communities = data;
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  });

    // Filtered communities based on search term
    $: filteredCommunities = communities.filter((community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Navigate to the create-community page
  function AddCommunity() {
    goto('/community/create'); // Ensure the route matches your actual setup
  }
</script>

<div class="min-h-screen bg-background dark:bg-background-dark flex flex-col">
  <!-- Header -->
  <h1 class="text-2xl font-bold text-center mt-4 mb-2">My Communities</h1>

  <!-- Search Bar -->
  <div class="bg-background dark:bg-background-dark rounded-lg shadow-md p-4 max-w-md mx-auto mb-4">
    <div class="search-bar">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search communities..."
        class="search-input rounded-full border p-2 w-full"
      />
    </div>
  </div>

  <!-- Main Scrollable Section -->
  <div class="flex-grow overflow-y-auto text-text dark:text-text-dark">
    <div class="flex flex-col items-center p-4 space-y-8">
      <!-- Community Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <!-- Add Community Button -->
        <div
          class="flex flex-col items-center justify-center bg-background dark:bg-background-dark rounded-lg shadow-md border-4 border-secondary-500 dark:border-secondary-dark-500 cursor-pointer hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 transition aspect-square text-center"
          role="button"
          tabindex="0"
          on:click={AddCommunity}
          on:keydown={(e) => e.key === 'Enter' && AddCommunity()}
        >
          <i class="fa-solid fa-plus text-secondary-500 dark:text-secondary-dark-500 text-4xl md:text-5xl"></i>
          <span class="mt-2 text-sm md:text-base font-medium text-secondary-500 dark:text-secondary-dark-500">
            Add Community
          </span>
        </div>

        <!-- Community Cards -->
        {#if filteredCommunities.length > 0}
          {#each filteredCommunities as community (community.id)}
            <Card {community} />
          {/each}
        {:else}
          <p>No communities match your search.</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .min-h-screen {
    display: flex;
    flex-direction: column;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid #ccc;
    border-radius: 20px;
    font-size: 1rem;
    background-color: white;
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  .search-input:focus {
    border-color: #39c69c;
    box-shadow: 0 0 10px rgba(51, 204, 204, 0.4);
  }
</style>
