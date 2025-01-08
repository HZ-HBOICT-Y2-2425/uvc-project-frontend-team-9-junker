<script lang="ts">
    import { onMount } from 'svelte';
    import { likedItemsStore } from '../stores/likedItemsStore';
    import ImageViewerSwipe from "$lib/CardSwiper/ImageViewerSwipe.svelte";
    import { getItem } from '$lib/stores/ItemStore';
    import { getPicturesByItemId } from '$lib/stores/PictureStore';
    import { getUserById } from '$lib/stores/UserStore';

    export let item;
    export let totalItems;
    let cards: Array<any> = [];
    let activeCardIndex = 0;
    let initialX = 0;
    let initialY = 0;
    let loading = false;

    let publicOwner;
    let pictures = "";

    // Add a card to likedItemsStore and save to the database
    const addToLikedItems = async (item) => {
        /*
        likedItemsStore.update((items) => {
            if (!items.some((item) => item.id === card.id)) {
                return [...items, card];
            }
            return items;
        });

        try {
            const response = await fetch('http://localhost:3013/api/liked-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: 'user123', itemId: card.id }), // Replace `user123` with the actual user ID
            });

            if (!response.ok) {
                throw new Error('Failed to save liked item to the database');
            }
        } catch (error) {
            console.error('Error saving liked item to the database:', error);
        }
        */
    };

    // Handle swipe logic
    const handleSwipe = (direction: string) => {
        console.log(totalItems)
        if (direction === 'right' && item) {
            addToLikedItems(item);
        }
        if (activeCardIndex < totalItems - 1) {
            activeCardIndex++;
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
            handleSwipe(deltaX > 0 ? 'right' : 'left');
        }
    };

    //onMount(fetchCards);
    onMount( async () => {
        pictures = await getPicturesByItemId(item.id);
        publicOwner = await getUserById(item.userid);
    });

</script>

<!-- HTML remains unchanged -->


<div class="card-swiper">
        <div
            class="card-wrapper"
            on:pointerdown={onPointerDown}
            on:pointerup={onPointerUp}
            style="z-index: {totalItems - activeCardIndex}"
        >
        <div class="card">
            <ImageViewerSwipe pictures={[pictures[0], ...pictures]}/>
            <div class="card-content">
                <h2 class="card-title">{item.name}</h2>
                <p class="card-description">{item.description}</p>
                <div class="card-info">
                    <!--p class="card-userid">👤 User ID: {item.userid}</p-->
                    <div class="owner">
                        <img src={publicOwner?.publicProfile?.profile_pic || ""} alt="owner-pfp" class="owner-pfp">
                        <div class="owner-name">
                            {publicOwner?.publicProfile?.username || ""}
                        </div>
                        <div class="card-availability ml-auto" class:text-primary-500={item.available == true} class:not-available={item.available == false}>
                            {item.available ? 'Available' : 'Not Available'}
                        </div>
                        {#if item.action == false}
                            <svg class="ml-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(0 0 0 / var(--tw-text-opacity, 1))">
                                <path d="M160-280v80h640v-80H160Zm0-440h88q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q30 0 55.5 15.5T460-826l20 26 20-26q18-24 44-39t56-15q50 0 85 35t35 85q0 11-1.5 21t-6.5 19h88q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720Zm0 320h640v-240H596l84 114-64 46-136-184-136 184-64-46 82-114H160v240Zm200-320q17 0 28.5-11.5T400-760q0-17-11.5-28.5T360-800q-17 0-28.5 11.5T320-760q0 17 11.5 28.5T360-720Zm240 0q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Z"/>
                            </svg>
                        {:else if item.action == true}
                        <svg class="ml-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(0 0 0 / var(--tw-text-opacity, 1))">
                            <path d="M475-146.67q4.67 0 10.33-2.33 5.67-2.33 9-5.67l334-334.66Q841-502 847.17-518.11q6.16-16.11 6.16-32.22 0-16.67-6.16-32.84-6.17-16.16-18.84-28.5L651.67-788.33q-12.34-12.67-28.5-18.84-16.17-6.16-32.84-6.16-16.11 0-32.22 6.16Q542-801 529.33-788.33l-15.66 15.66L592.33-693Q606-679 615-660.67q9 18.34 9 39.67 0 39.33-29.17 68.17Q565.67-524 526.33-524q-23.33 0-40.5-7.33-17.16-7.34-30.95-21.23L381-626 202-447q-4.33 4.33-6.17 9.18-1.83 4.86-1.83 10.4 0 11.09 7.67 18.92 7.66 7.83 18.77 7.83 5.56 0 10.56-2.66 5-2.67 8.33-6l137.34-137.34L423.33-500 287-363.33q-4.33 4.33-6.17 9.5-1.83 5.16-1.83 10.5 0 10.66 8 18.66t18.67 8q5.33 0 10.33-2.33t8.33-5.67l137.34-137L508.33-415 372-278.33q-3.67 3.33-5.83 8.89-2.17 5.55-2.17 11.11 0 10.66 8 18.66t18.67 8q5.33 0 9.83-1.83t8.83-6.17l137.34-137L593.33-330 456-192.67q-4.33 4.34-6.17 9.5Q448-178 448-173.33q0 12 7.5 19.33 7.5 7.33 19.5 7.33ZM474.71-80q-34.38 0-61.21-24.5t-31.83-60.91q-34-4.92-57-27.92t-28-57q-34-5-56.5-28.5t-27.5-56.5q-37.34-5-61.34-31t-24-62q0-18 6.99-35.54 6.98-17.53 20.01-30.8L381-721l117 117q6 6.33 13.56 9.83 7.55 3.5 15.11 3.5 11.66 0 21.33-9.5 9.67-9.5 9.67-21.27 0-5.23-2.84-11.56-2.83-6.33-9.16-12.33l-143-143q-12.34-12.67-28.5-18.84-16.17-6.16-32.84-6.16-16.11 0-32.22 6.16Q293-801 280.37-788.43L132-639.67q-12.33 12.34-18 26.67-5.67 14.33-7 31.33t5 33.5q6.33 16.5 16.33 30.17l-48 48q-19-22.33-30-52.17-11-29.83-10.33-60.5.67-29.33 12.33-56.5Q64-666.33 85-687.33L232.67-835q22.66-22.33 51.03-33.33 28.36-11 58.16-11 29.81 0 57.97 11 28.17 11 50.5 33.33L466-819.33 481.67-835q22.66-22.33 51.03-33.33 28.36-11 58.16-11 29.81 0 57.97 11 28.17 11 50.5 33.33L875-659.33q22.33 22.33 33.67 51.02Q920-579.62 920-549.98q0 29.65-11.33 57.81Q897.33-464 875-441.67L541-108q-13.33 13.33-30.52 20.67Q493.29-80 474.71-80Zm-98.38-550.67Z"/>
                        </svg>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.owner-pfp {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 3px;
    object-fit: cover;
    object-position: center right;
}

.owner {
    justify-content: space-between;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

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
