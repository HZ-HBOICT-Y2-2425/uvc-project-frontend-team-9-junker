<script>
// @ts-nocheck
    import { goto } from '$app/navigation';

    const navigate = (route) => {
        goto(route);
    };
</script>

<div class="flex justify-center items-center absolute text-center">
  <button
    class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/community")}
    aria-label="Communities">
    <i class="fa-solid fa-users text-3xl"></i>
  </button>
  <button
    class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/search")}
    aria-label="Search">
    <i class="fa-solid fa-magnifying-glass text-4xl"></i>
  </button>
  <button
    class="m-2 w-16 h-16 absolute bottom-[3rem] text-base border-0 rounded-full cursor-pointer text-background bg-primary-500 dark:bg-primary-dark-500 dark:text-background-dark hover:bg-primary-900 dark:hover:bg-primary-dark-900 dark:hover:text-text-dark hover:text-primary-500"
    aria-label="Add">
    <i class="fa-solid fa-plus text-4xl"></i>
  </button>
  <!-- spacer div  -->
  <div class="w-16 h-16"></div>
  <button
    class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/swipe")}
    aria-label="Swipe">
    <i class="fa-solid fa-rotate text-4xl"></i>
  </button>
  <button
    class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/chats")}
    aria-label="Chats">
    <i class="fa-solid fa-comment text-4xl"></i>
  </button>
</div>