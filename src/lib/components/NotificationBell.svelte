<script>
    import { goto } from "$app/navigation";
</script>

<button class="text-accent-500 dark:text-accent-dark-500 m-4" on:click={() => goto("/notifications")} aria-label="Notifications">
  <i class="fa-regular fa-bell text-4xl"></i>
</button>

<style>
</style>