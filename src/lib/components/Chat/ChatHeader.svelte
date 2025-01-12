<script>
  import GoBackButton from "../GoBackButton.svelte";
  export let recipient;
</script>

<div class="fixed z-10 h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-secondary-500 dark:border-secondary-dark-500 shadow-md flex items-center justify-between px-4">
  <GoBackButton />
  <span class="font-rem text-xl text-primary-500 dark:text-primary-dark-500">Chat with {recipient}</span>
  <!-- Spacer to maintain symmetry -->
  <div class="w-8"></div>
</div>
<div class="h-[10vh]"></div>