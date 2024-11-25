<script lang="ts">
    import { onMount } from 'svelte';
    import { DragGesture } from '@use-gesture/vanilla';
    import { savedListingsStore } from '../stores/savedStore'; // Import store
    import { goto } from '$app/navigation'; // For navigation
    import Card from '../CardSwiper/Card.svelte';
    import { get } from 'svelte/store'; // To access the store directly

    let cards = [
        {
            title: "Vintage Shoes",
            description: "Heavily Used",
            image: "https://via.placeholder.com/300",
        },
        {
            title: "Retro Jacket",
            description: "Lightly Used",
            image: "https://via.placeholder.com/300",
        },
    ];

    let cardElements = [];
    let feedback = ''; // "heart" for right, "x" for left
    let showPopup = false; // Controls the popup visibility
    let popupClosedManually = false; // Prevents re-triggering the popup

    $: if (cards.length === 0 && !showPopup && !popupClosedManually) {
        showPopup = true;
        console.log("Popup triggered due to empty cards!");
    }

    // Handle saving a card
    const handleSave = (savedCard) => {
        savedListingsStore.update((saved) => {
            // Ensure no duplicates in savedListingsStore
            if (!saved.find((item) => item.image === savedCard.image)) {
                return [...saved, savedCard];
            }
            return saved;
        });
        console.log("Card saved:", savedCard);
    };

    const navigateToSaved = () => {
        // Navigate to the profile page
        goto('/profile');
    };

    const bindGesture = (el, index) => {
        new DragGesture(el, (state) => {
            if (state.last) {
                const [x] = state.movement;
                const threshold = 100;

                if (x > threshold) {
                    swipeRight(index);
                } else if (x < -threshold) {
                    swipeLeft(index);
                } else {
                    resetCard(el);
                }
            } else {
                el.style.transform = `translate(${state.movement[0]}px, ${state.movement[1]}px) rotate(${state.movement[0] / 15}deg)`;
            }
        });
    };

    const swipeRight = (index) => {
        feedback = 'heart';
        removeCard(index);
    };

    const swipeLeft = (index) => {
        feedback = 'x';
        removeCard(index);
    };

    const removeCard = (index) => {
        setTimeout(() => {
            feedback = '';
            cards = cards.filter((_, i) => i !== index);
        }, 300);
    };

    const resetCard = (el) => {
        el.style.transition = 'transform 0.3s ease';
        el.style.transform = 'translate(0px, 0px) rotate(0deg)';
        setTimeout(() => (el.style.transition = ''), 300);
    };

    const closePopup = () => {
        showPopup = false;
        popupClosedManually = true;
    };

    onMount(() => {
        cardElements.forEach((el, index) => bindGesture(el, index));
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
            style="z-index: {cards.length - index}; opacity: {index === 0 ? 1 : 0}; visibility: {index === 0 ? 'visible' : 'hidden'};"
        >
            <!-- Ensure the Card component is self-closing and matches your props -->
            <Card
                title={card.title}
                description={card.description}
                image={card.image}
                isSaved={!!get(savedListingsStore).find((item) => item.image === card.image)}
                on:save={() => handleSave(card)}
            />
        </div>
    {/each} <!-- Properly closes the each block -->
</div>

{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>Oops!</h2>
            <p>There are no more listings to swipe.</p>
            <button on:click={navigateToSaved}>Go to Saved</button>
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
    width: 100%;
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    border-radius: 16px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4); /* Stronger and more dramatic shadow */
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
    animation: fade-out 0.3s ease-out;
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

.popup-content h2 {
    margin: 0 0 10px;
    font-size: 1.8rem;
}

.popup-content p {
    font-size: 1.2rem;
    color: gray;
    margin: 0 0 20px;
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

@media (max-width: 768px) {
    .popup-content {
        width: 95%;
        padding: 16px;
    }

    .popup-content h2 {
        font-size: 1.5rem;
    }

    .popup-content p {
        font-size: 1rem;
    }
}
</style>
