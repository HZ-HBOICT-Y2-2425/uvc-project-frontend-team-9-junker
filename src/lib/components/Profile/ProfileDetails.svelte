<script>
  export let user;
  export let badges;
  export let item;
  export let handleImageUpload;
</script>

<!-- Profile Section -->
<div class="flex flex-col items-center mb-8">
  <!-- svelte-ignore a11y_img_redundant_alt -->
  <img
    src={user.profile_pic}
    alt="Profile Picture"
    class="w-32 h-32 rounded-full object-cover mb-2"
  />

  <!-- Change Profile Picture -->
  <label for="profile-upload" class="text-green-500 underline cursor-pointer text-sm">
    Change Profile Picture
  </label>
  <input type="file" id="profile-upload" accept="image/*" on:change={handleImageUpload} class="hidden" />

  <!-- Change Password -->
  <a href="/change-password" class="text-green-500 underline cursor-pointer text-sm">
      Change Password
  </a>

  <!-- Username -->
  <h2 class="text-center text-2xl font-bold mb-4 md:mb-0 md:text-left md:self-center">
    @{user.username}
</h2>
</div>

<!-- Badges -->
<div class="flex justify-center gap-3 mb-8">
  {#each badges as badge, i}
    <span
      class="px-4 py-2 rounded-full text-sm text-black {i === 0
        ? 'bg-[#B1FAAF]'
        : i === 1
          ? 'bg-[#F07FFF]'
          : 'bg-[#FB7E7E]'}"
    >
      {badge}
    </span>
  {/each}
</div>