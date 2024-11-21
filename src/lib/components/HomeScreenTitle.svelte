<script>
  import { toggleState } from "$lib/stores/AllPurposeStore";
</script>

<!-- 
if the toggleState is "comms" then the title bar should display "Communities"
if the toggleState is "search" then the title bar should display "Search"
if the toggleState is "chats" then the title bar should display "Chats"
if the toggleState is "items" then the title bar should display "Items"
this title will be centered at the top while the back cheveron will be on the inner left side
-->

<div class="flex justify-center items-center h-[10vh]">
  <div class="absolute left-0">
    <button class="m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark" aria-label="Back">
      <i class="fa-solid fa-chevron-left text-4xl"></i>
    </button>
  </div>
  {#if $toggleState==="comms"}
    <div class="text-text dark:text-text-dark text-2xl">
      Communities
    </div>
  {/if}
  {#if $toggleState==="search"}
    <div class="text-text dark:text-text-dark text-2xl">
      Search
    </div>
  {/if}
  {#if $toggleState==="chats"}
    <div class="text-text dark:text-text-dark text-2xl">
      Chats
    </div>
  {/if}
  {#if $toggleState==="items"}
    <div class="text-text dark:text-text-dark text-2xl">
      Items
    </div>
  {/if}
</div>