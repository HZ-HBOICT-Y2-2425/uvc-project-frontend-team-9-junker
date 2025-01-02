<script lang="ts">
    import { onMount } from 'svelte';

    let cards: Array<any> = [];
    let activeCardIndex = 0;
    let initialX = 0;
    let initialY = 0;
    let loading = true;
    let showPopup = false;

    // Fetch cards from the backend
    async function fetchCards() {
        try {
            console.log("Fetching cards...");
            const response = await fetch('http://localhost:3010/api/aggregator/aggregated-items');
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            console.log("Fetched data:", data);

            cards = data.map((item) => ({
                id: item.id,
                title: item.name || 'Unknown Title',
                description: item.description || 'No Description Available',
                image: item.image || 'https://via.placeholder.com/400x400',
                userid: item.userid || 'Unknown',
                available: item.available ? 'Available' : 'Not Available',
            }));
            console.log("Mapped cards:", cards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            loading = false;
        }
    }

    // Handle swipe logic
    const handleSwipe = (direction: string) => {
        console.log(`Swiped ${direction}: Current Index: ${activeCardIndex}, Total Cards: ${cards.length}`);
        if (activeCardIndex < cards.length - 1) {
            activeCardIndex++;
        } else {
            showPopup = true;
        }
    };

    // Track swipe start position
    const onPointerDown = (event: PointerEvent) => {
        initialX = event.clientX;
        initialY = event.clientY;
    };

    const onPointerUp = (event: PointerEvent) => {
        const deltaX = event.clientX - initialX;
        const threshold = 100;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                handleSwipe('right');
            } else {
                handleSwipe('left');
            }
        }
    };

    onMount(() => {
        fetchCards();
    });

    const closePopup = () => {
        showPopup = false;
    };
</script>

<div class="card-swiper">
    {#if loading}
        <p>Loading cards...</p>
    {:else if activeCardIndex < cards.length}
        <div
            class="card-wrapper"
            on:pointerdown={onPointerDown}
            on:pointerup={onPointerUp}
            style="z-index: {cards.length - activeCardIndex}"
        >
            <div class="card">
                <img
                    class="card-image"
                    src={cards[activeCardIndex].image}
                    alt={cards[activeCardIndex].title}
                    on:error={() => (cards[activeCardIndex].image = 'https://via.placeholder.com/400x400')}
                />
                <div class="card-content">
                    <h2 class="card-title">{cards[activeCardIndex].title}</h2>
                    <p class="card-description">{cards[activeCardIndex].description}</p>
                    <div class="card-info">
                        <p class="card-userid">👤 User ID: {cards[activeCardIndex].userid}</p>
                        <p class="card-availability" class:available={cards[activeCardIndex].available === 'Available'} class:not-available={cards[activeCardIndex].available === 'Not Available'}>
                            {cards[activeCardIndex].available}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="no-more-cards">
            <h2>No More Cards</h2>
            <p>You've swiped through all the cards.</p>
        </div>
    {/if}
</div>

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
    background: #f3f4f6;
}

.card-wrapper {
    position: absolute;
    width: 90%;
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s ease, opacity 0.3s ease;
    background: white;
}

.card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card-image {
    width: 100%;
    height: 60%;
    object-fit: cover;
}

.card-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.card-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 16px;
}

.card-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    font-weight: bold;
}

.card-availability.available {
    color: green;
}

.card-availability.not-available {
    color: red;
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
