<script>
  export let title = "";
  export let image = "";
  export let members = 0;
  export let connections = 0;
  export let tag = ""; // Optional, e.g., "Nearby"
</script>

<div class="relative bg-background dark:bg-background-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-square">
  <!-- Tag (Optional) -->
  {#if tag}
    <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
      {tag}
    </span>
  {/if}

  <!-- Image Section -->
  <div class="h-full relative">
    <img src={image} alt={title} class="w-full h-full object-cover" />

    <!-- Uniform Text Overlay -->
    <div class="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-70 text-white p-4 h-[80px] md:h-[100px]">
      <h3 class="text-sm md:text-lg font-semibold text-center truncate">{title}</h3>
      <div class="mt-2 flex items-center justify-center space-x-4 text-xs md:text-sm">
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-users"></i>
          <span>{members}</span>
        </div>
        <div class="flex items-center space-x-1">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>{connections}</span>
        </div>
      </div>
    </div>
  </div>
</div>
