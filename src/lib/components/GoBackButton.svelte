<script>
  export let onClick = () => window.history.back(); // Default action is going back in history.
</script>

<button
  on:click={onClick}
  aria-label="Go back"
  class="text-secondary-500 dark:text-secondary-dark-500 flex items-center justify-center p-2"
>
  <i class="fa-solid fa-chevron-left text-3xl"></i>
</button>