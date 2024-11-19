<script>
    import TestDialog from "./Dialogs/TestDialog.svelte";
    let isModalOpen = false;
  
    const openModal = () => {
      isModalOpen = true;
    };
  
    const closeModal = () => {
      isModalOpen = false;
    };
  </script>
  
  <button on:click="{openModal}">Open Modal</button>
  
  <TestDialog
    show="{isModalOpen}"
    title="Example Modal"
    on:close="{closeModal}"
  >
    <p>This is the content of the modal.</p>
    <button slot="footer" on:click="{closeModal}">Close</button>
  </TestDialog>