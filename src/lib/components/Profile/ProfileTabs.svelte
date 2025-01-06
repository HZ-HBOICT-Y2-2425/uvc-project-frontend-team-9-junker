<script>
  import PendingOffers from "./PendingOffers.svelte";
  import { likedItemsStore } from "../../stores/likedItemsStore";
  import { get } from "svelte/store";

  let activeTab = "pending";
  let likedItems = [];
  let carbonSavings = 0;
  let totalCarbonFootprint = 0;
  let level = "Beginner";

  const carbonThresholds = {
    Beginner: 10,
    Intermediate: 30,
    Advanced: 50,
    Expert: 100,
  };

  // Subscribe to likedItemsStore for reactivity
  $: likedItems = get(likedItemsStore);

  // Calculate carbon footprint
  function calculateCarbonFootprint() {
    const totalDistance = likedItems.reduce((acc, item) => acc + (item.distance || 0), 0);
    const emissionFactor = 0.25;
    totalCarbonFootprint = totalDistance * emissionFactor;

    const baselineEmissions = totalDistance * 0.5;
    const savings = baselineEmissions - totalCarbonFootprint;

    carbonSavings = baselineEmissions > 0 ? Math.round((savings / baselineEmissions) * 100) : 0;

    if (carbonSavings >= carbonThresholds.Expert) {
      level = "Expert";
    } else if (carbonSavings >= carbonThresholds.Advanced) {
      level = "Advanced";
    } else if (carbonSavings >= carbonThresholds.Intermediate) {
      level = "Intermediate";
    } else {
      level = "Beginner";
    }
  }

  $: calculateCarbonFootprint();
</script>

<div class="profile-container">
  <div class="tabs">
    <button class:active={activeTab === "pending"} on:click={() => (activeTab = "pending")}>
      Liked Items
    </button>
    <button class:active={activeTab === "carbon-footprint"} on:click={() => (activeTab = "carbon-footprint")}>
      Carbon Footprint
    </button>
  </div>

  {#if activeTab === "pending"}
    <PendingOffers />
  {:else if activeTab === "carbon-footprint"}
    <div class="carbon-footprint-section">
      <h3>Your Carbon Footprint</h3>
      <div class="footprint-stats">
        <p>Total Carbon Footprint: <strong>{totalCarbonFootprint.toFixed(2)} kg CO2</strong></p>
        <p>Carbon Savings: <strong>{carbonSavings || 0}%</strong></p>
        <div class="progress-bar">
          <div class="progress" style="width: {Math.min(carbonSavings, 100)}%"></div>
        </div>
        <p>Your Level: <strong>{level}</strong></p>
      </div>
    </div>
  {/if}
</div>

<style>
.profile-container {
  padding: 1.5rem;
  font-family: 'Arial', sans-serif;
}

.tabs {
  display: flex;
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
