<script lang="ts">
    import { onMount } from 'svelte';
    import Card from './Card.svelte';

    // Mock data for cards
    let cards = [
        {
            title: "Vintage Shoes",
            description: "Stylish and comfy vintage shoes in excellent condition.",
            image: "https://via.placeholder.com/300?text=Vintage+Shoes",
            owner: "Alice Johnson",
            group: "Fashion Enthusiasts",
        },
        {
            title: "Retro Jacket",
            description: "A retro jacket perfect for winter, lightly used.",
            image: "https://via.placeholder.com/300?text=Retro+Jacket",
            owner: "Bob Smith",
            group: "Vintage Collectors",
        },
    ];

    let cardElements = []; // Store references to card DOM elements
    let showPopup = false; // Controls the visibility of the popup

    // Reactive statement to trigger the popup when `cards` is empty
    $: if (cards.length === 0 && !showPopup) {
        showPopup = true;
        console.log("Popup triggered through $ reactive block!");
    }

    // Function to bind gestures to a card
    const bindGesture = (el, index) => {
        let initialX = 0;

        el.addEventListener("pointerdown", (event) => {
            initialX = event.clientX;
        });

        el.addEventListener("pointerup", (event) => {
            const deltaX = event.clientX - initialX;
            const threshold = 100; // Minimum swipe distance
            if (deltaX > threshold) {
                console.log("Swiped Right:", cards[index]);
                el.classList.add('swiped-right'); // Add swipe-right animation
                setTimeout(() => {
                    cards.splice(index, 1); // Remove card
                }, 300); // Wait for animation to complete
            } else if (deltaX < -threshold) {
                console.log("Swiped Left:", cards[index]);
                el.classList.add('swiped-left'); // Add swipe-left animation
                setTimeout(() => {
                    cards.splice(index, 1); // Remove card
                }, 300); // Wait for animation to complete
            } else {
                el.style.transform = ""; // Reset card if not swiped far enough
            }
            cardElements = [...cardElements]; // Trigger reactivity
        });
    };

    // Bind gestures to all cards after mounting
    onMount(() => {
        cardElements.forEach((el, index) => bindGesture(el, index));
    });

    const closePopup = () => {
        showPopup = false;
    };
</script>

<div class="card-swiper">
    {#each cards as card, index}
        <div
            class="card-wrapper"
            bind:this={cardElements[index]}
            style="z-index: {cards.length - index}"
        >
            <Card
                title={card.title}
                description={card.description}
                image={card.image}
                owner={card.owner}
                group={card.group}
            />
        </div>
    {/each}
</div>

{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>Oops!</h2>
            <p>There are no more listings to swipe.</p>
            <button on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
.card-swiper {
    position: relative;
    width: 100%;
    height: 100vh; /* Full screen height */
    display: flex;
    align-items: center; /* Vertically center */
    justify-content: center; /* Horizontally center */
    overflow: hidden;
    margin: 0; /* Reset margin */
}

.card-wrapper {
    position: absolute;
    width: 90%; /* Adjust the card width */
    max-width: 400px; /* Prevent card from being too wide */
    height: 75%; /* Adjust the card height */
    max-height: 600px; /* Prevent card from being too tall */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content inside the card */
    transition: transform 0.3s ease, opacity 0.3s ease;
    touch-action: none; /* Ensure proper touch gesture behavior */
}

.card-wrapper.swiped-right {
    transform: translateX(100%); /* Move the card to the right */
    opacity: 0; /* Fade out the card */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.card-wrapper.swiped-left {
    transform: translateX(-100%); /* Move the card to the left */
    opacity: 0; /* Fade out the card */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
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
    margin: 0 0 10px 0;
    font-size: 1.8rem;
}

.popup-content p {
    font-size: 1.2rem;
    color: gray;
    margin: 0 0 20px 0;
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
