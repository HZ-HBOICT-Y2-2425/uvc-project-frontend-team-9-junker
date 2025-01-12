<script>
  import GoBackButton from "./GoBackButton.svelte";
  export let title = "Error: No title";
</script>

<div class="h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-secondary-500 dark:border-secondary-dark-500 shadow-md flex items-center justify-between px-4">
  <GoBackButton />
  <button on:click={() => window.history.back()} class="text-primary-500 dark:text-primary-dark-500 font-rem text-xl truncate">{title}</button>
  <!-- Spacer to maintain symmetry -->
  <div class="w-8"></div>
</div>