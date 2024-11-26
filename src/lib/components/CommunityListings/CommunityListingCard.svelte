<script>
    // @ts-nocheck    
    import { goto } from "$app/navigation";
    import { Item } from "$lib/models/Item";

    const images = import.meta.glob(['$lib/assets/images/**.jpg', '$lib/assets/images/**.png', '$lib/assets/images/**.svg', '$lib/assets/images/**.webp', '$lib/assets/images/**.avif'], { eager: true, as: 'url' });

    export let item = new Item("0", "0", "noname", "", "default.png", "", false, 0, 0);

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
        <!--img src={item.picture} alt={item.name} class="w-full h-full object-cover" /-->
        <!--Method for importing images: https://stackoverflow.com/questions/77934659/how-can-i-dynamically-import-images-stored-in-lib-within-a-component-in-svelte -->
        <!--img src={images[`/src/lib/assets/images/${item.picture}`]} alt={item.name} class="w-full h-full object-cover" /-->
        <img src={images[`/src/lib/assets/images/${item.picture}`]} alt={item.name} class="card-image" />


        <!-- Uniform Text Overlay -->
        <!--div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]"-->
        <!--div class="absolute inset-x-0 bottom-0 bg-white bg-opacity-100 text-black p-4 h-[40px] md:h-[100px]">
            <h3 class="text-sm md:text-lg font-semibold text-center truncate">{item.name}</h3>
            <div class="mt-2 flex items-center justify-center space-x-4 text-xs md:text-sm">
            <div class="flex items-center space-x-1">
                <i class="fa-solid fa-eye text-white dark:text-text-dark"></i>
                <span>{item.views}</span>
            </div>
            <div class="flex items-center space-x-1">
                <i class="fa-solid fa-exclamation"></i>
                <span>{item.interested}</span>
            </div>
            </div>
        </div-->

        

        <div class="card-text">
            <div class="item-name">
                {item.name}
            </div>
            <div class="item-desc">
                {item.description}
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
        padding: 0px 3px;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .item-name {
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .item-desc {
        text-align: left;
        font-size: x-small;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
    