<script>
  import { savedListingsStore } from '$lib/stores/savedStore'; // Adjust path as necessary
  import { onMount } from 'svelte';

  // Profile details
  export let profile = {
    name: "James M. Mason",
    avatar: "https://via.placeholder.com/150", // Placeholder avatar image
    badges: ["Big Trader", "Donator", "Lvl 10"]
  };

  let savedListings = []; // Local array for saved listings

  // Subscribe to the saved listings store on mount
  onMount(() => {
    const unsubscribe = savedListingsStore.subscribe((saved) => {
      savedListings = saved; // Reactively update the local array
    });

    return () => {
      unsubscribe(); // Clean up the subscription when the component unmounts
    };
  });
</script>

<div class="profile-container flex flex-col items-center">
  <!-- Avatar Section -->
  <div class="avatar relative">
    <img
      src={profile.avatar}
      alt="{profile.name}"
      class="w-32 h-32 rounded-full border-4 border-green-500"
    />
  </div>

  <!-- Name Section -->
  <h1 class="mt-4 text-2xl text-primary-500 font-bold">{profile.name}</h1>

  <!-- Badges Section -->
  <div class="badges mt-2 flex flex-wrap justify-center space-x-2">
    {#each profile.badges as badge}
      <span
        class="badge px-3 py-1 text-sm font-semibold text-white rounded-full"
        class:bg-green-500="{badge === 'Big Trader'}"
        class:bg-purple-500="{badge === 'Donator'}"
        class:bg-red-500="{badge === 'Lvl 10'}"
      >
        {badge}
      </span>
    {/each}
  </div>

  <!-- Saved Listings Section -->
  <div class="saved-listings w-full mt-6">
    <h2 class="text-xl text-center font-bold text-primary-500">Saved Listings</h2>
    <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4">
      {#each savedListings as saved}
        <div class="saved-listing relative bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <img
            src={saved.image}
            alt="{saved.title}"
            class="w-full h-32 object-cover sm:h-40"
          />
          <div
            class="info absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-sm p-2 flex justify-between"
          >
            <span class="truncate">{saved.title}</span>
            <span class="text-green-500"><i class="fa-solid fa-bookmark"></i></span>
          </div>
        </div>
      {/each}
    </div>
    {#if savedListings.length === 0}
      <p class="empty-message text-center text-gray-500 mt-4">
        You haven't saved any listings yet.
      </p>
    {/if}
  </div>
</div>

<style>
/* Profile Styling */
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 16px;
}

.avatar img {
  object-fit: cover;
}

/* Badges Styling */
.badge {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 1rem;
}

/* Saved Listings Styling */
.saved-listing {
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.saved-listing:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.saved-listing img {
  object-fit: cover;
}

.saved-listing .info {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem;
}

/* Empty State */
.empty-message {
  text-align: center;
  color: gray;
  margin-top: 16px;
  font-style: italic;
}
</style>
