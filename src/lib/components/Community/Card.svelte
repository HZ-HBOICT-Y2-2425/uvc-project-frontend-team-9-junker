<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { Community } from "$lib/models/Community.js";

  export let community;
  console.log(community);
</script>

<button
  class="relative bg-background w-full h-full dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-square"
  role="button"
  tabindex="0"
  on:click={() => goto(`/community/${encodeURIComponent(community.id)}_${encodeURIComponent(community.name)}`)}
  on:keydown={(e) => e.key === 'Enter' && goto(`/community/${encodeURIComponent(community.id)}_${encodeURIComponent(community.name)}`)}
>
  <!-- Tag -->
  {#if community.tag}
    <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
      {community.tag}
    </span>
  {/if}

  <!-- Image Section -->
  <div class="h-full relative">
    <img src={community.cover_pic || '/placeholder-image.jpg'} alt={community.name} class="w-full h-full object-cover" />

    <!-- Overlay -->
    <div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]">
      <h3
        class="text-sm md:text-lg font-semibold text-center truncate"
        title={community.name}
      >
        {community.name}
      </h3>
      <div class="mt-2 flex items-center justify-center space-x-4 text-xs md:text-sm">
        <!-- Members Count -->
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-users"></i>
          <span>{community.members}</span>
        </div>
        <!-- Connections Count -->
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>{community.connections}</span>
        </div>
      </div>
    </div>
  </div>
</button>
