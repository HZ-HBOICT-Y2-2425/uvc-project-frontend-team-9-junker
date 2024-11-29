<script lang="ts">
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";
    import JunkerLettering from "$lib/components/JunkerLettering.svelte";
    import { get } from 'svelte/store';
    import { authStore } from '$lib/stores/authStore';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    let userData: { $set?: any; $on?: any; } | null = null;

    const loadUserData = async () => {
		if (!browser) return null;

    // Use `get` to access the current value of the store
    const { token, username } = get(authStore);
        if (!token) {
            goto("/login");
            return null;
        }

        try {
            const response = await fetch(`http://localhost:3012/user/private/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 403) {
                goto("/login");
                return null;
            }

            userData = await response.json();
            // console.log(userData);
            goto('/username');
        } catch (error) {
            console.error("Error fetching user data:", error);
            goto("/login");
            return null;
        }
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
