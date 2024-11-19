<script>
// @ts-nocheck

    import JunkerLettering from "./JunkerLettering.svelte";
    import { loadingState } from "$lib/stores/AllPurposeStore";
    import { onMount } from 'svelte';
    onMount( () => {
        if(!$loadingState) {
            mockLoading(5000);
        }
    });

    function mockLoading(ms) {
        setInterval(function() {
            $loadingState = true;
        }, ms)
    }
</script>

<div class="main-wrapper">
    <div class="junker_lettering"> Junker </div>
    <div class="junker_subtitle">The Social Item-Exchange Platform</div>
    <img class="junker_logo" alt="Junker_Logo.png" src="Junker_Logo.png">
</div>

<style>
    .main-wrapper {
        display: flex;
        flex-direction: column;
    }
    .junker_logo {
        margin-left: auto;
        margin-right: auto;
        max-width: 50vw;
        max-height: 40vh;
    }
    .junker_lettering {
        color: var(--primary-color);
        font-family:'KirangHaerang', sans-serif;
        font-size: 14vh;
        margin-top: -4vh;
        margin-bottom: -5vh;
        margin-left: auto;
        margin-right: auto;
        text-shadow: 0px 2px 2px rgba(0,0,0, 0.25);
    }
    .junker_subtitle {
        margin-left: auto;
        margin-right: auto;
    }

</style>