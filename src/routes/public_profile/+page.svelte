<script lang="ts">
    import JunkerLettering from "$lib/components/JunkerLettering.svelte";
    import { savedListingsUser } from "$lib/stores/AllPurposeStore";
    import { get } from 'svelte/store';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import ViewPublicprofile from "$lib/components/ViewPublicprofile.svelte";

    let userData: null = null;
    onMount(async () => {
        if (!browser) return null;

        // Use `get` to access the current value of the store
        const username = get(savedListingsUser);
        console.log(username);

        try {
            const response = await fetch(`http://localhost:3012/user/public/${username}`);
            const resJson = await response.json();
            userData = resJson.publicProfile;
            console.log(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    });
    
</script>

<main>
    <!-- this is the alternative to the Header.svelte component, which is used in the Userprofile-View and other compacted pages -->
    <div class="h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)] flex flex-nowrap justify-between items-center px-4">
        <button class="text-secondary-500 dark:text-secondary-dark-500 m-4" on:click={() => window.history.back()} aria-label="Go back">
          <i class="fa-solid fa-chevron-left text-4xl"></i>
        </button>
        <JunkerLettering />
      <!-- spacer div -->
      <div class="flex items-center space-x-4 w-14"></div>
    </div>

    {#if userData}
        <div>
            <ViewPublicprofile {userData}/>
        </div>
    {/if}
</main>

<style>
</style>
