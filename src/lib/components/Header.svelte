<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import JunkerLettering from './JunkerLettering.svelte';
</script>

<div class="h-full w-full bg-[var(--background-color)] border-b-3 border-solid border-[var(--accent-color)] shadow-[0vh_4vh_16vh_rgba(0,0,0,0.5)] flex flex-nowrap justify-between">
    <NotificationBell />
    <JunkerLettering />
    <ProfileButton />
</div>

<style>
</style>