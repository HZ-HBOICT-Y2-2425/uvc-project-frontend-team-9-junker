<script>
    import NotificationBell from '$lib/components/NotificationBell.svelte';
    import ProfileButton from './ProfileButton.svelte';
    import JunkerLettering from './JunkerLettering.svelte';
</script>

<div class="main-wrapper">
    <NotificationBell />
    <JunkerLettering />
    <ProfileButton />
</div>

<style>
    .main-wrapper {
        height: 100%;
        width: 100%;
        background-color: var(--background-color);
        border-bottom: 3px;
        border-style: solid;
        border-color: var(--accent-color);
        box-shadow: 0vh 4vh 16vh rgba(0,0,0, 0.5);
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
</style>