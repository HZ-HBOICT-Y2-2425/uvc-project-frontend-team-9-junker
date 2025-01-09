<script>
  // @ts-nocheck
  
    import PendingOffers from "./PendingOffers.svelte";
    import { likedItemsStore } from "../../stores/likedItemsStore";
    import { get } from "svelte/store";
    import ItemList from "./MyItems/ItemList.svelte";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/authStore";
    import {getItem} from "$lib/stores/ItemStore"
    import {getPicturesByItemId} from "$lib/stores/PictureStore"
    import { goto } from "$app/navigation";

    export let user;
    console.log(user);
  
    let likedItemIds = [];
    let likedItems = [];
    let auth;
    
    authStore.subscribe( async (authStore) => {
      likedItemIds = [];
      likedItems = [];
      auth = authStore;
      console.log(auth.liked_items);
      let newItem;
      await Promise.all(
        auth.liked_items.map(async (id) => likedItems.push(await getItem(id)))
      );
      await Promise.all(
        likedItems.map(async (item, index) => likedItems[index].pictures = await getPicturesByItemId(item.id))
      );
      console.log(likedItems[0]);
      console.log(likedItems.length);
    });

    async function loadPicture(itemId) {
      let pictures = await getPicturesByItemId(itemId);
      if(pictures?.data) {
        return pictures.data[0]
      }
      return false
    }
    
  
    // authStore.subscribe(async (auth) => {
    //   likedItemIds = auth.liked_items || []; // Get liked item IDs
  
    //   // Fetch all liked items using Promise.all
    //   const items = await Promise.all(
    //     likedItemIds.map(async (id) => await getItem(id))
    //   );
  
    //   // Update likedItems without duplicates
    //   likedItems = items.filter((item) => item !== null);
    // });
  
    /**
     * @type {never[]}
     */
    let myItems = [];
    /**
     * @type {any[]}
     */
    //let likedItems = [];
  
    let dealedItems = [
      {
        id: 1,
        title: "Tennis Racket",
        image: "path-to-racket.jpg",
        category: "sports",
        interested: 3,
        views: 12,
      },
      {
        id: 2,
        title: "Tennis Racket",
        image: "path-to-racket.jpg",
        category: "sports",
        interested: 3,
        views: 12,
      },
    ];
  
    let activeTab = "my-items";
    let carbonSavings = 0;
    let totalCarbonFootprint = user?.co2_reduction_kg;
    let level = "Beginner";
  
    const carbonThresholds = {
      Beginner: 10,
      Intermediate: 100,
      Advanced: 500,
      Expert: 1000,
    };
  
    // Watch likedItems store for updates
    // $: likedItems = get(likedItemsStore);
  
    onMount(() => {
      // Calculate user's CO2 level and savings
      if (totalCarbonFootprint >= carbonThresholds.Expert) {
        level = "Expert";
        carbonSavings = totalCarbonFootprint / carbonThresholds.Expert * 100;
      } else if (totalCarbonFootprint >= carbonThresholds.Advanced) {
        level = "Advanced";
        carbonSavings = totalCarbonFootprint / carbonThresholds.Advanced * 100;
      } else if (totalCarbonFootprint >= carbonThresholds.Intermediate) {
        level = "Intermediate";
        carbonSavings = totalCarbonFootprint / carbonThresholds.Intermediate * 100;
      } else {
        level = "Beginner";
        carbonSavings = totalCarbonFootprint / carbonThresholds.Beginner * 100;
      }
  
      // Ensure to send dealed items to the backend only once
      updateDealedItems();
    });
  
    // Function to send category and CO2 data to backend for each dealed item
    async function updateDealedItems() {
      const processedItems = [];  // Track which items have been processed
      console.log(processedItems);
      for (const item of dealedItems) {
        // If this item hasn't been processed before
        if (!processedItems.includes(item.id)) {
          processedItems.push(item.id);
  
          // Send the item's category to the backend
          const co2Amount = await fetchCO2Data(item.category);
  
          if (co2Amount) {
            // Update the user's profile CO2 with the new amount
            await updateUserCO2(co2Amount);
          }
        }
      }
    }
  
    // Fetch CO2 data from the backend based on item category
    /**
     * @param {any} category
     */
    async function fetchCO2Data(category) {
      try {
        const response = await fetch(`http://localhost:3012/co2/${category}`);
        const data = await response.json();
        const co2Amount = data[0].co2_reduction_kg
        return co2Amount;
      } catch (error) {
        console.error("Failed to fetch CO2 data:", error);
        return 0;
      }
    }
  
    // Update the user's CO2 reduction in the profile
    /**
     * @param {any} co2Amount
     */
    async function updateUserCO2(co2Amount) {
      try {
        const response = await fetch(`http://localhost:3012/user/${user.username}/co2`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ co2Reduction: co2Amount}),
        });
  
        const co2Update = response.json;
        console.log(co2Update);
        // Update the user's local state/store after successful update
        authStore.update((store) => ({
          ...store,
          user: {
            ...store.user,
            co2_reduction_kg: co2Update,
          },
        }));
  
        // Update totalCarbonFootprint after the CO2 is updated
        totalCarbonFootprint = co2Update;
      } catch (error) {
        console.error("Failed to update user's CO2:", error);
      }
    }
  </script>
  
  <div class="profile-container">
    <div class="tabs">
      <button class:active={activeTab === "my-items"} on:click={() => (activeTab = "my-items")}>
        My Items
      </button>
      <button class:active={activeTab === "liked-items"} on:click={() => (activeTab = "liked-items")}>
        Liked Items
      </button>
      <button class:active={activeTab === "dealed-items"} on:click={() => (activeTab = "dealed-items")}>
        Dealed Items
      </button>
      <button class:active={activeTab === "carbon-footprint"} on:click={() => (activeTab = "carbon-footprint")}>
        Carbon Footprint
      </button>
    </div>
  
    <!-- Conditional Rendering Based on Active Tab -->
    {#if activeTab === "my-items"}
      <!-- Content for My Items -->
    {:else if activeTab === "liked-items"}
      <div class="liked-items">
        {#if likedItems.length}
          {#each likedItems as item}
            <button class="liked-item" on:click={goto(`/item_details/${item.id}_${item.name}`)}>
              <img src={item.pictures[0]?.data || '/default-picture.jpg'} alt={item.name} class="item-image" />
              <div class="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </button>
          {/each}
        {:else}
          <p>No liked items yet. Swipe right to like items!</p>
        {/if}
      </div>
    {:else if activeTab === "dealed-items"}
      <ItemList items={dealedItems} />
    {:else if activeTab === "carbon-footprint"}
      <div class="carbon-footprint-section">
        <h3>Your Carbon Footprint</h3>
        <div class="footprint-stats">
          <p>You have reduced <strong>{totalCarbonFootprint} kg CO2</strong> emission</p>
          <p>Your Level: <strong>{level}</strong></p>
          <p>To Next Level: <strong>{carbonSavings || 0}%</strong></p>
          <div class="progress-bar">
            <div class="progress" style="width: {Math.min(carbonSavings, 100)}%"></div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  
  <style>
    .liked-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
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
  
  .item-info {
    flex-grow: 1;
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
    padding: 1.5rem;
    font-family: 'Arial', sans-serif;
    width: 80%;
  }
  
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
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