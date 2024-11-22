<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import JunkerLettering from './JunkerLettering.svelte';
    import { fly } from 'svelte/transition';

</script>

<div transition:fly="{{ y: -100, duration: 300 }}" class="h-full w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.5)] flex flex-nowrap justify-between items-center px-4">
  <div class="flex items-center space-x-4">
    <NotificationBell />
  </div>
  <div class="relative">
    <JunkerLettering />
  </div>
  <div class="flex items-center space-x-4">
    <ProfileButton />
  </div>
</div>

<style>
</style>