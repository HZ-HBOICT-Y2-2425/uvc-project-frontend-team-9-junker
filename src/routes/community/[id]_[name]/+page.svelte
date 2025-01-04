<script>
    // @ts-nocheck
        import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
        import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
        import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
        import { Community } from "$lib/models/Community.js";
        import { page } from "$app/stores";
        import ViewCommunityListings from "$lib/components/ViewCommunityItems.svelte";
        import { onMount } from "svelte";
        import { goto } from "$app/navigation";
        import { authStore } from "$lib/stores/authStore.js";
        const user_id = $authStore.user.id;

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
            item.communities.some( (communityId) => communityId == communityId)
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

        // leave community
        let showLeavePopup = false;

        function confirmLeave() {
            showLeavePopup = true;
        }

        const leaveCommunity = async () => {
            showLeavePopup = false;
            try {
                const response = await fetch(`http://localhost:3011/leave/${communityId}`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id }),
                });

                const data = await response.json();
                if (response.ok) {
                    goto(`/community`);
                    console.log(data);
                } else {
                    console.error('Error fetching role:', data.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    
    </script>
    
    
    <div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">
        <header>
            <SubHeaderV2 title={communityName}/>
        </header>
    
        <!-- Divider with Community Name -->
        <!--div class="flex items-center w-full max-w-md">
            <hr class="border-2 rounded flex-grow border-secondary-500 dark:border-secondary-dark-500" />
                <span class="mx-4 text-text dark:text-text-dark font-medium">{communityName}</span>
            <hr class="border-2 rounded flex-grow border-secondary-500 dark:border-secondary-dark-500" />
        </div-->
    
        <!--TODO: Get rid of top margin-->
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

        <!-- leave button -->
        <div class="flex justify-between mt-4">
            <button
            class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
            on:click={confirmLeave}
            >
            Leave
            </button>
        </div>
        {#if showLeavePopup}
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
                <h2 class="text-lg font-bold">Are you sure?</h2>
                <p>Do you want to leave this community?</p>
                <div class="flex justify-around mt-4">
                <button
                    class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                    on:click={() => (showLeavePopup = false)}
                >
                    No
                </button>
                <button
                    class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    on:click={leaveCommunity}
                >
                    Yes
                </button>
                </div>
            </div>
            </div>
        {/if}

    </div>
    
    <style>
        .fa-blank {
            visibility: hidden !important;
        }
    </style>