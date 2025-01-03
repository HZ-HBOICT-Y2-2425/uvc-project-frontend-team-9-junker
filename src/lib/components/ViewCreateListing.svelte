<script lang="ts">
    import { onMount } from "svelte";
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore";
    import { Community } from "$lib/models/Community.js";
    import { communities } from '$lib/stores/AllPurposeStore';
    import { storePicture } from "$lib/stores/PictureStore";
    import { goto } from "$app/navigation";
    //import { authStore } from "$lib/stores/authStore";

    let headerTitle = "Create Listing";
  
    let showCancelPopup = false; // For cancel confirmation
    let showPrivatePopup = false; // For private community confirmation
    let showConfirmPopup = false; // For creation confirmation
    let showSuccessPopup = false; // For success message popup

    let title: string = "";
    let selectedListingType: string = "Give-Away";
    let selectedCommunities: Set<Community> = new Set();
    let uploadedImages: string[] = [];
    let imageId = 0;
    let description: string = "";
    
    let action: boolean = false;
    let userid: number | undefined = undefined;
    let available: boolean = true;
    let views: number = 0;
    let interested: number = 0;
    let categories: number[] = [];
    //let communities: string[] = Array.from(selectedCommunities);
    // 커뮤니티 목록

    let listingPath: string = "";

    const communityOptions = ["HZ", "APV", "Middelburg"];

    onMount( async () => {

    });
  
    // Toggle listing type
    function toggleListingType(type: string) {
      selectedListingType = type;
      selectedListingType === "Give-Away" ? action = false : action = true;
    }
  
    // Toggle community
    function toggleCommunity(community: Community) {
      if (selectedCommunities.has(community)) {
        selectedCommunities.delete(community);
      } else {
        selectedCommunities.add(community);
      }
      selectedCommunities = new Set([...selectedCommunities]); // Reassign to trigger reactivity
    }
  
    // Handle image upload
    function handleImageUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        for (const file of input.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedImages = [...uploadedImages, e!.target!.result as string];
            console.log(e!.target!.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  
    // Delete an uploaded image
    function deleteImage(index: number) {
      uploadedImages.splice(index, 1);
      uploadedImages = uploadedImages; // triggers GUI update
      //uploadedImages = uploadedImages.filter(image => image.id !== id);
    }

    //userid: number, name: string, description: string, images: string[], action: boolean, available: boolean, views: number, interested: number, categories: string[], communities: number[]
    async function postMyListing() {

      // id, userid, name, description, pictures, action, available, views, interested, date, categories, communities
      let name = title;
      description = description;

      //communities = Array.from(selectedCommunities);
      userid = 0;
      
      let communityIds = "";
      for(const community of selectedCommunities){
        if(communityIds){
          communityIds = communityIds + "," + String(community.id);
        }
        else if(!communityIds){
          communityIds = String(community.id);
        }
      }
      
      let result = await storeItem(userid, name, description, "", action, available, views, interested, categories, communityIds);
      console.log(result);
      let itemId = result?.itemId || 0;
      listingPath = `/item_details/${itemId}_${name}`

      // Upload pictures and get back the string of picture IDs (ex. "1,2,3")
      let pictureTitle = name.replace(/\s/g, ''); // remove all spaces in title 
      // string
      let pictureIdArray = "";
      //console.log(uploadedImages.entries())
      let entries = await uploadedImages.entries();
      for(const [index, imageDataString] of entries){
        console.log(imageDataString, index);
        let result = await storePicture(0, itemId, null, `${pictureTitle}_${index}`, imageDataString);
        console.log(result);
        console.log(String(result?.pictureId));
        if(result?.pictureId) {
          if(pictureIdArray){
            pictureIdArray = pictureIdArray + "," + String(result.pictureId);
          }
          else if(!pictureIdArray){
            pictureIdArray = String(result.pictureId);
          }
          
        }
      }

      //TODO: Update Item in db with picture Ids
      /*
      if(pictureIdArray){
        let result = await updateItem(itemId)
      }
      */
    }

    function cancelCreation() {
      if(title || description || uploadedImages.length || selectedCommunities.size) {
        showCancelPopup = true; // Show confirmation popup
      }
      else {
        confirmCancel();
      }
    }

    function requestCreateListing() {
      if (!title.trim() || !uploadedImages || !description.trim() || !selectedCommunities) {
        alert("Please fill out all required fields!");
        return;
      }
      showConfirmPopup = true; // Show confirmation popup before creating
    }

    async function confirmCreateListing() {
      await postMyListing();
  
      // Show success popup
      showSuccessPopup = true;
  
      // Close the confirmation popup
      showConfirmPopup = false;
  
      // Reset the form
      resetForm();
  
    }

    function resetForm() {
      title = "";
      selectedListingType = "Give-Away";
      description = "";
      selectedCommunities = new Set();
      uploadedImages = [];
      action = false;
    }

    function confirmCancel() {
      showCancelPopup = false; // Close the popup
      window.history.back()
    }

    function closeSuccessPopup() {
      showSuccessPopup = false;
      goto(`${listingPath}`); // Redirect to the created listing
    }

  </script>
  
  <style>
    /* Add custom styles if needed */
    .upload-placeholder {
      cursor: pointer;
    }
  
    .upload-placeholder:hover {
      background-color: #f3f4f6;
    }
  </style>

  <button on:click={cancelCreation} aria-label="Go back"
    class="h-[10vh] w-[100vw] bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500 shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)] flex flex-nowrap justify-between items-center overflow-hidden"
    >
      <div class="text-secondary-500 dark:text-secondary-dark-500 m-4">
        <i class="fa-solid fa-chevron-left text-4xl"></i>
      </div>
      <div class="flex justify-center items-center h-full">
        <div class="flex items-center justify-center text-primary-500 dark:text-primary-dark-500 font-rem text-3xl mt-[-2.5vh] mb-[-2.5vh] mx-auto drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
          <span class="flex items-center truncate">{headerTitle}</span>
        </div>
      </div>
    <!-- spacer div -->
    <div class="flex items-center space-x-4 w-14"></div>
  </button>
  
  <div class="h-screen overflow-y-auto px-6 pb-6 max-w-lg mx-auto space-y-4 border rounded-lg shadow-lg">
    <!--div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md"-->
      <!-- Title (Editable) -->
      <!--div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          bind:value={title}  
          class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          placeholder="Enter title"
        />
      </div-->

      <!-- Listing Title -->
      <input
        type="text"
        bind:value={title}
        placeholder="Choose a Title for your Listing"
        class="w-full p-4 mt-4 border rounded-lg"
      />
  
      <!-- Image Upload Section -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
        <div class="flex flex-wrap gap-4">
          <!-- Render uploaded images -->
          {#each uploadedImages as image, index}
            <div class="relative">
              <img
                src="{image}"
                alt="Uploaded Item"
                class="w-32 h-32 object-cover rounded-lg border"
              />
              <!-- Delete button -->
              <button
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                on:click={() => deleteImage(index)}
              >
                ✕
              </button>
            </div>
          {/each}
          <!-- Add Image Button -->
          <div
            class="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg upload-placeholder bg-white"
            on:click={() => document.getElementById("imageUploadInput")?.click()}
          >
            <span class="text-gray-400 text-sm font-medium">+ Add Image</span>
          </div>
        </div>
        <!-- Hidden Input for Image Upload -->
        <input
          type="file"
          id="imageUploadInput"
          class="hidden"
          accept="image/*"
          multiple
          on:change={handleImageUpload}
        />
      </div>
  
      <!-- Description Section -->
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Add description</label>
        <textarea
          id="description"
          rows="4"
          bind:value={description}
          placeholder="Enter description here"
          class="w-full p-4 border rounded-lg"
        >
        </textarea>
      </div>
      
      <!--TODO: Make 3+ communities column flex wrap for up to two rows then scroll. Currently: overflow to the right-->
      <!-- Select Communities -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Select Communities</label>
        <div class="flex flex-wrap space-x-2 space-y-2">
          {#each communities as community}
            <button
              class="flex items-center px-4 py-2 rounded-full border font-medium text-sm"
              class:bg-primary-500="{selectedCommunities.has(community)}"
              class:text-white="{selectedCommunities.has(community)}"
              class:border-gray-300="{!selectedCommunities.has(community)}"
              class:text-gray-600="{!selectedCommunities.has(community)}"
              class:bg-white="{!selectedCommunities.has(community)}"
              on:click={() => toggleCommunity(community)}
            >
              {community.title}
            </button>
          {/each}
        </div>
      </div>
  
      <!-- Listing Type -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Listing type</label>
        <!--div class="flex space-x-4">
          <button
            class="px-4 py-2 border rounded-full text-sm font-medium"
            class:bg-primary-500="{selectedListingType === 'Give-Away'}"
            class:text-white="{selectedListingType === 'Give-Away'}"
            class:border-gray-300="{selectedListingType !== 'Give-Away'}"
            class:text-gray-600="{selectedListingType !== 'Give-Away'}"
            class:bg-white="{selectedListingType !== 'Give-Away'}"
            on:click={() => toggleListingType('Give-Away')}
          >
            Give-Away
          </button>
          <button
            class="px-4 py-2 border rounded-full text-sm font-medium"
            class:bg-primary-500="{selectedListingType === 'Trade-Offer'}"
            class:text-white="{selectedListingType === 'Trade-Offer'}"
            class:border-gray-300="{selectedListingType !== 'Trade-Offer'}"
            class:text-gray-600="{selectedListingType !== 'Trade-Offer'}"
            class:bg-white="{selectedListingType !== 'Trade-Offer'}"
            on:click={() => toggleListingType('Trade-Offer')}
          >
            Trade-Offer
          </button>
        </div-->
      </div>

      <div class="flex space-x-4">
        <label
          class="flex px-4 py-2 border rounded-full text-sm font-medium"
          class:bg-primary-500="{selectedListingType === 'Give-Away'}"
          class:text-white="{selectedListingType === 'Give-Away'}"
          class:border-gray-300="{selectedListingType !== 'Give-Away'}"
          class:text-gray-600="{selectedListingType !== 'Give-Away'}"
          class:bg-white="{selectedListingType !== 'Give-Away'}"
        >
          <input class="my-auto mr-1" type="radio" value="Give-Away" bind:group={selectedListingType} />
          Give-Away
        </label>
        <label
          class="flex px-4 py-2 border rounded-full text-sm font-medium"
          class:bg-primary-500="{selectedListingType === 'Trade-Offer'}"
          class:text-white="{selectedListingType === 'Trade-Offer'}"
          class:border-gray-300="{selectedListingType !== 'Trade-Offer'}"
          class:text-gray-600="{selectedListingType !== 'Trade-Offer'}"
          class:bg-white="{selectedListingType !== 'Trade-Offer'}"
        >
          <input class="my-auto mr-1" type="radio" value="Trade-Offer" bind:group={selectedListingType} />
          Trade-Offer
        </label>
      </div>
  
      <!-- Submit Button -->
      <button
        on:click={requestCreateListing}
        class="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Post my listing
      </button>

      <!--div>
        <button
        class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 mx-auto"
        on:click={cancelCreation}
        >
          Cancel
        </button>
      </div-->
    <!--/div-->
  </div>  

  {#if showCancelPopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 class="text-lg font-bold">Are you sure?</h2>
        <p>Do you want to cancel creating this listing?</p>
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
            on:click={confirmCreateListing}
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
        <h2 class="text-2xl font-bold">Listing Created!</h2>
        <p>Your listing has been created successfully.</p>
        <button
          class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
          on:click={closeSuccessPopup}
        >
          Go to my new listing
        </button>
      </div>
    </div>
  {/if}