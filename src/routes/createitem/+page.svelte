<script>
// @ts-nocheck
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore";

    

</script>
<p>
    <button on:click|preventDefault={ () => getAllItems()}>
        get all items
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => getItem('8')}>
        get item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => storeItem(1, "new Item", "it's new", ["default.jpg"], true, true, 0, 0, [], [])}>
        createItem
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => updateItem(8, 1, "no new Item", "it's new", ["default.jpg"], true, true, 0, 0, [], [])}>
        update Item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => deleteItem(8, 1)}>
        delete Item
    </button>
</p>