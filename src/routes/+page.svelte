<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
	import fetchUserData from '$lib/utils/fetchUserWithAuth';
	import { authStore } from "$lib/stores/authStore";
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let countdown = 3;
	let userData: { user: any; } | null = null;

	onMount(async () => {
		while (countdown > 0) {
			await tick();
			await new Promise(resolve => setTimeout(resolve, 1000));
			countdown--;
		}
		userData = await fetchUserData();
		if (userData) {
			let liked_items = await JSON.parse(userData.user.liked_items);
			let disliked_items = await JSON.parse(userData.user.disliked_items);
            authStore.update((store) => ({
                ...store,
                user: userData.user,
				liked_items: liked_items,
				disliked_items: disliked_items,
            }));
			// console.log($authStore);
			goto('/swipe');
        }
	});

	const redirectToJunker = async () => {
		userData = await fetchUserData();
		if (userData) {
			goto('/swipe');
		}
	};

</script>

<div class:dark={$darkModeEnabled} class="bg-background dark:bg-background-dark h-screen w-screen flex flex-col items-center justify-center text-text dark:text-text-dark">
	<!-- <h1 class="text-2xl text-center font-bold mb-4">You will be redirected to Junker in {countdown}...</h1>
	<button on:click={redirectToJunker} class="mt-4 px-4 py-2 bg-primary-500 dark:bg-primary-dark-500 text-white rounded-lg shadow-md hover:bg-primary-700 dark:hover:bg-primary-dark-700">
	Go to Junker
	</button> -->
	<LoadingScreen />
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

