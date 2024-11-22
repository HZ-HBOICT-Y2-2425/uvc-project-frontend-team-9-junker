<script>
    import { goto } from "$app/navigation";
</script>

<button class="text-accent-500 dark:text-accent-dark-500 m-4" on:click={() => goto("/username")} aria-label="Profile">
  <i class="fa-regular fa-user text-4xl"></i>

</button>

<style>

</style>