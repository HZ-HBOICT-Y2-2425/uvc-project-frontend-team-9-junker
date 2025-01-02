<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '../CardSwiper/Card.svelte';

    let cards = []; // Cards array
    let cardElements = []; // Store card elements for gesture handling
    let feedback = ''; // Feedback indicator for swipes
    let loading = true; // Loading state
    let showPopup = false; // Controls the popup visibility

    // Fetch cards
    async function fetchCards() {
        try {
            console.log("Fetching cards...");
            const response = await fetch('http://localhost:3010/api/aggregator/aggregated-items');
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            cards = data.map((item) => ({
                id: item.id,
                title: item.name || 'Unknown Title',
                description: item.description || 'No Description Available',
                image: item.image || 'default-image.jpg',
                userid: item.userid || 'Unknown',
                available: item.available ? 'Available' : 'Not Available',
            }));
            console.log("Fetched and mapped cards:", cards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            loading = false;
        }
    }

    // Bind swipe gestures to a card element
    const bindGesture = (el, index) => {
        let initialX = 0;
        let initialY = 0;
        let hasSwiped = false;

        const handlePointerMove = (event) => {
            if (hasSwiped) return;

            const deltaX = event.clientX - initialX;
            const deltaY = event.clientY - initialY;
            el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX / 15}deg)`;
        };

        const handlePointerUp = (event) => {
            if (hasSwiped) return;

            const deltaX = event.clientX - initialX;
            const threshold = 120; // Minimum swipe distance for a modern effect

            el.style.transition = 'transform 0.3s ease-out';
            if (Math.abs(deltaX) > threshold) {
                hasSwiped = true;
                if (deltaX > 0) {
                    swipeRight(index, el);
                } else {
                    swipeLeft(index, el);
                }
            } else {
                el.style.transform = 'translate(0, 0) rotate(0deg)'; // Reset card position
            }

            el.removeEventListener('pointermove', handlePointerMove);
            el.removeEventListener('pointerup', handlePointerUp);
        };

        const handlePointerDown = (event) => {
            initialX = event.clientX;
            initialY = event.clientY;
            hasSwiped = false;

            el.addEventListener('pointermove', handlePointerMove);
            el.addEventListener('pointerup', handlePointerUp);
        };

        el.addEventListener('pointerdown', handlePointerDown);
    };

    const swipeRight = (index, el) => {
        feedback = 'heart';
        el.style.transform = `translate(100vw, 0) rotate(30deg)`; // Smooth swipe to the right
        console.log(`Swiped Right on Card ${index}`);
        removeCard(index);
    };

    const swipeLeft = (index, el) => {
        feedback = 'x';
        el.style.transform = `translate(-100vw, 0) rotate(-30deg)`; // Smooth swipe to the left
        console.log(`Swiped Left on Card ${index}`);
        removeCard(index);
    };

    const removeCard = (index) => {
        setTimeout(() => {
            feedback = '';
            cards = cards.filter((_, i) => i !== index);

            if (cards.length === 0) {
                showPopup = true;
            }
        }, 300);
    };

    const closePopup = () => {
        showPopup = false;
    };

    onMount(() => {
        fetchCards().then(() => {
            cardElements.forEach((el, index) => {
                if (el) {
                    bindGesture(el, index);
                }
            });
        });
    });
</script>

<div class="card-swiper">
    {#if feedback === 'heart'}
        <div class="feedback heart">❤️</div>
    {/if}
    {#if feedback === 'x'}
        <div class="feedback x">❌</div>
    {/if}

    {#each cards as card, index}
        <div
            class="card-wrapper"
            bind:this={cardElements[index]}
            style="z-index: {cards.length - index};"
        >
            <Card
                title={card.title}
                description={card.description}
                image={card.image}
                userid={card.userid}
                available={card.available}
            />
        </div>
    {/each}
</div>

{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>No More Cards</h2>
            <p>You've swiped through all the cards.</p>
            <button on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
.card-swiper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.card-wrapper {
    position: absolute;
    width: 90%;
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    border-radius: 16px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    touch-action: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.feedback {
    position: absolute;
    top: 20%;
    font-size: 5rem;
    font-weight: bold;
    opacity: 0.8;
    z-index: 10;
    pointer-events: none;
}

.feedback.heart {
    color: rgba(255, 0, 0, 0.8);
    right: 10%;
}

.feedback.x {
    color: rgba(0, 0, 0, 0.8);
    left: 10%;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
}

.popup-content button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.popup-content button:hover {
    background: #45a049;
}
</style>
