<script>
// @ts-nocheck
    import { toggleState } from "$lib/stores/AllPurposeStore";

    function toggle(name) {
        $toggleState = name;
    }
</script>

<div class="toggle-buttons">
    <button on:click={() => toggle("search")} class:is-active={$toggleState === "search"}>search</button>
    <button on:click={() => toggle("comms")} class:is-active={$toggleState === "comms"}>comms</button>
    <button on:click={() => toggle("chats")} class:is-active={$toggleState === "chats"}>chats</button>
    <button on:click={() => toggle("items")} class:is-active={$toggleState === "items"}>items</button>

</div>

<style>
    button {
      padding: 0.5em 1em;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    /* Add styles for active state */
    .is-active {
      background-color: var(--primary-color);
      color: white;
    }
  
    /* Default button style */
    button:not(.is-active) {
      background-color: gray;
      color: black;
    }
</style>