<script lang="ts">
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";
    import fetchUserData from "$lib/utils/fetchUserWithAuth";
    import { onMount } from "svelte";

    // user authentication
    let userData: { $set?: any; $on?: any; } | null = null;

    onMount(async () => {
        userData = await fetchUserData();
    });
</script>

<main>
    <SubHeaderV2 title="Profile" />

    {#if userData}
        <div>
            <ViewUserprofile {userData}/>
        </div>
    {/if}
</main>

<style>
</style>
