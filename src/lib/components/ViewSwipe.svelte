<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '../CardSwiper/Card.svelte';
    import { getAllItems } from '$lib/stores/ItemStore';
    import { likeItem, dislikeItem, delteLikes } from '$lib/stores/UserStore';
    import { goto } from '$app/navigation';
    import { authStore } from "$lib/stores/authStore";

    let auth = {
        username: 'null',
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        user: [],
        liked_items: [undefined],
        disliked_items: [undefined],
    };

    authStore.subscribe( (authStore) => {
        auth = authStore;
    });

    let cards = []; // Cards array
    let items = [];
    let cardElements = []; // Store card elements for gesture handling
    let feedback = ''; // Feedback indicator for swipes
    let loading = true; // Loading state
    let showPopup = false; // Controls the popup visibility

    // Fetch cards
    async function fetchCards() {
        try {
            console.log("Fetching listings...");
            /*
            const response = await fetch('http://localhost:3010/api/aggregator/aggregated-items');
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            */
            items = await getAllItems();
            console.log(items);
            /*
            cards = data.map((item) => ({
                id: item.id,
                title: item.name || 'Unknown Title',
                description: item.description || 'No Description Available',
                image: item.image || 'default-image.jpg',
                userid: item.userid || 'Unknown',
                available: item.available ? 'Available' : 'Not Available',
            }));
            */
            console.log("Fetched items:", items);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            loading = false;
        }
    }

    async function reset() {
        const thisPage = window.location.pathname;
        if(auth?.user?.id) {
            await delteLikes(auth?.user?.id);
        }
        authStore.update((store) => ({
            ...store,
            liked_items: [],
            disliked_items: [],
        }));
        goto('/search');
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

    const swipeRight = async (index, el) => {
        feedback = 'heart';
        el.style.transform = `translate(100vw, 0) rotate(30deg)`; // Smooth swipe to the right
        console.log(`Swiped Right on Card ${index}`);
        console.log(auth)
        auth.liked_items.push(items[index].id);
        let liked_items = auth.liked_items;
        authStore.update((store) => ({
            ...store,
            liked_items: liked_items,
        }));
        console.log(auth.liked_items)
        if(auth?.user?.id) {
            let message = await likeItem(auth?.user?.id, items[index].id).then( () => {
                removeCard(index, el);
            })
        } else {
            removeCard(index, el);
        }
    };

    const swipeLeft = async (index, el) => {
        feedback = 'x';
        el.style.transform = `translate(-100vw, 0) rotate(-30deg)`; // Smooth swipe to the left
        console.log(`Swiped Left on Card ${index}`);
        console.log(auth)
        auth.disliked_items.push(items[index].id);
        let disliked_items = auth.disliked_items;
        authStore.update((store) => ({
            ...store,
            disliked_items: disliked_items,
        }));
        console.log(auth.disliked_items)
        if(auth?.user?.id) {
            let message = await dislikeItem(auth?.user?.id, items[index].id).then( () => {
                removeCard(index, el);
            })
        } else {
            removeCard(index, el);
        }
    };

    const removeCard = (index, el) => {
        setTimeout(() => {
            feedback = '';
            //items.splice(index, 1);
        }, 300);
        el.style.visibility = `hidden`;
        /*
        if (items.length == index+1) {
            showPopup = true;
        }
        */
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

    {#each items as item, index}
        {#if !(auth.liked_items.includes(item.id) || auth.disliked_items.includes(item.id))}
            <div
                class="card-wrapper"
                bind:this={cardElements[index]}
                style="z-index: {items.length - index};"
            >
                <Card item={item} totalItems={items.length}
                />
            </div>
        {/if}
    {/each}
    <div
        class="card-wrapper"
        style="z-index: -1;"
    >
        <div class="no-more-cards">
            <h2>No More Cards</h2>
            <p>You've swiped through all available listings.</p>
            <button class="m-6 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600" on:click={reset}>❌ Reset ❤️</button>
        </div>
    </div>
</div>

{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>No More Cards</h2>
            <p>You've swiped through all available listings.</p>
            <button on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
.no-more-cards {
    text-align: center;
    padding: 20px;
}

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
    aspect-ratio: 9 / 16;
    height: 78vh;
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
