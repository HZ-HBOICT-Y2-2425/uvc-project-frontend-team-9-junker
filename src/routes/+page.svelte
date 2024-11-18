<script>
    import "../app.css";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    /*
    onMount( () => {
        goto("/welcome");
    });
    */
</script>

<div class="main-wrapper">
    <h1 class="bg-lime-400">Welcome to SvelteKit</h1>
    <p>
        Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
        documentation
    </p>
</div>

<style>
    .main-wrapper {
        background-color: var(--background-color);
    }
</style>