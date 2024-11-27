<script>
    // @ts-nocheck
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
    import { Item } from "$lib/models/Item.js";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ImageViewer from "$lib/components/ImageViewer.svelte";
    import { goto } from "$app/navigation";
    import { User } from "$lib/models/User.js";

    const images = import.meta.glob(['$lib/assets/images/**.jpg', '$lib/assets/images/**.png', '$lib/assets/images/**.svg', '$lib/assets/images/**.webp', '$lib/assets/images/**.avif'], { eager: true, as: 'url' });

    let itemId = $page.params.id;
    let itemName = $page.params.title;
    export let data;
    let { items } = data;
    let { users } = data;
    let item = items.find((item) => item.id == $page.params.id);
    let owner = users.find((user) => user.id == item.userid) || new User(0, "Error: User not found", "blank-pfp.webp");

</script>

<header>
    {#if item}
        <SubHeaderV2 title={item.name}/>
    {/if}
</header>

<!--img src={images[`/src/lib/assets/images/${item.picture[0]}`]} alt={item.name} class="" /-->
<div class="h-[40vh] mb-2">
    <ImageViewer images={item.pictures}/>
</div>
<div class="item-desc-box">
    <div class="item-desc">
        {item.description}
    </div>
</div>
<div class="owner">
    <img src={images[`/src/lib/assets/images/${owner.pfp}`]} alt={owner.pfp} class="owner-pfp">
    <div class="owner-name">
        {owner.name}
    </div>
    <button
        class="w-16 m-2 p-3 text-base border-0 rounded cursor-pointer text-secondary-500 dark:text-secondary-dark-500 bg-background dark:bg-background-dark active:bg-secondary-500 dark:active:bg-secondary-dark-500 hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 active:text-background dark:text-secondary-dark-500 hover:text-background dark:hover:text-text-dark"
        on:click={() => goto("/")}
        aria-label="Chats">
        <i class="fa-solid fa-comment text-4xl"></i>
    </button>
</div>

<style>
    .owner {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .owner-pfp {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 3px;
        object-fit: cover;
        object-position: center right;
    }
    .owner-name {
        font-size:large;
    }
    .item-desc-box {
        border-radius: 5px;
        margin: 8px;
        margin-top: 16px;
        min-height: 60px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    }
    .item-desc {
        margin: 8px;
    }
</style>