<script>
  import PublicProfile from './Listings/PublicProfile.svelte';
  import ItemList from './Listings/ItemList.svelte';
  import SavedListings from './Listings/SavedListings.svelte';

  let activeTab = "listings"; // Current tab

  const profile = {
    name: "James M. Mason",
    avatar: "path-to-avatar.jpg",
    badges: ["Big Trader", "Donator", "Lvl 10"]
  };

  const listings = [
    {
      title: "Tennis Racket",
      image: "path-to-racket.jpg",
      interested: 3,
      views: 12
    },
    {
      title: "Bicycle",
      image: "path-to-bicycle.jpg",
      interested: 5,
      views: 20
    }
  ];

  const savedListings = [
    {
      username: "zhly",
      image: "path-to-saved-item1.jpg",
      views: 15,
      saves: 4
    },
    {
      username: "zhly",
      image: "path-to-saved-item2.jpg",
      views: 8,
      saves: 2
    },
    {
      username: "zhly",
      image: "path-to-saved-item3.jpg",
      views: 30,
      saves: 10
    }
  ];
</script>

<div class="flex flex-col items-center p-6">
  <!-- Profile Section -->
  <PublicProfile {profile} />

  <!-- Tabs Section -->
  <div class="flex items-center justify-center w-full mt-8 relative">
    <!-- Left Divider -->
    <hr class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 mr-4" />

    <!-- My Listings Tab -->
    <button
      on:click={() => (activeTab = "listings")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500="{activeTab === 'listings'}"
      class:text-primary-700="{activeTab !== 'listings'}"
      class:underline="{activeTab === 'listings'}"
      class:decoration-primary-500="{activeTab === 'listings'}"
      class:text-xl="{activeTab === 'listings'}"
      class:text-base="{activeTab !== 'listings'}"
    >
      My Items
    </button>

    <!-- Saved Listings Tab -->
    <button
      on:click={() => (activeTab = "saved")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500="{activeTab === 'saved'}"
      class:text-primary-700="{activeTab !== 'saved'}"
      class:underline="{activeTab === 'saved'}"
      class:decoration-primary-500="{activeTab === 'saved'}"
      class:text-xl="{activeTab === 'saved'}"
      class:text-base="{activeTab !== 'saved'}"
    >
      Saved
    </button>

    <!-- Right Divider -->
    <hr class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 ml-4" />
  </div>

  <!-- Listings Section -->
  {#if activeTab === "listings"}
    <ItemList items={listings} />
  {:else if activeTab === "saved"}
    <SavedListings {savedListings} />
  {/if}
</div>
