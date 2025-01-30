<script>
    import { fade, slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { toggleState } from "$lib/stores/AllPurposeStore";
    import { page } from '$app/stores';

    export let show = true;
    let showTitle = false;
    let showLogo = true;

    onMount(() => {
        const path = $page.url.pathname;
        if (path !== '/') {
            showLogo = false;
            showTitle = true; // Directly show the title if not on the base route
        } else {
            setTimeout(() => {
                show = false;
                setTimeout(() => {
                    showTitle = true;
                }, 500); // Delay to ensure fade-out completes
            }, 3000); // Show for 3 seconds
        }
    });

    $: title = {
        search: "Search",
        comms: "Communities",
        chats: "Chats",
        items: "Items",
        swipe : "Swipe"
    }[$toggleState] || "";

    $: {
        const path = $page.url.pathname;
        if (path === '/username') {
            title = "Profile";
        } else if (path === '/public_profile') {
            title = "Profile";
        } else if (path === '/notifications') {
            title = "Notifications";
        }
    }

    function goBack() {
        $toggleState = "swipe"; // Change to the desired state
    }
</script>

{#if showLogo}
  {#if show}
    <div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }} class="flex justify-center items-center h-full">
      <div class="text-primary-500 dark:text-primary-dark-500 font-kiranghaerang text-[10vh] mt-[-2.5vh] mb-[-2.5vh] mx-auto drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">Junker</div>
    </div>
  {/if}
{/if}
{#if showTitle}
  <div class="flex justify-center items-center h-full">
    <div class="flex items-center justify-center text-primary-500 dark:text-primary-dark-500 font-rem text-3xl mt-[-2.5vh] mb-[-2.5vh] mx-auto drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
      {#if $toggleState !== 'swipe' && $page.url.pathname === '/'}
        <button type="button" class="fas fa-chevron-left w-6 h-6 mr-2 cursor-pointer" on:click={goBack} aria-label="Go back" on:keydown={(e) => e.key === 'Enter' && goBack()}></button>
      {/if}
      <span class="flex items-center">{title}</span>
    </div>
  </div>
{/if}