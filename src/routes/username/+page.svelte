<script lang="ts">
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";

    let userData: { $set?: any; $on?: any; } | null = null;

    const loadUserData = async () => {
		const fetchUserData = (await import("$lib/utils/authUtils")).default;
		userData = await fetchUserData();
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
