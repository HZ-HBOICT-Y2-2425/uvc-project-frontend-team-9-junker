<script>
    // @ts-nocheck
        import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
        import ViewCommunityItems from "$lib/components/ViewCommunityItems.svelte";
        import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
        import { page } from "$app/stores";
        import ViewCommunityListings from "$lib/components/ViewCommunityItems.svelte";
                
        let communityName = $page.params.name;
    
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
    </style>