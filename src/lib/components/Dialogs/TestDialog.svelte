<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
  
    export let show = false; // Controls modal visibility
    export let title = ''; // Title for the modal
  
    const dispatch = createEventDispatcher();
  
    const closeModal = () => {
      dispatch('close'); // Notify parent to hide modal
    };
  </script>
  
  <style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
        text-align: center;
    }

    .modal-header {
        margin-bottom: 1rem;
    }

    .modal-footer {
        margin-top: 1.5rem;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
</style>

  
  {#if show}
    <div class="backdrop" on:click="{closeModal}" in:fade out:fade>
      <div class="modal" on:click|stopPropagation in:scale={{ duration: 200 }}>
        <button class="close-btn" aria-label="Close modal" on:click="{closeModal}">✖</button>
        <div class="modal-header">
          <h2>{title}</h2>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  {/if}
  