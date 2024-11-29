<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { darkModeEnabled } from "$lib/stores/AllPurposeStore";

	let countdown = 1;

	// user authentication
	let userData = null;
	const loadUserData = async () => {
		const fetchUserData = (await import("$lib/utils/authUtils")).default;
		userData = await fetchUserData();
	}

	onMount(async () => {
		while (countdown > 0) {
		await tick();
		await new Promise(resolve => setTimeout(resolve, 1000));
		countdown--;
		}
		loadUserData();
		goto('/swipe');
	});

	const redirectToJunker = () => {
		goto('/swipe');
	};

</script>

<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col items-center justify-center text-text dark:text-text-dark">
  <h1 class="text-2xl text-center font-bold mb-4">You will be redirected to Junker in {countdown}...</h1>
  <button on:click={redirectToJunker} class="mt-4 px-4 py-2 bg-primary-500 dark:bg-primary-dark-500 text-white rounded-lg shadow-md hover:bg-primary-700 dark:hover:bg-primary-dark-700">
    Go to Junker
  </button>
</div>

<style>
	.bg-background {
		background-color: var(--background-color);
	}
	.dark\:bg-background-dark {
		background-color: var(--background-dark);
	}
	.text-text {
		color: var(--text-color);
	}
	.dark\:text-text-dark {
		color: var(--text-dark);
	}
</style>

