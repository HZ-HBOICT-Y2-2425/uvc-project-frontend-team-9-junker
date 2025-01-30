<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '../CardSwiper/Card.svelte';
    import { getAllItems } from '$lib/stores/ItemStore';
    import { likeItem, dislikeItem, delteLikes } from '$lib/stores/UserStore';
    import { goto } from '$app/navigation';
    import { authStore } from "$lib/stores/authStore";
    import { get } from 'svelte/store';

    let user = {
        id: undefined,
        liked_items: [undefined],
        disliked_items: [undefined],
    }

    authStore.subscribe( async (authStore) => {
        authStore.user ? user = authStore.user : null;
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
            items = await getAllItems();
            console.log(items);
            console.log("Fetched items:", items);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            loading = false;
        }
    }

    async function reset() {
        const thisPage = window.location.pathname;
        if(user?.id) {
            await delteLikes(user?.id);
        }
        user.liked_items = [];
        user.disliked_items = [];
        authStore.update((store) => ({
            ...store,
            user: user,
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
        console.log(user)
        user.liked_items.push(items[index].id);
        user.disliked_items = user.disliked_items.filter((id) => id != items[index].id)
        authStore.update((store) => ({
            ...store,
            user: user,
        }));
        console.log(user.liked_items)
        if(user?.id) {
            let message = await likeItem(user?.id, items[index].id).then( () => {
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
        console.log(user)
        user.disliked_items.push(items[index].id);
        user.liked_items = user.liked_items.filter((id) => id != items[index].id)
        authStore.update((store) => ({
            ...store,
            user: user,
        }));
        console.log(user.disliked_items)
        if(user?.id) {
            let message = await dislikeItem(user?.id, items[index].id).then( () => {
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
        {#if !(user.liked_items.includes(item.id) || user.disliked_items.includes(item.id))}
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
