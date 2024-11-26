<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ViewSearch from "$lib/components/ViewSearch.svelte";
    import ViewCommunities from "$lib/components/ViewCommunities.svelte";
    import ViewChats from "$lib/components/ViewChats.svelte";
    import ViewItems from "$lib/components/ViewItems.svelte";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import ViewSwipe from "$lib/components/ViewSwipe.svelte";
    import { toggleState, loadingState } from "$lib/stores/AllPurposeStore";
    import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
	
	// user authentication
	let userData = null;
	const loadUserData = async () => {
		const fetchUserData = (await import("$lib/utils/authUtils")).default;
		userData = await fetchUserData();
	};
	loadUserData();

</script>

{#if $loadingState}
    <div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">
        <header>
            <Header />
        </header>
        <main class="z-10 flex flex-col items-center justify-center">
            {#if $toggleState === "search"}
                <ViewSearch />
            {/if}
            {#if $toggleState === "comms"}
                <ViewCommunities />
            {/if}
            {#if $toggleState === "chats"}
                <ViewChats />
            {/if}
            {#if $toggleState === "items"}
                <ViewItems />
            {/if}
            {#if $toggleState === "swipe"}
                <ViewSwipe />
            {/if}
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
{:else}
    <LoadingScreen />
{/if}

<style>
    header {
        z-index: 2;
        height: 10vh;
    }
    main {
        z-index: 1;
    }
    footer {
        z-index: 2;
        margin-top: auto;
        height: 10vh;
    }
</style>
