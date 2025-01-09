<script lang="ts">
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";
    import { goto } from '$app/navigation';
    import { intendedRoute } from "$lib/stores/AllPurposeStore";
    $intendedRoute = '/username';

    import fetchUserData from "$lib/utils/fetchUserWithAuth";

    // user authentication
    let userData: { $set?: any; $on?: any; } | null = null;

    const loadUserData = async () => {
        userData = await fetchUserData();
        console.log(userData);
        // goto('/username');
	};

	loadUserData();
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
