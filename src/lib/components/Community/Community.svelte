<script>
  import Card from './Card.svelte';
  import { communities } from '$lib/stores/AllPurposeStore';
  import { goto } from '$app/navigation';

  console.log($communities); // Debugging to check the communities in the store

  // Navigate to the create-community page
  function AddCommunity() {
    goto('/create-community'); // Ensure the route matches your actual setup
  }
</script>

<div class="h-screen overflow-y-auto bg-background dark:bg-background-dark">
  <div class="flex flex-col items-center p-4 space-y-8">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-center">My Communities</h1>

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
      {#each $communities as community (community.id)}
        <Card {community} />
      {/each}
    </div>
  </div>
</div>
