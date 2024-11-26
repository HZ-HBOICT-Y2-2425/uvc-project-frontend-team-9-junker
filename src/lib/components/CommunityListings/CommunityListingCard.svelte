<script>
    // @ts-nocheck    
    import { goto } from "$app/navigation";
    import { Item } from "$lib/models/Item";
    import { User } from "$lib/models/User";

    const images = import.meta.glob(['$lib/assets/images/**.jpg', '$lib/assets/images/**.png', '$lib/assets/images/**.svg', '$lib/assets/images/**.webp', '$lib/assets/images/**.avif'], { eager: true, as: 'url' });

    export let item = new Item(0, 0, "noname", "", "default.png", "", false, 0, 0);
    export let owner = new User(0, "unknown", "blank-pfp.webp");

    const navigate = () => {
        goto(`/item_details/${item.id}_${item.name}`);
    };
</script>

<button
class="relative bg-background sm:w-[30vh] dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-[3/4]"
on:click={() => navigate()}
>
    <!-- Image Section -->
    <div class="card-content">
        <!--Method for importing images: https://stackoverflow.com/questions/77934659/how-can-i-dynamically-import-images-stored-in-lib-within-a-component-in-svelte -->
        <img src={images[`/src/lib/assets/images/${item.picture}`]} alt={item.name} class="card-image" />

        <div class="card-text">
            <div class="item-name">
                {item.name}
            </div>
            <div class="item-desc">
                {item.description}
            </div>
            <img src={images[`/src/lib/assets/images/${owner.pfp}`]} alt={owner.pfp} class="pfp">
            <div class="item-name">
                {owner.name}
            </div>
        </div>
    </div>
</button>

<style>
    .card-content {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        width: 100%;
        background-color: white;
    }
    .card-image {
        flex-shrink: 0;
        object-fit:cover;
        overflow: hidden;
          flex-grow: 1;
        flex-shrink: 1;
    }
    .card-text {
        background-color: white;
        width: 100%;
        height: fit-content;
        flex-basis: content;
        display: flex;
        flex-flow: column nowrap;
        overflow: hidden;
        padding: 0px 3px 3px 3px;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .item-name {
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: -5px;
    }
    .item-desc {
        text-align: left;
        font-size: x-small;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .pfp {
        width: 50px;
        height: 50px;
        border-radius: 50%;

        object-fit: cover;
        object-position: center right;
    }
</style>
    