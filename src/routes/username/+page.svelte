<script lang="ts">
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";
    import fetchUserData from "$lib/utils/fetchUserWithAuth";
    import { onMount } from "svelte";

    // user authentication
    let userData: { $set?: any; $on?: any; } | null = null;

    onMount(async () => {
        userData = await fetchUserData();
        if(userData?.user?.liked_items && userData?.user?.disliked_items) {
            try {
                userData.user.liked_items = await JSON.parse(userData.user.liked_items);
                userData.user.disliked_items = await JSON.parse(userData.user.disliked_items);
            }
            catch (error) {
                userData.user.liked_items = [];
                userData.user.disliked_items = [];
                console.error("Error fetching user data:", error.message);
            }
        }
    });
</script>

<main>
    <div class="fixed top-0 left-0 w-full">
        <SubHeaderV2 title="Profile"/>
    </div>
    

    {#if userData}
        <div>
            <ViewUserprofile {userData}/>
        </div>
    {/if}
</main>

<style>
</style>
