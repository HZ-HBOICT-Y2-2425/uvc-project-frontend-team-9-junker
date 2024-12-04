<script>
    import { goto } from '$app/navigation';
    import { communities } from '$lib/stores/AllPurposeStore';
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
  
    let showCancelPopup = false; // For cancel confirmation
    let showPrivatePopup = false; // For private community confirmation
    let showConfirmPopup = false; // For creation confirmation
    let showSuccessPopup = false; // For success message popup
    let generatedCode = ''; // Stores the unique code for private communities
  
    let name = ''; // Community name
    let location = ''; // Community location
    let status = 'public'; // Community status
    let description = ''; // Community description
    let picture = null; // Holds uploaded picture file
  
    function requestCreateCommunity() {
      if (!name.trim() || !location.trim() || !description.trim()) {
        alert('Please fill out all required fields!');
        return;
      }
      showConfirmPopup = true; // Show confirmation popup before creating
    }
  
    function confirmCreateCommunity() {
      const newCommunity = {
        id: Date.now(),
        title: name, // Ensure property matches existing objects
        location,
        image: picture ? URL.createObjectURL(picture) : '/placeholder-image.jpg', // Ensure fallback image
        members: 0, // Default value
        connections: 0, // Default value
        description, // Optional if used in Card
        tag: status, // Optional, depends on Card implementation
      };
  
      // Add the community to the store
      communities.update((list) => [...list, newCommunity]);
  
      // Show success popup
      showSuccessPopup = true;
  
      // Close the confirmation popup
      showConfirmPopup = false;
  
      // Reset the form
      resetForm();
    }
  
    function resetForm() {
      name = '';
      location = '';
      status = 'public';
      description = '';
      picture = null;
    }
  
    function handleFileChange(event) {
      picture = event.target.files[0];
    }
  
    function handleStatusChange(newStatus) {
      if (newStatus === 'private') {
        showPrivatePopup = true;
      } else {
        status = 'public';
      }
    }
  
    function confirmPrivateStatus() {
      showPrivatePopup = false;
      status = 'private';
      generatedCode = generateUniqueCode();
    }
  
    function generateUniqueCode() {
      return Math.random().toString(36).substr(2, 8).toUpperCase();
    }
  
    function cancelCreation() {
      showCancelPopup = true;
    }
  
    function confirmCancel() {
      showCancelPopup = false;
      goto('/community');
    }
  
    function closeSuccessPopup() {
      showSuccessPopup = false;
      goto('/community'); // Redirect to the main community page
    }
  </script>
  
  <Header title="Create a Community" />
  
  <div class="h-screen overflow-y-auto p-6 max-w-lg mx-auto space-y-4 border rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center">Add Community</h1>
  
    <!-- Upload Picture -->
    <img
      src={picture ? URL.createObjectURL(picture) : '/placeholder-image.jpg'}
      class="rounded-lg w-full max-h-64 object-cover"
    />
    <div class="flex justify-center">
      <input
        type="file"
        accept="image/*"
        on:change={handleFileChange}
        class="mt-2 block w-full border rounded-lg p-2"
      />
    </div>
  
    <!-- Community Name -->
    <input
      type="text"
      bind:value={name}
      placeholder="Community Name"
      class="w-full p-4 mt-4 border rounded-lg"
    />
  
    <!-- Community Location -->
    <input
      type="text"
      bind:value={location}
      placeholder="Location (e.g., Middelburg, Netherlands)"
      class="w-full p-4 mt-4 border rounded-lg"
    />
  
    <div class="flex items-center mt-4">
        <label class="mr-4">
          <input
            type="radio"
            value="public"
            bind:group={status} 
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            value="private"
            bind:group={status} 
          />
          Private
        </label>
      </div>
      
  
    <!-- Description -->
    <textarea
      bind:value={description}
      placeholder="Enter a description..."
      class="w-full mt-4 p-4 border rounded-lg"
    ></textarea>
  
    <!-- Buttons -->
    <div class="flex justify-between mt-4">
      <button
        class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
        on:click={cancelCreation}
      >
        Cancel
      </button>
      <button
        class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
        on:click={requestCreateCommunity}
      >
        Create
      </button>
    </div>
  </div>
  
  <!-- Confirmation Popup -->
  {#if showConfirmPopup}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 class="text-lg font-bold">Are you sure?</h2>
        <p>Do you want to create this community?</p>
        <div class="flex justify-around mt-4">
          <button
            class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            on:click={() => (showConfirmPopup = false)}
          >
            No
          </button>
          <button
            class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            on:click={confirmCreateCommunity}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Success Popup -->
  {#if showSuccessPopup}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 class="text-2xl font-bold">Community Created!</h2>
        <p>Your community has been created successfully.</p>
        <button
          class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
          on:click={closeSuccessPopup}
        >
          Go to Communities
        </button>
      </div>
    </div>
  {/if}
  
  <Footer />
  