<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let show = true;
  let showLogo = true;

  onMount(() => {
    setTimeout(() => {
      show = false;
      setTimeout(() => {
        showLogo = false;
      }, 500); // Delay to ensure fade-out completes
    }, 3000); // Show for 3 seconds
  });
</script>

{#if showLogo}
  {#if show}
    <div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }} class="flex justify-center items-center h-full">
      <div class="text-primary-500 dark:text-primary-dark-500 font-kiranghaerang text-[10vh] mt-[-2.5vh] mb-[-2.5vh] mx-auto drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">Junker</div>
    </div>
  {/if}
{/if}