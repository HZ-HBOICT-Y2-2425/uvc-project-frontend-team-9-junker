<script>
  import ToggleButtons from "./ToggleButtons.svelte";
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';

  let showFooter = true;

  $: {
    const path = $page.url.pathname;
    showFooter = !(path === '/username' || path === '/notifications');
  }
</script>

<div class="fixed bottom-0 z-20 h-[10vh] left-0 w-full bg-background dark:bg-background-dark border-t-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_-4vh_16vh_rgba(0,0,0,0.1)] flex flex-nowrap justify-center" class:hidden={!showFooter}>
  <ToggleButtons />
</div>

<style>
</style>