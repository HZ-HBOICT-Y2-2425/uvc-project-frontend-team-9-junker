<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import JunkerLettering from './JunkerLettering.svelte';
    import { fly } from 'svelte/transition';
</script>

<div transition:fly="{{ y: -100, duration: 300 }}" class="fixed absolute z-20 h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)] flex items-center px-4">
  <div class="absolute left-0 flex items-center space-x-4">
    <NotificationBell />
  </div>
  <div class="absolute left-1/2 transform -translate-x-1/2">
    <JunkerLettering />
  </div>
  <div class="absolute right-0 flex items-center space-x-4">
    <ProfileButton />
  </div>
</div>
<div class="h-[10vh]"></div>
<style>
</style>