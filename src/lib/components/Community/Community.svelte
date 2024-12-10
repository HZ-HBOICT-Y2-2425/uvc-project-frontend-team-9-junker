<script>
  import Card from './Card.svelte';
  // import { communities } from '$lib/stores/AllPurposeStore';
  import { goto } from '$app/navigation';

  /**
   * @type {never[]}
   */
  let communities = [];

  const loadCommunities = async () => {
    try {
      const response = await fetch(`http://localhost:3011/`);
      const data = await response.json();
      communities = data;
      // console.log(communities);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };
  loadCommunities();
  
  // Navigate to the create-community page
  function AddCommunity() {
    goto('/community/create'); // Ensure the route matches your actual setup
  }
</script>

<div class="min-h-screen bg-background dark:bg-background-dark flex flex-col">
  <!-- Header -->
  <h1 class="text-2xl font-bold text-center mt-4 mb-2">My Communities</h1>

  <!-- Styled Input Area -->
  <div class="bg-background dark:bg-background-dark rounded-lg shadow-md p-4 max-w-md mx-auto mb-4">
    <div class="flex items-center justify-center space-x-2">
      <input 
        type="text" 
        placeholder="Enter a code.." 
        class="px-4 py-2 border rounded-lg text-sm text-text dark:text-text-dark bg-background dark:bg-background-dark focus:ring-primary focus:border-primary"
      />
      <button 
        class="w-10 h-10 flex items-center justify-center bg-primary-500 dark:bg-primary-dark-500 text-white rounded-lg shadow-md" 
        aria-label="Submit code"
      >
        <i class="fa-solid fa-check"></i>
      </button>
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
        {#each communities as community (community.id)}
          <Card {community} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .min-h-screen {
    display: flex;
    flex-direction: column;
  }
</style>
