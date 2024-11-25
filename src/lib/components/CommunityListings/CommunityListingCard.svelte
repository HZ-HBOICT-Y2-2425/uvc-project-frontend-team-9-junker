<script>
    // @ts-nocheck    
    import { goto } from "$app/navigation";
    import { Item } from "$lib/models/Item";

    export let item = new Item("0", "0", "noname", "", "default.png", "", false, 0, 0);

    const navigate = () => {
        goto(`/item_details/${item.id}_${item.name}`);
    };
</script>

<button
class="relative bg-background sm:w-[30vh] dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-square"
on:click={() => navigate()}
>
    <!-- Image Section -->
    <div class="h-full relative">
    <img src={item.picture} alt={item.name} class="w-full h-full object-cover" />

    <!-- Uniform Text Overlay -->
    <div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]">
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
    </div>
    </div>
</button>
    