<script>
    import { darkModeEnabled, items } from "$lib/stores/AllPurposeStore";
    import CommunityListingCard from "./CommunityListings/CommunityListingCard.svelte";
</script>

<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">

  <div class="text-text dark:text-text-dark overflow-y-auto" style="max-height: 100vh;">
        
    <div class="flex flex-col items-center p-4 space-y-8">
    
        <!-- Community Grid -->
        <!--TODO: Get rid of top margin-->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
            <!-- Community Cards -->
            {#each items as item}
                <CommunityListingCard
                    item = {item}
                />
            {/each}
        </div>
    </div>
</div>
</div>
