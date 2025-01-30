<script>
// @ts-nocheck

    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/authStore";

    let user;
    let auth;
    authStore.subscribe( (authStore) => auth = authStore);

</script>

<button class="text-secondary-500 dark:text-secondary-dark-500 m-3" on:click={() => goto("/username")} aria-label="Profile">
  {#if auth?.user?.profile_pic}
    <img src={auth?.user?.profile_pic}  alt="Profile Button" class="user-pfp rounded-full" style="width: 3rem; height: 3rem;">
  {:else}
    <!--img src={defaultProfilePic}  alt="Profile Button" class="default-pfp" style="width: 2.25rem; height: 2.25rem;"-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 2.25rem; height: 2.25rem; fill: rgb(57 198 156 / var(--tw-text-opacity, 1));" >
      <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
    </svg>
  {/if}
</button>

<style>

</style>