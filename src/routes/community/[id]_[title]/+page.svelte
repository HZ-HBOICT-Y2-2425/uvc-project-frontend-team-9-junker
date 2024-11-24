<script>
// @ts-nocheck
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import { Community } from "$lib/models/Community.js";
    import { page } from "$app/stores";
    import { communityObject } from "$lib/stores/AllPurposeStore";
    import ViewCommunityListings from "$lib/components/ViewCommunityItems.svelte";
    let communityId = $page.params.id;
    let title = `Listings: ${$page.params.title}`;
    export let data;

</script>

<header>
    <SubHeaderV2 title={title}/>
</header>

<section class="container">
	<h2 class="text-center text-2xl my-6">Listings</h2>
	<table class="table-auto border-separate w-screen text-xs text-center">
		<thead><tr><th>ID</th><th>UserID</th><th>Name</th><th>Description</th><th>Views</th></tr></thead>
		<tbody>
			{#each data.items as item}
				<tr class="odd:bg-white even:bg-slate-50 hover:bg-orange-50 hover:cursor-pointer">
                    <td class="p-3">{item.id}</td>
                    <td>{item.userid}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.views}</td></tr
				>
			{/each}
		</tbody>
	</table>
</section>

<ViewCommunityListings communityId={communityId} communityMock={$communityObject}/>