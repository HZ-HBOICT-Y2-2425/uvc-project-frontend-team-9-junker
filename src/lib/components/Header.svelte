<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import { fly } from 'svelte/transition';

    export let title = "Default Title"; // Define a prop for the header title
</script>

<div class="fixed absolute z-20 h-[10vh] w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)] flex items-center px-4">
  <div class="absolute left-0 flex items-center space-x-4">
    <NotificationBell />
  </div>
  <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
    <span class="text-primary-500 dark:text-primary-dark-500 text-center font-rem text-3xl drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">{title}</span>
  </div>
  <div class="absolute right-0 flex items-center space-x-4">
    <ProfileButton />
  </div>
</div>
<div class="h-[10vh]"></div>

<style>
/* Add any additional styles here */
</style>