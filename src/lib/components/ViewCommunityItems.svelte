<script>
// @ts-nocheck

    import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
    import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
    import { Community } from "$lib/models/Community.js";
    import { page } from "$app/stores";
    import ViewCommunityListings from "$lib/components/ViewCommunityItems.svelte";
    import { onMount } from "svelte";
    import {getItemsByCommunityId, getAllItems} from "$lib/stores/ItemStore"
    import {getCommunity} from "$lib/stores/CommunityStore"
    import {Item} from "$lib/models/Item";
    
    let communityId = $page.params.id;
    let communityName = $page.params.name;
    let communityData = '';
    let items;

    onMount(async () => {
        communityData = await getCommunity(communityId);
        //items = await getItemsByCommunityId(communityId);
        items = await getAllItems();
        items = items.filter(item => JSON.parse(item.communities).includes(communityData.id));
    });

    let sortParams = ["name", "date", "interested"];
    let sortBy = {col: "name", ascending: false};

    $: sort = (column) => {
        
        if (sortBy.col == column) {
            sortBy.ascending = !sortBy.ascending
        } else {
            sortBy.col = column
            sortBy.ascending = true
        }
        
        // Modifier to sorting function for ascending or descending
        let sortModifier = (sortBy.ascending) ? 1 : -1;
        
        let sort = (a, b) => 
            (a[column] < b[column]) 
            ? -1 * sortModifier 
            : (a[column] > b[column]) 
            ? 1 * sortModifier 
            : 0;
        
        if(items) {
            items = items.sort(sort);
        }
    }

    onMount(() => {
        if(sortParams) {
            sort(sortParams[0]);
        }
    });
</script>

<div class="h-screen w-full overflow-scroll">
    <sort-bar class="w-full border-b-[1px] border-black border-solid flex flex-row flex-nowrap justify-evenly">
        {#each sortParams as param}
            <button class="ml-2 mr-2" on:click={() => sort(`${param}`)} aria-label="Sort by {param}">
                {param}
                {#if sortBy.col === `${param}`}
                    {#if sortBy.ascending == true}
                        <i class="mt-4 mb-4 mr-0 ml-1 text-secondary-500 dark:text-secondary-dark-500 fa-solid fa-sort-down"></i>
                    {:else if sortBy.ascending == false}
                        <i class="mt-4 mb-4 mr-0 ml-1 text-secondary-500 dark:text-secondary-dark-500 fa-solid fa-sort-up"></i>
                    {/if}
                {:else}
                    <i class="mt-4 mb-4 mr-0 ml-1 text-secondary-500 dark:text-secondary-dark-500 fa-solid fa-sort-up fa-blank"></i>
                {/if}
            </button>
        {/each}
    </sort-bar>
    <div class="text-text dark:text-text-dark flex-1">
        
        <div class="flex flex-col items-center p-4 space-y-8">
        
            <!-- Community Grid -->
            <!--TODO: Get rid of top margin-->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
                <!-- Community Cards -->
                {#each items as item}
                    {#key item}
                        <CommunityListingCard
                            item = {item}
                        />
                    {/key}
                {/each}
            </div>
        </div>
    </div>
    <div class="h-[40vh]">

    </div>
</div>

<style>
    .fa-blank {
        visibility: hidden !important;
    }
</style>