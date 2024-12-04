<script>
    import { goto } from '$app/navigation';
    import { communities } from '$lib/stores/AllPurposeStore';
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
  
    let showCancelPopup = false; // For cancel confirmation
    let showPrivatePopup = false; // For private community confirmation
    let showSuccessPopup = false; // For success message popup
    let generatedCode = ''; // Stores the unique code for private communities
  
    let name = ''; // Community name
    let location = ''; // Community location
    let status = 'public'; // Community status
    let description = ''; // Community description
    let picture = null; // Holds uploaded picture file
  
    function createCommunity() {
  if (!name.trim() || !location.trim() || !description.trim()) {
    alert('Please fill out all required fields!');
    return;
  }

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

  communities.update((list) => [...list, newCommunity]); // Add to store

  // Reset the form
  resetForm();

  // Redirect to community list
  goto('/community');
}

  
    // Reset the form after successful creation
    function resetForm() {
      name = '';
      location = '';
      status = 'public';
      description = '';
      picture = null;
    }
  
    // Handle file input change
    function handleFileChange(event) {
      picture = event.target.files[0];
    }
  
    // Handle status change with confirmation for private
    function handleStatusChange(newStatus) {
      if (newStatus === 'private') {
        showPrivatePopup = true; // Show confirmation popup
      } else {
        status = 'public'; // Switch directly to public
      }
    }
  
    // Confirm making the community private
    function confirmPrivateStatus() {
      showPrivatePopup = false;
      status = 'private';
      generatedCode = generateUniqueCode();
    }
  
    // Generate a unique code for private communities
    function generateUniqueCode() {
      return Math.random().toString(36).substr(2, 8).toUpperCase();
    }
    function cancelCreation() {
  showCancelPopup = true; // Show confirmation popup
}

function confirmCancel() {
  showCancelPopup = false; // Close the popup
  goto('/community'); // Redirect to the main community page
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
  
    <!-- Status -->
    <div class="flex items-center mt-4">
      <label class="mr-2">
        <input
          type="radio"
          checked={status === 'public'}
          on:click={() => handleStatusChange('public')}
        /> Public
      </label>
      <label>
        <input
          type="radio"
          checked={status === 'private'}
          on:click={() => handleStatusChange('private')}
        /> Private
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
        on:click={createCommunity}
      >
        Create
      </button>
    </div>
  
    <!-- Cancel Confirmation Popup -->
    {#if showCancelPopup}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
          <p class="text-lg">Are you sure you want to cancel creating this community?</p>
          <div class="flex justify-around mt-4">
            <button
              class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              on:click={() => (showCancelPopup = false)}
            >
              No
            </button>
            <button
              class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              on:click={confirmCancel}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    {/if}
  
    <!-- Private Confirmation Popup -->
    {#if showPrivatePopup}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
          <p class="text-lg">Are you sure you want to make this community private? A unique code will be required to join.</p>
          <div class="flex justify-around mt-4">
            <button
              class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              on:click={() => (showPrivatePopup = false)}
            >
              No
            </button>
            <button
              class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              on:click={confirmPrivateStatus}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <Footer />
  