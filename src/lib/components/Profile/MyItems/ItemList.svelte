<script>
  import ItemCard from './ItemCard.svelte';

  export let items;
  console.log(items);
</script>

<div class="w-full p-4 mx-2">
  <div class="mt-4 space-y-4">
    {#each items as item}
      <ItemCard {item} />
    {/each}
  </div>
</div>
