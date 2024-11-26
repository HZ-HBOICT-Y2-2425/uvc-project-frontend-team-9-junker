<script>
  import { goto } from '$app/navigation'; // Import the goto function
  import { savedListingsStore } from '$lib/stores/AllPurposeStore';
  /** @type {Array<{image: string, views: number, saves: number, username: string}>} */
  export let savedListings = [];

  // Function to navigate to the user's profile page
  /**
   * @param {string} username
   */
  function gotoUser(username) {
    // Set the savedListingsStore with the saved listings
    savedListingsStore.set(username);
    goto(`/public_profile`); // Redirect to the profile page using the username
  }
</script>

<div class="w-full">
  <div class="grid grid-cols-3 gap-4 mt-6 sm:grid-cols-4">
    {#each savedListings as saved}
      <div class="relative bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <div>
          <!-- On click, call gotoUser with the saved username -->
          <span on:click={() => gotoUser(saved.username)}>
            <i class="fa-solid fa-eye text-accent-500 dark:text-accent-dark-500"></i> {saved.username}
          </span>
        </div>
        <img
          src={saved.image}
          alt="Saved Item"
          class="w-32 h-32 object-cover sm:w-40 sm:h-40"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-accent-500 dark:text-accent-dark-500 text-l p-2 flex justify-between"
        >
          <span><i class="fa-solid fa-eye text-accent-500 dark:text-accent-dark-500"></i> {saved.views}</span>
          <span><i class="fa-solid fa-bookmark text-accent-500 dark:text-accent-dark-500"></i> {saved.saves}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
