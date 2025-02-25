<script>
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";
  import { authStore } from "$lib/stores/authStore";

  let showCancelPopup = false; // For cancel confirmation
  let showPrivatePopup = false; // For private community confirmation
  let showConfirmPopup = false; // For creation confirmation
  let showSuccessPopup = false; // For success message popup
  let generatedCode = ""; // Stores the unique code for private communities

  let name = ""; // Community name
  let location = ""; // Community location
  let status = "public"; // Community status
  let description = ""; // Community description
  let cover_pic = ""; // Holds uploaded cover_pic file
  let userid = $authStore.user.id; // Holds user id
  console.log(userid);

  const createCommunity = async () => {
    try {
      console.log(userid);
      const response = await fetch('http://localhost:3011/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, name, description, location, status, cover_pic }),
      });
      const data = await response.json();
      console.log(data);

    } catch (error) {
        console.log(error);
    }
  }

  function requestCreateCommunity() {
    if (!name.trim() || !location.trim() || !description.trim()) {
      alert("Please fill out all required fields!");
      return;
    }
    showConfirmPopup = true; // Show confirmation popup before creating
  }

  function confirmCreateCommunity() {
    createCommunity();

    // Show success popup
    showSuccessPopup = true;
    
    // Close the confirmation popup
    showConfirmPopup = false;

    // Reset the form
    resetForm();

  }

  function resetForm() {
    name = "";
    location = "";
    status = "public";
    description = "";
    cover_pic = "";
  }

  /**
   * @param {{ target: { files: any[]; }; }} event
   */
  function handleFileChange(event) {
    const MAX_SIZE_MB = 5;
    const file = event.target.files[0];
        
    if (file) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          alert(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
      } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target) {
              cover_pic = e.target.result;
            }
          };
          reader.readAsDataURL(file);
      }
    }
    console.log(cover_pic);
  }

  /**
   * @param {string} newStatus
   */
  function handleStatusChange(newStatus) {
    if (newStatus === "private") {
      showPrivatePopup = true;
    } else {
      status = "public";
    }
  }

  function confirmPrivateStatus() {
    showPrivatePopup = false;
    status = "private";
    generatedCode = generateUniqueCode();
  }

  function generateUniqueCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  function cancelCreation() {
    showCancelPopup = true; // Show confirmation popup
  }

  function confirmCancel() {
    showCancelPopup = false; // Close the popup
    goto("/community"); // Redirect to the main community page
  }

  function closeSuccessPopup() {
    showSuccessPopup = false;
    goto("/community"); // Redirect to the main community page
  }
</script>

<Header title="Create a Community" />

<div
  class="h-screen overflow-y-auto p-6 max-w-lg mx-auto space-y-4 border rounded-lg shadow-lg"
>
  <h1 class="text-2xl font-bold text-center">Add Community</h1>

  <!-- Upload cover_pic -->
  <!-- svelte-ignore a11y_img_redundant_alt -->
  <img
    src={cover_pic ? cover_pic : "./placeholder-image.jpg"}
    class="rounded-lg w-full max-h-64 object-cover" alt="Community Image"
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
      <input type="radio" value="public" bind:group={status} />
        Public
      </label>
      <label>
      <input type="radio" value="private" bind:group={status} />
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
{#if showCancelPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
  >
  <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
    <h2 class="text-lg font-bold">Are you sure?</h2>
    <p>Do you want to cancel creating this community?</p>
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

<!-- Confirmation Popup -->
{#if showConfirmPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
  >
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
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
  >
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

<!-- <Footer /> -->