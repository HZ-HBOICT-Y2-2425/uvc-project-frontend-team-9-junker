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
    import UserItemListings from "./MyItems/UserItemListings.svelte";
    import LikedItemList from "./MyItems/LikedItemList.svelte";
    

    export let user;
    console.log(user);

    async function loadPicture(itemId) {
      let pictures = await getPicturesByItemId(itemId);
      if(pictures?.data) {
        return pictures.data[0]
      }
      return false
    }
  
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
        id: 3,
        title: "Tennis Racket",
        image: "path-to-racket.jpg",
        category: "Sports Equipment",
        interested: 3,
        views: 12,
      },
      {
        id: 4,
        title: "Sneakers",
        image: "path-to-sneakers.jpg",
        category: "Shoes",
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
      if (totalCarbonFootprint >= carbonThresholds.Expert) {
        level = "Expert";
        carbonSavings = 100; // Already at the highest level
      } else if (totalCarbonFootprint >= carbonThresholds.Advanced) {
        level = "Advanced";
        carbonSavings = ((totalCarbonFootprint - carbonThresholds.Advanced) /
        (carbonThresholds.Expert - carbonThresholds.Advanced)) * 100;
      } else if (totalCarbonFootprint >= carbonThresholds.Intermediate) {
        level = "Intermediate";
        carbonSavings = ((totalCarbonFootprint - carbonThresholds.Intermediate) /
        (carbonThresholds.Advanced - carbonThresholds.Intermediate)) * 100;
    } else if (totalCarbonFootprint >= carbonThresholds.Beginner) {
        level = "Beginner";
        carbonSavings = ((totalCarbonFootprint - carbonThresholds.Beginner) /
        (carbonThresholds.Intermediate - carbonThresholds.Beginner)) * 100;
      } else {
        level = "Beginner";
        carbonSavings = (totalCarbonFootprint / carbonThresholds.Beginner) * 100;
      }
  
      updateDealedItems();
      fetchUserCO2Data();
    }); 
  

    async function updateDealedItems() {
      for (const item of dealedItems) {
    const newDealedItem = await addDealedItemBack(item.id);
    if (newDealedItem) {
      // Fetch CO2 data and update the user's profile
          const co2Amount = await fetchCO2Data(item.category);
          if (co2Amount) {
        console.log("Updating user's CO2 for item ID:", item.id);
            await updateUserCO2(co2Amount);
          }
    } else {
      console.log("Item ID already processed:", item.id);
        }
      }
    }

async function addDealedItemBack(itemid) {
  try {
    const response = await fetch(`http://localhost:3012/dealed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: user.id, itemid }),
    });
    const data = await response.json();
    console.log("Response from backend:", data);
    return data;
  } catch (error) {
    console.error("Failed to add dealed item:", error);
    return false;
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
        console.log(co2Amount);
        return co2Amount;
      } catch (error) {
        console.error("Failed to fetch CO2 data:", error);
        return 0;
      }
    }

  async function fetchUserCO2Data() {
    try {
      const response = await fetch(`http://localhost:3012/user/${user.username}/co2`);
      const data = await response.json();
      totalCarbonFootprint = data;
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
        body: JSON.stringify({ co2_reduction: co2Amount}),
        });
  
        const data = await response.json();
        const co2Update = data;
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
    <UserItemListings userId={user.id} />
    {:else if activeTab === "liked-items"}
      <LikedItemList likedItemsIdArray={user.liked_items}/>
    {:else if activeTab === "dealed-items"}
      <ItemList items={dealedItems} />
    {:else if activeTab === "carbon-footprint"}
      <div class="carbon-footprint-section">
        <h3>Your Carbon Footprint</h3>
        <div class="footprint-stats">
          <p>You have reduced <strong>{totalCarbonFootprint} kg CO2</strong> emission</p>
        <p>To Next Level: <strong>{Math.floor(carbonSavings) || 0}%</strong></p>
          <div class="progress-bar">
          <div class="progress" style="width: {Math.floor(Math.min(carbonSavings, 100))}%"></div>
        </div>
      </div>
    </div>
  {:else if activeTab === "dealed-items"}
    <ItemList items={dealedItems}/>
    {/if}
  </div>
  
<style>
  
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
