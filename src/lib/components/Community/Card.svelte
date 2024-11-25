<script>
// @ts-nocheck


  import { goto } from "$app/navigation";
  import { Community } from "$lib/models/Community.js";

  export let community = new Community("", "", "", 0, 0, "", []);

</script>

<button
class="relative bg-background sm:w-[30vh] dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-square"
on:click={() =>  goto(`/community/${community.id}_${community.title}`)}
>
  <!-- Tag (Optional) -->
  {#if community.tag}
    <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
      {community.tag}
    </span>
  {/if}

  <!-- Image Section -->
  <div class="h-full relative">
    <img src={community.image} alt={community.title} class="w-full h-full object-cover" />

    <!-- Uniform Text Overlay -->
    <div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]">
      <h3 class="text-sm md:text-lg font-semibold text-center truncate">{community.title}</h3>
      <div class="mt-2 flex items-center justify-center space-x-4 text-xs md:text-sm">
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-users"></i>
          <span>{community.members}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>{community.connections}</span>
        </div>
      </div>
    </div>
  </div>
</button>
