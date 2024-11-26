<script>
    import JunkerLettering from './JunkerLettering.svelte';

    export let title = "Error: No title";
</script>
<!-- this is the alternative to the Header.svelte component, which is used in the Userprofile-View and other compacted pages -->
<button on:click={() => window.history.back()} aria-label="Go back"
  class="h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)] flex flex-nowrap justify-between items-center "
  >
    <div class="text-secondary-500 dark:text-secondary-dark-500 m-4">
      <i class="fa-solid fa-chevron-left text-4xl"></i>
    </div>
    <div class="flex justify-center items-center h-full">
      <div class="flex items-center justify-center text-primary-500 dark:text-primary-dark-500 font-rem text-3xl mt-[-2.5vh] mb-[-2.5vh] mx-auto drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <span class="flex items-center overflow-ellipsis overflow-hidden whitespace-nowrap">{title}</span>
      </div>
    </div>
  <!-- spacer div -->
  <div class="flex items-center space-x-4 w-14"></div>
</button>


<style>
</style>