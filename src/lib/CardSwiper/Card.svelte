<script lang="ts">
    import { onMount } from 'svelte';

    let cards: Array<any> = []; // Holds all fetched cards
    let currentIndex = 0; // Index of the current card
    let loading = true; // Loading state
    let error = ''; // For fetch errors
    let initialX: number = 0; // Tracks swipe starting position

    // Fetch cards from the backend
    async function fetchCards() {
        try {
            console.log("Fetching cards...");
            const response = await fetch("http://localhost:3010/api/aggregator/aggregated-items");
            if (!response.ok) {
                throw new Error(`Failed to fetch cards: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);

            // Map data to cards array
            cards = data.map((item) => ({
                id: item.id,
                userid: item.userid || 'Unknown',
                name: item.name || 'Unknown Title',
                description: item.description || 'No Description Available',
                available: item.available ? 'Yes' : 'No',
                createdAt: item.created_at,
                updatedAt: item.updated_at,
                error: item.error || '',
            }));
            console.log("Mapped cards:", cards);
        } catch (e) {
            console.error("Error fetching cards:", e);
            error = e.message;
        } finally {
            loading = false;
        }
    }

    // Handles swipe logic
    function handleSwipe(direction: string) {
        console.log(`Swiped ${direction}:`, cards[currentIndex]);
        if (currentIndex < cards.length - 1) {
            currentIndex++; // Move to the next card
        } else {
            console.log("No more cards to swipe.");
        }
    }

    // Detect swipe gesture
    function onPointerDown(event: PointerEvent) {
        initialX = event.clientX; // Store starting X position
    }

    function onPointerUp(event: PointerEvent) {
        const deltaX = event.clientX - initialX; // Calculate swipe distance
        const threshold = 100; // Minimum distance to trigger swipe

        if (deltaX > threshold) {
            handleSwipe("right"); // Swiped right
        } else if (deltaX < -threshold) {
            handleSwipe("left"); // Swiped left
        }
    }

    // Fetch cards on mount
    onMount(() => {
        fetchCards();
    });

    // Reactive statement to ensure re-render on index change
    $: currentCard = cards[currentIndex];
</script>

<div class="card-container">
    {#if loading}
        <p class="loading">Loading cards...</p>
    {:else if cards.length === 0}
        <p class="no-cards">No cards available</p>
    {:else}
        <!-- Display current card -->
        {#if currentCard}
            <div
                class="card"
                on:pointerdown={onPointerDown}
                on:pointerup={onPointerUp}
            >
                <h3 class="card-title">{currentCard.name}</h3>
                <p class="card-description">{currentCard.description}</p>
                <p class="card-owner">User ID: {currentCard.userid}</p>
                <p class="card-availability">Available: {currentCard.available}</p>
                <p class="card-error">{currentCard.error}</p>
            </div>
        {/if}
    {/if}
</div>

<style>
/* General Styles */
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f8f9fa;
    padding: 16px;
    overflow: hidden;
    position: relative;
}

.loading, .no-cards {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

/* Card Styles */
.card {
    width: 90%;
    max-width: 400px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    animation: fadeIn 0.3s ease;
    cursor: pointer;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.card-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 8px;
}

.card-owner, .card-availability, .card-error {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 8px;
}
</style>
