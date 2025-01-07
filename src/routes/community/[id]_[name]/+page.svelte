<script>
    // @ts-nocheck
        import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
        import ViewCommunityItems from "$lib/components/ViewCommunityItems.svelte";
        import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
        import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
        import { Community } from "$lib/models/Community.js";
        import { page } from "$app/stores";
        import ViewCommunityListings from "$lib/components/ViewCommunityItems.svelte";
        import { onMount } from "svelte";
        
        export let data;
        let { items } = data;
        
        let communityId = $page.params.id;
        let communityName = $page.params.name;
        let communityData = '';
        console.log(communityId, communityName);

        onMount(async () => {
            try {
                const response = await fetch(`http://localhost:3011/${communityId}`);
                communityData = await response.json();
                console.log(communityData);
            } catch (error) {
                console.log(error);
            }
        });

        items = items.filter( (item) => 
            item.communities === communityId
        );
    
    
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
            
            items = items.sort(sort);
        }
    
        onMount(() => {
            if(sortParams) {
                sort(sortParams[0]);
            }
        });
    
    </script>
    
    
    <div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-col">
        <header class="flex-none">
            <SubHeaderV2 title={communityName}/>
        </header>

        <main class="flex-1 overflow-y-auto">
            <ViewCommunityItems/>
        </main>
    </div>
    
    <style>
        .fa-blank {
            visibility: hidden !important;
        }
    </style>