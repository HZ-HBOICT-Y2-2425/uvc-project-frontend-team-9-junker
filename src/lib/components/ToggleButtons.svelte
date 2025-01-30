<script>
  // @ts-nocheck
  import { goto } from '$app/navigation';

  const navigate = (route) => {
    goto(route);
  };
</script>

<div class="fixed bottom-0 left-0 w-full bg-background dark:bg-background-dark flex justify-between items-center px-4 sm:px-6 z-50"> <!-- Navigation bar -->
  <!-- Community button -->
  <button
    class="flex flex-col justify-center items-center w-[20%] p-2.5 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:text-background active:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/community")}
    aria-label="Communities">
    <i class="fa-solid fa-users text-lg sm:text-2xl"></i> 
    <div class="text-[0.65rem] sm:text-sm mt-0.5 leading-tight">Community</div>
  </button>

  <!-- Search button -->
  <button
    class="flex flex-col justify-center items-center w-[20%] p-2.5 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:text-background active:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/search")}
    aria-label="Search">
    <i class="fa-solid fa-magnifying-glass text-lg sm:text-2xl"></i>
    <div class="text-[0.65rem] sm:text-sm mt-0.5 leading-tight">Search</div>
  </button>

  <!-- + button (fixed in the center) -->
  <button
    class="absolute bottom-[3rem] left-1/2 transform -translate-x-1/2 w-16 h-16 flex justify-center items-center rounded-full cursor-pointer text-background bg-primary-500 dark:bg-primary-dark-500 hover:bg-primary-600 dark:hover:bg-primary-dark-600 z-10"
    on:click={() => navigate("/new-listing")}
    aria-label="Add">
    <i class="fa-solid fa-plus text-2xl"></i>
  </button>

  <!-- Swipe button -->
  <button
    class="flex flex-col justify-center items-center w-[20%] p-2.5 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:text-background active:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/swipe")}
    aria-label="Swipe">
    <i class="fa-solid fa-rotate text-lg sm:text-2xl"></i>
    <div class="text-[0.65rem] sm:text-sm mt-0.5 leading-tight">Swipe</div>
  </button>

  <!-- Chat button -->
  <button
    class="flex flex-col justify-center items-center w-[20%] p-2.5 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:text-background active:text-background dark:hover:text-text-dark"
    on:click={() => navigate("/chats")}
    aria-label="Chats">
    <i class="fa-solid fa-comment text-lg sm:text-2xl"></i>
    <div class="text-[0.65rem] sm:text-sm mt-0.5 leading-tight">Chat</div>
  </button>
</div>

<style>
  /* Media queries for further customization */
  @media (max-width: 640px) {
    /* Smaller screens */
    div > button i {
      font-size: 1.5rem; /* Adjust icons size */
    }
    div > button div {
      font-size: 0.65rem; /* Adjust text size */
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    /* Tablets */
    div > button i {
      font-size: 1.75rem;
    }
    div > button div {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1025px) {
    /* Desktops */
    div > button i {
      font-size: 2rem;
    }
    div > button div {
      font-size: 0.9rem;
    }
  }
</style>
