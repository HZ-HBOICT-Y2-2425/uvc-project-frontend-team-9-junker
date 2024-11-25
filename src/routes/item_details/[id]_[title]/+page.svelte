<script>
    // @ts-nocheck
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import CommunityListingCard from "$lib/components/CommunityListings/CommunityListingCard.svelte";
    import { Item } from "$lib/models/Item.js";
    import { page } from "$app/stores";
    let itemId = $page.params.id;
    let itemName = $page.params.title;
    export let data;

</script>

<header>
    <SubHeaderV2 title={itemName}/>
</header>