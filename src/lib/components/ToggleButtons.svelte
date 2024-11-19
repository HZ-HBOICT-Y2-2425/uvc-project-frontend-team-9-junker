<script>
// @ts-nocheck
    import { toggleState } from "$lib/stores/AllPurposeStore";

    function toggle(name) {
        $toggleState = name;
    }
</script>

<div>
    <button 
      class="p-2 text-base border-0 rounded cursor-pointer text-black bg-gray-300 active:bg-primary hover:bg-primary active:text-white hover:text-white" 
      on:click={() => toggle("search")} 
      class:active={$toggleState === "search"}>
      search
    </button>
    <button
      class="p-2 text-base border-0 rounded cursor-pointer text-black bg-gray-300 active:bg-primary hover:bg-primary active:text-white hover:text-white"
      on:click={() => toggle("comms")}
      class:is-active={$toggleState === "comms"}>
      comms
    </button>
    <button
      class="p-2 text-base border-0 rounded cursor-pointer text-black bg-gray-300 active:bg-primary hover:bg-primary active:text-white hover:text-white"
      on:click={() => toggle("chats")}
      class:is-active={$toggleState === "chats"}>
      chats
    </button>
    <button
      class="p-2 text-base border-0 rounded cursor-pointer text-black bg-gray-300 active:bg-primary hover:bg-primary active:text-white hover:text-white"
      on:click={() => toggle("items")}
      class:is-active={$toggleState === "items"}>
      items
    </button>
</div>

<style>
</style>