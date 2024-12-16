<script>
    // @ts-nocheck    
    import { goto } from "$app/navigation";
    import { Item } from "$lib/models/Item";
    import { User } from "$lib/models/User";
    import { users } from "$lib/stores/AllPurposeStore";
    import { getPicturesByItemId } from "$lib/stores/PictureStore.js";
    import { onMount } from "svelte";

    const picturesPreload = import.meta.glob([
      '$lib/assets/pictures/**.jpg', 
      '$lib/assets/pictures/**.png', 
      '$lib/assets/pictures/**.svg', 
      '$lib/assets/pictures/**.webp', 
      '$lib/assets/pictures/**.avif'
    ], { eager: true, as: 'url' });

    let pictures = import.meta.glob(['$lib/assets/pictures/**.jpg', '$lib/assets/pictures/**.png', '$lib/assets/pictures/**.svg', '$lib/assets/pictures/**.webp', '$lib/assets/pictures/**.avif'], { eager: true, as: 'url' });

    export let item = ""; //new Item(0, 0, "noname", "", ["default.png"], "", false, 0, 0);

    let owner = users.find( (user) => user.id == item.userid) || new User(2, "Error: User not found", "blank-pfp.webp");
    // $: means this is called whenever item variable changes. This makes sure that the owner parameter updates after a sort.
    $: owner = users.find( (user) => user.id == item.userid) || new User(2, "Error: User not found", "blank-pfp.webp");

    const navigate = () => {
        let item2 = item;
        goto(`/item_details/${item2.id}_${item2.name}`);
    };

    onMount( async () => {
      pictures = await getPicturesByItemId(item.id);
      console.log(pictures[0]?.data);
    });
</script>

<button
class="relative bg-background sm:w-[30vh] dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-[3/4]"
on:click={() => navigate()}
>
    <!-- picture Section -->
    <div class="card-content">
        <!--TODO: strings over 100kb length are not converted to pictures-->
        <img src={pictures[0]?.data || picturesPreload[`/src/lib/assets/pictures/default.svg`]} alt={item.name} class="card-picture" />
        <div class="card-text">
            <div class="item-name">
                {item.name}
            </div>
            <!--div class="item-desc">
                {item.description}
            </div-->
            <div class="owner">
                <img src={picturesPreload[`/src/lib/assets/pictures/${owner.pfp}`]} alt={owner.pfp} class="owner-pfp">
                <div class="owner-name">
                    {owner.name}
                </div>
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
    .card-picture {
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
        /*
        margin-bottom: -5px;
        */
    }
    .item-desc {
        text-align: left;
        font-size: x-small;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .owner {
        display: flex;
        flex-flow: row nowrap;
    }
    .owner-pfp {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 3px;
        object-fit: cover;
        object-position: center right;
    }
    .owner-name {
        font-size: small;
    }
</style>
    