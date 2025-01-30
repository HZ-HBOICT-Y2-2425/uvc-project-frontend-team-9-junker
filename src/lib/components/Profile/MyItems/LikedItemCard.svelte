<script>
// @ts-nocheck

    import { getItem } from "$lib/stores/ItemStore";
    import { getPicturesByItemId } from "$lib/stores/PictureStore";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let itemId;

    let likedItem;
    let pictures;

    onMount( async () => {
        likedItem = await getItem(itemId);
        pictures = await getPicturesByItemId(itemId);
        console.log(pictures);
    })
</script>

{#if likedItem?.name}
<button
    on:click={() => goto(`/item_details/${likedItem?.id}_${likedItem?.name}`)}
  class="flex flex-col p-4 bg-primary-900 dark:bg-primary-100 rounded-lg shadow-md h-22 w-full"
>
  <!-- Header Section -->
  <div class="flex items-start">
    <!-- Item Image -->
    <div
      class="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0"
    >
      <img
        src={pictures?.[0]?.data || '/default-picture.jpg'}
        alt={likedItem?.name}
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Title and Interest -->
    <div class="flex-1 ml-2">
        <div class="w-full text-ellipsis text-lg font-bold">{likedItem?.name}</div>
        <div class="w-full text-ellipsis text-1">{likedItem?.description}</div>
    </div>
  </div>
</button>
{/if}


<style>
    .liked-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .liked-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
  }
  
  .item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .item-info h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .item-info p {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .profile-container {
    font-family: 'Arial', sans-serif;
    width: 100%;
  }
  
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
  }
  
  .tabs button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background: #e0e0e0;
    color: #333;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    width: 25vw;
  }
  
  .tabs button.active {
    background: #4caf50;
    color: white;
    font-weight: bold;
  }
  
  .tabs button:hover {
    background: #45a049;
  }
  
  .carbon-footprint-section {
    text-align: center;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .carbon-footprint-section h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .footprint-stats p {
    font-size: 1.1rem;
    color: #555;
    margin: 0.5rem 0;
  }
  
  .progress-bar {
    width: 100%;
    max-width: 400px;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    margin: 1rem auto;
    overflow: hidden;
    position: relative;
  }
  
  .progress-bar .progress {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #81c784);
    transition: width 0.4s ease-in-out;
  }
  
</style>