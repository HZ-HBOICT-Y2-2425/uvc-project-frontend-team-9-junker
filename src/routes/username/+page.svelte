<script lang="ts">
    import ViewUserprofile from "$lib/components/ViewUserprofile.svelte";
    import { browser } from "$app/environment";

    let userData: null = null;

    const fetchUserData = async () => {
        if (!browser) return;

        const token = localStorage.getItem("token");
        const username = JSON.parse(localStorage.getItem("username") || '""');

        if (!token) {
            window.location.href = "/login"; // Redirect if not logged in
            return;
        }

        try {
        const response = await fetch(`http://localhost:3012/user/${username}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        userData = await response.json();
        // console.log(userData);
        } catch (error) {
        console.error("Error fetching user data:", error);
        }
    };

    fetchUserData();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    };
</script>

<main>
    {#if userData}
    <div>
        <h1>Profile</h1>
        <ViewUserprofile {userData}/>
    </div>
    <div class="mt-3">
        <button class=" py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" on:click={() => logout()}>
            Log out</button>
    </div>
    {/if}
    
</main>

<style>
</style>
