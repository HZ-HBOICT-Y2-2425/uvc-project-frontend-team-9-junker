<script lang="ts">
    import { onMount } from 'svelte';
    import Card from './Card.svelte';

    let cards = []; // Holds all fetched cards
    let activeCardIndex = 0; // Tracks the index of the active card
    let initialX = 0; // Tracks the initial X position for swipe
    let initialY = 0; // Tracks the initial Y position for swipe
    let showPopup = false; // Show a popup when no cards are left
    let loading = true; // Track loading state

    // Fetch cards from the backend
    async function fetchCards() {
        try {
            const response = await fetch('http://localhost:3010/api/aggregator/aggregated-items');
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            // Map response to the card structure
            cards = data.map((community) => ({
                title: community.name || 'Unknown Title',
                description: community.description || 'No Description Available',
                image: community.cover_pic || 'default-image.jpg',
                owner: `User ID: ${community.userid || 'Unknown'}`,
                group: community.location || 'Unknown Location',
            }));
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            loading = false;
        }
    }

    // Handle swipe action
    const handleSwipe = (direction: string) => {
        console.log(`Swiped ${direction}:`, cards[activeCardIndex]);

        if (activeCardIndex < cards.length - 1) {
            activeCardIndex = activeCardIndex + 1; // Move to the next card
        } else {
            showPopup = true; // Show popup when no more cards
        }
    };

    // Track swipe start position
    const onPointerDown = (event: PointerEvent) => {
        initialX = event.clientX;
        initialY = event.clientY;
    };

    // Detect swipe direction on pointer release
    const onPointerUp = (event: PointerEvent) => {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        const threshold = 50; // Minimum swipe distance to count

        // Check if swipe is horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                handleSwipe('right'); // Swiped right
            } else {
                handleSwipe('left'); // Swiped left
            }
        }
    };

    onMount(() => {
        fetchCards();
    });

    // Close popup
    const closePopup = () => {
        showPopup = false;
    };
</script>

<!-- Main Card Container -->
<div class="card-swiper">
    {#if loading}
        <p>Loading cards...</p>
    {:else if cards.length > 0 && activeCardIndex < cards.length}
        <div
            class="card-wrapper"
            on:pointerdown={onPointerDown}
            on:pointerup={onPointerUp}
            style="z-index: {cards.length - activeCardIndex}"
        >
            <Card
                title={cards[activeCardIndex].title}
                description={cards[activeCardIndex].description}
                image={cards[activeCardIndex].image}
                owner={cards[activeCardIndex].owner}
                group={cards[activeCardIndex].group}
            />
        </div>
    {:else}
        <div class="no-more-cards">
            <h2>No More Cards</h2>
            <p>You've swiped through all the cards.</p>
        </div>
    {/if}
</div>

<!-- Popup -->
{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>No More Cards</h2>
            <p>You've swiped through all the available cards.</p>
            <button on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
.card-swiper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.card-wrapper {
    position: absolute;
    width: 90%;
    max-width: 400px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    animation: fadeIn 0.3s ease;
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

.no-more-cards {
    text-align: center;
    padding: 20px;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    color: black;
}
</style>
