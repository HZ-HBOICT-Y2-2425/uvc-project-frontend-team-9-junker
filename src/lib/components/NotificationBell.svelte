<script>
    import { goto } from "$app/navigation";
</script>

<button class="text-secondary-500 dark:text-secondary-dark-500 m-4" on:click={() => goto("/notifications")} aria-label="Notifications">
  <i class="fa-regular fa-bell text-4xl"></i>
</button>

<style>
</style>