<script>
  import ItemList from "./MyItems/ItemList.svelte";
  import PendingOffers from "./PendingOffers.svelte";

  let activeTab = "items"; // Default tab
  let items = [
    {
      title: "Tennis Racket",
      image: "path-to-racket.jpg",
      interested: 3,
      views: 12,
    },
    {
      title: "Mountain Bike",
      image: "path-to-bike.jpg",
      interested: 5,
      views: 20,
    },
  ];
  let pendingOffers = [
    {
      title: "Pending Offer 1",
      image: "path-to-offer1.jpg",
      interested: 2,
      views: 8,
    },
    {
      title: "Pending Offer 2",
      image: "path-to-offer2.jpg",
      interested: 4,
      views: 15,
    },
  ];
</script>

<div>
  <!-- Tabs Section -->
  <div class="absolute flex items-center justify-center w-full mt-8 relative h-[2vh] mb-2">
    <!-- Left Divider -->
    <hr class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 mr-4" />

    <!-- My Items Tab -->
    <button
      on:click={() => (activeTab = "items")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500={activeTab === "items"}
      class:text-primary-700={activeTab !== "items"}
      class:underline={activeTab === "items"}
      class:decoration-primary-500={activeTab === "items"}
      class:text-xl={activeTab === "items"}
      class:text-base={activeTab !== "items"}
    >
      My Items
    </button>

    <!-- Pending Tab -->
    <button
      on:click={() => (activeTab = "pending")}
      class="px-6 font-semibold transition-all duration-300"
      class:text-primary-500={activeTab === "pending"}
      class:text-primary-700={activeTab !== "pending"}
      class:underline={activeTab === "pending"}
      class:decoration-primary-500={activeTab === "pending"}
      class:text-xl={activeTab === "pending"}
      class:text-base={activeTab !== "pending"}
    >
      Pending Offers
    </button>

    <!-- Right Divider -->
    <hr class="flex-grow border-2 border-secondary-500 dark:border-secondary-dark-500 ml-4" />
  </div>

  <!-- Listings Section -->
  {#if activeTab === "items"}
    <ItemList {items} />
  {:else if activeTab === "pending"}
    <PendingOffers />
  {/if}
</div>