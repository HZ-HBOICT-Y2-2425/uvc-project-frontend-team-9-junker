<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import JunkerLettering from './JunkerLettering.svelte';
</script>

<div class="h-full w-full bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.5)] flex flex-nowrap justify-center items-center space-x-4">
  <NotificationBell />
  <JunkerLettering />
  <ProfileButton />
</div>

<style>
</style>