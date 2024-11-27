<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let title: string;
    export let description: string;
    export let image: string;
    export let owner: string;
    export let group: string;

    const dispatch = createEventDispatcher();

    // For the "Read More" overlay
    let showOverlay = false;

    // For the instructions popup
    let showInstructions = true;

    // Mock data for additional product details
    const detailedInfo = `
        This product is a one-of-a-kind item, carefully curated to bring a vintage aesthetic 
        to your collection. It has been preserved in excellent condition and comes from a 
        smoke-free and pet-free environment. Ideal for collectors or those looking for 
        a stylish and timeless addition to their wardrobe.
    `;

    const openOverlay = () => {
        showOverlay = true;
    };

    const closeOverlay = () => {
        showOverlay = false;
    };

    const closeInstructions = () => {
        showInstructions = false;
    };
</script>

<!-- Instructions Overlay -->
{#if showInstructions}
<div class="instruction-overlay" on:click={closeInstructions}>
    <div class="instruction-card">
        <h2>Start Swiping!</h2>
        <p>Swipe <strong>right</strong> to like and notify the owner. Swipe <strong>left</strong> to skip.</p>
        <div class="swipe-icons">
            <span class="icon">❌</span>
            <span class="gesture-icon">↔️</span>
            <span class="icon">❤️</span>
        </div>
        <p class="tap-instruction">(Tap anywhere to continue)</p>
    </div>
</div>
{/if}

<!-- Main Card Component -->
<div class="card">
    <!-- Image Section -->
    <img src={image} alt={title} class="card-image" on:error="{() => image = 'fallback.jpg'}" />

    <!-- Content Section -->
    <div class="card-content">
        <h3 class="card-title">{title}</h3>

        <!-- Description with "Read More" -->
        <div class="description-container">
            <p class="card-description">{description}</p>
            <button class="read-more-button" on:click={openOverlay} aria-label="Read More">Read More</button>
        </div>

        <!-- Owner and Group Information -->
        <div class="info-section">
            <div class="info owner-info">
                <span class="icon">👤</span>
                <span class="text">{owner}</span>
                <span class="owner-text">Tristan</span>
            </div>

            <div class="info group-info">
                <span class="icon">👥</span>
                <span class="text">{group}</span>
                <span class="group-text">Middelburg</span>
            </div>
        </div>
    </div>

    <!-- "Read More" Overlay -->
    {#if showOverlay}
    <div class="overlay">
        <div class="overlay-content-wrapper">
            <!-- Close Button (X) -->
            <button class="close-overlay" on:click={closeOverlay} aria-label="Close Overlay">&times;</button>
            
            <div class="overlay-content">
                <h2>{title}</h2>
                <img src={image} alt={title} class="overlay-image" on:error="{() => image = 'fallback.jpg'}" />
                <p>{detailedInfo}</p>
            </div>
        </div>
    </div>
    {/if}
</div>

<style>
:root {
    --primary-color: #007BFF;
    --hover-color: #0056b3;
    --error-color: #f44336;
    --error-hover: #d32f2f;
}

/* Instructions Overlay */
.instruction-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
}

.instruction-card {
    background: white;
    padding: 20px 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    color: #333;
    max-width: 90%;
    width: 300px;
}

.instruction-card h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #4CAF50;
}

.instruction-card p {
    margin: 10px 0;
    font-size: 1rem;
    line-height: 1.5;
}

.swipe-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 15px 0;
}

.swipe-icons .icon {
    font-size: 2rem;
    color: #f44336; /* Red for dislike */
}

.swipe-icons .gesture-icon {
    font-size: 2.5rem;
    color: #555; /* Neutral color for swipe gesture */
}

.swipe-icons .icon:nth-child(3) {
    color: #4CAF50; /* Green for like */
}

.tap-instruction {
    font-size: 0.9rem;
    color: #777;
    margin-top: 10px;
    font-style: italic;
}

/* Card Styles */
.card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}

.card-image {
    width: 100%;
    height: 60%;
    object-fit: cover;
}

.card-content {
    padding: 16px;
    background: rgba(255, 255, 255, 0.9);
    color: black;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #e0e0e0;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.description-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.card-description {
    font-size: 1rem;
    color: gray;
    margin: 0;
    font-style: italic;
}

.read-more-button {
    padding: 0;
    background: none;
    border: none;
    color: var(--primary-color);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
}

.read-more-button:hover {
    color: var(--hover-color);
    text-decoration: none;
}

/* Info Section */
.info-section {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    align-items: center;
}

.info {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #e0f2f1;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #00695c;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
    font-size: 1.2rem;
}

/* Overlay Styling */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
}

.overlay-content-wrapper {
    position: relative;
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
}

.close-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: var(--error-color);
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: bold;
}

.close-overlay:hover {
    color: var(--error-hover);
}

.overlay-content-wrapper h2 {
    margin: 20px 0 10px;
    font-size: 1.5rem;
    word-wrap: break-word;
}

.overlay-content-wrapper img {
    max-width: 100%;
    margin: 10px 0;
    border-radius: 10px;
}

.overlay-content-wrapper p {
    margin: 10px 0;
    font-size: 1rem;
    color: gray;
    line-height: 1.4;
}
</style>
