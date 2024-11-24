<script>
  import ItemCard from './ItemCard.svelte';

  export let items = /** @type {Array<any>} */ ([]);
</script>

<div class="w-full">
  <div class="mt-4 space-y-4">
    {#each items as item}
      <ItemCard {item} />
    {/each}
  </div>
</div>
