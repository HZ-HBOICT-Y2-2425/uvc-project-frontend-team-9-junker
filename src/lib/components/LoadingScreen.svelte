<script>
// @ts-nocheck
    import { darkModeEnabled } from "$lib/stores/AllPurposeStore";
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    let co2Reduction = 0;
    onMount( async () => {
        const response = await fetch("http://localhost:3012/co2");
        const data = await response.json();
        console.log(data);
        co2Reduction = data.total;
    });

</script>

<div class:dark={$darkModeEnabled === true} class="flex items-center justify-center min-h-screen flex-col bg-background dark:bg-background-dark transform translate-y-[-10%]">
    <button on:click={ () => goto("/")} class="flex justify-center ml-auto mr-auto">
        <img src="/Frog.png" alt="Junker Frog Icon" class="h-20 w-20" />
    </button>
    <div class="text-primary-500 dark:text-primary-dark-500 font-kiranghaerang text-[14vh] mt-[-4vh] mb-[-5vh] mx-auto drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]"> Junker </div>
    <div class="ml-auto mr-auto">The Social Item-Exchange Platform</div>
    <blockquote class="ml-auto mr-auto text-center text-black font-serif italic text-lg mt-4 px-4 py-2 rounded shadow-md">
        <strong>{co2Reduction}</strong> kg of CO2 <br>has been reduced using Junker
    </blockquote>
</div>   

<style>
</style>