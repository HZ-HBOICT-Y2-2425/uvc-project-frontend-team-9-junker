<script>
	import '../app.css';
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
<div class="main-wrapper">
	<header>
		<Header />
	</header>
	<main>
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
	<footer class="">
		<Footer />
	</footer>
</div>
{:else}
	<LoadingScreen />
{/if}

<style>
	.main-wrapper {
		background-color: var(--background-color);
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
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
