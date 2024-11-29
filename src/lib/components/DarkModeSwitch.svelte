<script>
    import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
    import { writable } from 'svelte/store';

    let isDarkMode = $darkModeEnabled;

    function toggleDarkMode() {
        darkModeEnabled.set(!isDarkMode);
        isDarkMode = !isDarkMode;
    }
</script>

<button on:click={toggleDarkMode} class="w-16 h-16 p-2 bg-primary-200 dark:bg-primary-800 rounded-full flex items-center justify-center">
    {#if isDarkMode}
        <i class="fa-solid fa-sun text-background-dark"></i>
    {:else}
        <i class="fa-solid fa-moon text-background"></i>
    {/if}
</button>

<style>
</style>