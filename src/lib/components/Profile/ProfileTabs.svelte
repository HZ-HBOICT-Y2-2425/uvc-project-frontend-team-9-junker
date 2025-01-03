<script>
  import PendingOffers from "./PendingOffers.svelte";
  import { likedItemsStore } from "../../stores/likedItemsStore";
  import { get } from "svelte/store";

  let activeTab = "pending";
  let likedItems = [];
  $: likedItems = get(likedItemsStore);
</script>

<div>
  <div>
    <!-- <button on:click={() => (activeTab = "items")}>My Items</button> -->
    <button on:click={() => (activeTab = "pending")}>liked Items</button>
  </div>

  {#if activeTab === "pending"}
    <PendingOffers />
  {/if}
</div>
