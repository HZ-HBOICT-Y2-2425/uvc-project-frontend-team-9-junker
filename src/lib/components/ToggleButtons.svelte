<script>
// @ts-nocheck
    import { toggleState } from "$lib/stores/AllPurposeStore";

    function toggle(name) {
        $toggleState = name;
    }
</script>

<div class="flex justify-center items-center  absolute">
  <button
    class="m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-primary-500 dark:active:bg-primary-dark-500 hover:bg-primary-500 dark:hover:bg-primary-dark-500 active:text-text dark:text-text-dark hover:text-text dark:text-text-dark"
    on:click={() => toggle("search")}
    class:active={$toggleState === "search"}
    aria-label="Search">
    <i class="fa-solid fa-magnifying-glass text-4xl"></i>
  </button>
  <button
    class="m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-primary-500 dark:active:bg-primary-dark-500 hover:bg-primary-500 dark:hover:bg-primary-dark-500 active:text-text dark:text-text-dark hover:text-text dark:text-text-dark"
    on:click={() => toggle("comms")}
    class:is-active={$toggleState === "comms"}
    aria-label="Communities">
    <i class="fa-solid fa-users text-4xl"></i>
  </button>
  <button
    class="m-2 w-16 h-16 absolute bottom-[3rem] text-base border-0 rounded-full cursor-pointer text-white bg-accent-500 dark:bg-accent-dark-500"
    aria-label="Add">
    <i class="fa-solid fa-plus text-4xl"></i>
  </button>
  <!-- spacer div  -->
  <div class="w-16 h-16"></div>
  <button
    class="m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-primary-500 dark:active:bg-primary-dark-500 hover:bg-primary-500 dark:hover:bg-primary-dark-500 active:text-text dark:text-text-dark hover:text-text dark:text-text-dark"
    on:click={() => toggle("chats")}
    class:is-active={$toggleState === "chats"}
    aria-label="Chats">
    <i class="fa-solid fa-comment text-4xl"></i>
  </button>
  <button
    class="m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-primary-500 dark:active:bg-primary-dark-500 hover:bg-primary-500 dark:hover:bg-primary-dark-500 active:text-text dark:text-text-dark hover:text-text dark:text-text-dark"
    on:click={() => toggle("items")}
    class:is-active={$toggleState === "items"}
    aria-label="Items">
    <i class="fa-solid fa-shop text-4xl"></i>
  </button>
</div>


<style>
</style>