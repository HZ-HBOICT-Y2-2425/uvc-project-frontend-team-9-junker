<script>
  import Card from './Card.svelte';

  const communities = [
    {
      title: "Middelburg",
      image: "middelburg-church.JPG",
      members: 218,
      connections: 22,
      tag: "Nearby"
    },
    {
      title: "HZ Students",
      image: "hz-middelburg.jpg",
      members: 218,
      connections: 22,
      tag: ""
    },
    {
      title: "APV Residents",
      image: "APV-ruyter.jpg",
      members: 218,
      connections: 22,
      tag: ""
    },
    {
      title: "APV Residents",
      image: "APV-ruyter.jpg",
      members: 218,
      connections: 22,
      tag: ""
    }
  ];
</script>

<div class="flex flex-col items-center p-4 space-y-8">
  <!-- Styled Input Area -->
  <div class="bg-background dark:bg-background-dark rounded-lg shadow-md p-4 max-w-md">
    <div class="flex items-center justify-center space-x-2">
      <input 
        type="text" 
        placeholder="Enter a code.." 
        class="px-4 py-2 border rounded-lg text-sm text-text dark:text-text-dark bg-background dark:bg-background-dark focus:ring-primary focus:border-primary"
      />
      <button 
        class="w-10 h-10 flex items-center justify-center bg-primary-500 dark:bg-primary-dark-500 text-white rounded-lg shadow-md" 
        aria-label="Submit code"
      >
        <i class="fa-solid fa-check"></i>
      </button>
    </div>
  </div>

  <!-- Divider with "My Communities" -->
  <div class="flex items-center w-full max-w-md">
    <hr class="border-2 rounded flex-grow border-secondary-500 dark:border-secondary-dark-500" />
    <span class="mx-4 text-text dark:text-text-dark font-medium">My Communities</span>
    <hr class="border-2 rounded flex-grow border-secondary-500 dark:border-secondary-dark-500" />
  </div>

  <!-- Community Grid -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
    <!-- Add Community Button -->
    <div 
      class="flex flex-col items-center justify-center bg-background dark:bg-background-dark rounded-lg shadow-md border-4 border-secondary-500 dark:border-secondary-dark-500 cursor-pointer hover:bg-secondary-500 dark:hover:bg-secondary-dark-500 transition aspect-square text-center"
    >
      <i class="fa-solid fa-plus text-secondary-500 dark:text-secondary-dark-500 text-4xl md:text-5xl"></i>
      <span class="mt-2 text-sm md:text-base font-medium text-secondary-500 dark:text-secondary-dark-500">
        Add Community
      </span>
    </div>
  
    <!-- Community Cards -->
    {#each communities as community}
      <Card
        title={community.title}
        image={community.image}
        members={community.members}
        connections={community.connections}
        tag={community.tag}
      />
    {/each}
  </div>
  
  
</div>
