<script>
    // @ts-nocheck
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
    import { Item } from "$lib/models/Item.js";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    const images = import.meta.glob(['$lib/assets/images/**.jpg', '$lib/assets/images/**.png', '$lib/assets/images/**.svg', '$lib/assets/images/**.webp', '$lib/assets/images/**.avif'], { eager: true, as: 'url' });

    let itemId = $page.params.id;
    let itemName = $page.params.title;
    export let data;
    let { items } = data;
    let { users } = data;
    let item = items.find((item) => item.id == $page.params.id);
    let owner = users.find((user) => user.id == item.userid);

</script>

<header>
    {#if item}
        <SubHeaderV2 title={item.name}/>
    {/if}
</header>

<img src={images[`/src/lib/assets/images/${item.picture}`]} alt={item.name} class="" />