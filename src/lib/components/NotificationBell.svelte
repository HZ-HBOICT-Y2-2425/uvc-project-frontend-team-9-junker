<script>
    import { goto } from "$app/navigation";
</script>

<button class="button" on:click={() => goto("/notifications")}><img class="notification-bell" src="icons/cil--bell.svg"></button>

<style>
    .button {
        
    }
    .notification-bell {
        height: 4vh;
        width: 4vh;
        stroke: var(--accent-color);
    }

</style>