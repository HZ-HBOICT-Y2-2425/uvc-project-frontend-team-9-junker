<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import LikedItemCard from './LikedItemCard.svelte';
    import { getItem } from '$lib/stores/ItemStore';
    import { getPicturesByItemId } from '$lib/stores/PictureStore';
  
    export let likedItemsIdArray;
    console.log(likedItemsIdArray);

 </script>

{#if likedItemsIdArray.length}
    <div class="flex flex-col gap-4 w-full">
        <div class="w-full p-4">
            <div class="space-y-4">
                {#each likedItemsIdArray as itemId}
                    <LikedItemCard itemId={itemId} />
                {/each}
            </div>
        </div>
    </div>
{:else}
    <p>No liked items yet. Swipe right to like items!</p>
{/if}
  