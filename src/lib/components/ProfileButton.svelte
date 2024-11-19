<script>
    import { goto } from "$app/navigation";
</script>

<button class="button" on:click={() => goto("/username")}><img class="profile-button" src="icons/iconoir--profile-circle.svg"></button>

<style>
    .button {
        
    }
    .profile-button {
        height: 4vh;
        width: 4vh;
    }

</style>