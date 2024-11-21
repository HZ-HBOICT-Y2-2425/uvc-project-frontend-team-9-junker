<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ViewSearch from '$lib/components/ViewSearch.svelte';
	import ViewCommunities from '$lib/components/ViewCommunities.svelte';
	import ViewChats from '$lib/components/ViewChats.svelte';
	import ViewItems from '$lib/components/ViewItems.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
    import { toggleState, loadingState } from "$lib/stores/AllPurposeStore";
</script>

{#if $loadingState}
<div class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col flex-nowrap">
	<header class="z-20 h-[10vh]">
		<Header />
	</header>
	<main class="z-10">
			{#if $toggleState==="search"}
				<ViewSearch />
			{/if}
			{#if $toggleState==="comms"}
			
				<ViewCommunities />
			{/if}
			{#if $toggleState==="chats"}
				<ViewChats />
			{/if}
			{#if $toggleState==="items"}
				<ViewItems />
			{/if}
	</main>
	<footer class="z-20 mt-auto h-[10vh]">
		<Footer />
	</footer>
</div>
{:else}
	<LoadingScreen />
{/if}

<style>
</style>
