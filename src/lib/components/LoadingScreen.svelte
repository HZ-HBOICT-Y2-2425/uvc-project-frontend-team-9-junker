<script>
// @ts-nocheck

    import JunkerLettering from "./JunkerLettering.svelte";
    import { loadingState } from "$lib/stores/AllPurposeStore";
    import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
    import { onMount } from 'svelte';
    onMount( () => {
        if(!$loadingState) {
            mockLoading(500);
        }
    });

    function mockLoading(ms) {
        setInterval(function() {
            $loadingState = true;
        }, ms)
    }
</script>

<div class:dark={$darkModeEnabled === true} class="flex items-center justify-center min-h-screen flex-col bg-background dark:bg-background-dark">
    <div class="text-primary-500 dark:text-primary-dark-500 font-kiranghaerang text-[14vh] mt-[-4vh] mb-[-5vh] mx-auto drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]"> Junker </div>
    <div class="ml-auto mr-auto">The Social Item-Exchange Platform</div>
    <img class="mx-auto max-w-[50vw] max-h-[40vh]" alt="Junker_Logo.png" src="Junker_Logo.png">
</div>

<style>
</style>