<script>
    import { goto } from "$app/navigation";
    import { Community } from "$lib/models/Community.js";
  
    export let community = new Community(0, "Untitled Community", "/placeholder-image.jpg", 0, 0, "", []);
  </script>
  
  <button
    class="relative bg-background w-full h-full dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-square"
    on:click={() => goto(`/community/${community.id}_${encodeURIComponent(community.title)}`)}
  >
    <!-- Tag -->
    {#if community.tag}
      <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
        {community.tag}
      </span>
    {/if}
  
    <!-- Image Section -->
    <div class="h-full relative">
      <img src={community.image || '/placeholder-image.jpg'} alt={community.title || 'No Title'} class="w-full h-full object-cover" />
      <div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]">
        <h3 class="text-sm md:text-lg font-semibold text-center truncate" title={community.title || 'No Title'}>
          {community.title || 'No Title'}
        </h3>
        <div class="mt-2 flex items-center justify-center space-x-4 text-xs md:text-sm">
          <div class="flex items-center space-x-1">
            <i class="fa-solid fa-users"></i>
            <span>{community.members || 0}</span>
          </div>
          <div class="flex items-center space-x-1">
            <i class="fa-solid fa-arrows-rotate"></i>
            <span>{community.connections || 0}</span>
          </div>
        </div>
      </div>
    </div>
  </button>
  