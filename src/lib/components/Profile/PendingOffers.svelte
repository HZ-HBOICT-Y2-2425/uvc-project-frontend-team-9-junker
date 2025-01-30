<script>
  import { likedItemsStore } from '../../stores/likedItemsStore';
  import { get } from 'svelte/store';

  let likedItems = [];
  $: likedItems = get(likedItemsStore);
</script>

<div class="flex flex-col space-y-4 bg-background dark:bg-background-dark p-4 mx-2 md:mx-20">
  {#if likedItems.length === 0}
      <p class="text-gray-600 dark:text-gray-400">No liked items yet. Swipe right to add items!</p>
  {:else}
      {#each likedItems as item}
          <div class="flex items-center justify-between border-b-2 border-primary-500 pb-2">
              <div class="flex items-center space-x-2">
                  <img
                      src={item.image}
                      alt={item.title}
                      class="w-12 h-12 rounded-full object-cover"
                      on:error={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  />
                  <div>
                      <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{item.description}</p>
                  </div>
              </div>
          </div>
      {/each}
  {/if}
</div>
