<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { authStore } from "$lib/stores/authStore";
    import { likeItem, unlikeItem, dislikeItem, undislikeItem, delteLikes } from '$lib/stores/UserStore';

    export let item;
    let isLiked = false;
    let count = 0;
    let likeButton;
    let heart;

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
        auth.liked_items.includes(item.id) ? isLiked = true : isLiked = false;
        console.log(isLiked)
    });

    async function toggleHeart() {
        if(!isLiked && auth?.user?.id) {
            let message
            message = await likeItem(auth?.user?.id, item.id);
            await undislikeItem(auth?.user?.id, item.id);
            console.log(message)
            if(message === "Likes updated successfully") {
                auth.liked_items.push(item.id);
                auth.disliked_items = auth.disliked_items.filter((id) => String(id) === String(item.id));
                authStore.update((store) => ({
                    ...store,
                    liked_items: auth.liked_items,
                    disliked_items: auth.disliked_items,
                }));
                heart.classList.toggle("#D16D6A", isLiked);
                heart.classList.toggle("text-white", isLiked);

                heart.style.transform = isLiked ? "scale(1.2)" : "scale(1.2)";
                setTimeout(() => {
                    heart.style.transform = "scale(1)";
                }, 150);
            }
        }
        else if(isLiked && auth?.user?.id) {
            let message = "Likes updated successfully";
            message = await unlikeItem(auth?.user?.id, item.id);
            console.log(message)
            if(message === "Likes updated successfully" && auth.liked_items) {
                auth.liked_items = auth.liked_items.filter( (liked_item) => liked_item.id === item.id );
                authStore.update((store) => ({
                    ...store,
                    liked_items: auth.liked_items,
                }));
                heart.classList.toggle("#D16D6A", isLiked);
                heart.classList.toggle("text-white", isLiked);

                heart.style.transform = isLiked ? "scale(1.2)" : "scale(1.2)";
                setTimeout(() => {
                    heart.style.transform = "scale(1)";
                }, 150);
            }
        }
    }
</script>


<button bind:this={likeButton} class="m-2 relative focus:outline-none" on:click={toggleHeart}>
    <div bind:this={heart} class=" rounded-full  flex items-center justify-center transition-transform transform scale-100">
        {#if !isLiked}
            <svg xmlns="http://www.w3.org/2000/svg" width="3.75rem" height="3.75rem" viewBox="0 0 24 26" fill="#D16D6A" stroke="#D16D6A">
                <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/>
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="3.75rem" height="3.75rem" viewBox="0 0 24 26" fill="#D16D6A" stroke="#D16D6A">
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
            </svg>
        {/if}
    </div>
</button>
