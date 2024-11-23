<script>
  export let profile = {
    name: "James M. Mason",
    avatar: "path-to-avatar.jpg",
    badges: ["Big Trader", "Donator", "Lvl 10"]
  };
</script>

<div class="flex flex-col items-center">
  <!-- Avatar -->
  <div class="relative">
    <img
      src={profile.avatar}
      alt="{profile.name}"
      class="w-32 h-32 rounded-full border-4 border-green-500"
    />
  </div>

  <!-- Name -->
  <h1 class="mt-4 text-2xl text-primary-500 font-bold">{profile.name}</h1>

  <!-- Badges -->
  <div class="mt-2 flex flex-wrap justify-center space-x-2">
    {#each profile.badges as badge}
      <span
        class="px-3 py-1 text-sm font-semibold text-white rounded-full"
        class:bg-green-500="{badge === 'Big Trader'}"
        class:bg-purple-500="{badge === 'Donator'}"
        class:bg-red-500="{badge === 'Lvl 10'}"
      >
        {badge}
      </span>
    {/each}
  </div>
</div>
