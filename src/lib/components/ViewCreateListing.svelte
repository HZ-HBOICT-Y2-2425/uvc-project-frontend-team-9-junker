<script lang="ts">
    import { onMount } from "svelte";
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore";
    import { authStore } from "$lib/stores/authStore";
    import { Community } from "$lib/models/Community.js";
    import { getCommunitiesByUserId } from "$lib/stores/CommunityStore";
    import { storePicture, deletePicture } from "$lib/stores/PictureStore";
    import { goto } from "$app/navigation";
    import { categories } from "$lib/stores/AllPurposeStore";
    import ProfileButton from "$lib/components/ProfileButton.svelte";

    let headerTitle = "Create Listing";

    let navigationRoute: string = "";
  
    let showCancelPopup = false; // For cancel confirmation
    let showConfirmPopup = false; // For creation confirmation
    let showSuccessPopup = false; // For success message popup
    let showIncompletePopup = false;
    let showLoginRequiredPopup = false;
    let showItemStoreFailedPopup = false;
    let showPictureStoreFailedPopup = false;

    let title: string = "";
    let selectedListingType: string = "Give-Away";
    let selectedCommunities: Set<Community> = new Set();
    let selectedCategoryId: string = "";
    let uploadedImages: string[] = [];
    let imageId = 0;
    let description: string = "";
    let categoriesSorted;
    
    let action: boolean = false;
    let userid: number | undefined = undefined;
    let available: boolean = true;
    let views: number = 0;
    let interested: number = 0;
    //let communities: string[] = Array.from(selectedCommunities);
    // 커뮤니티 목록

    let listingPath: string = "";

    let errorMessage: string = "";
    let pictureErrorIndex: number;

    const communityOptions = ["HZ", "APV", "Middelburg"];

    let auth: any;
    let userId: any;
    let communities: any;
    authStore.subscribe( (authStore) => updateUser(authStore));

    onMount( async () => {
      categoriesSorted = sortCategoriesbyName();
    });

    function sortCategoriesbyName() {
      return categories.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    }

    async function updateUser(authStore: any) {
      auth = authStore;
      userId = auth.user.id;
      communities = await getCommunitiesByUserId(userId);
      console.log(communities)
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

    async function postMyListing() {

      let name = title;
      let pictureIdArray = "";
      let pictureTitle = name.replace(/\s/g, ''); // remove all spaces in title
      let resultItem;
      let resultPicture = [];
      
      let communityIds: number[] = [];
      for(const community of selectedCommunities){
        communityIds.push(community.id);
      }
      
      resultItem = await storeItem(auth.user.id, name, description, "", action, available, views, interested, selectedCategoryId, JSON.stringify(communityIds));
      console.log(resultItem);
      if(resultItem?.itemId) {
        let itemId = resultItem?.itemId || 0;
        listingPath = `/item_details/${itemId}_${name}`
        
        //console.log(uploadedImages.entries())
        let entries = await uploadedImages.entries();
        for(const [index, imageDataString] of entries){
          console.log(imageDataString, index);
          resultPicture[index] = await storePicture(auth.user.id, itemId, null, `${pictureTitle}_${index}`, imageDataString);
          console.log(resultPicture[index]);
          if(resultPicture[index]?.pictureId) {
            if(pictureIdArray){
              pictureIdArray = pictureIdArray + "," + String(resultPicture[index].pictureId);
            }
            else if(!pictureIdArray){
              pictureIdArray = String(resultPicture[index].pictureId);
            }
            
          }
          else {
            let resultItemDelete = await deleteItem(itemId, auth.user.id);
            errorMessage = resultItemDelete;
            pictureErrorIndex = index +1;
            showPictureStoreFailedPopup = true;
            return
          }
        }
        // Reset the form
        resetForm();
      }
      else {
        errorMessage = resultItem;
        showItemStoreFailedPopup = true;
        return
      }

      //TODO: Update Item in db with picture Ids
      /*
      if(pictureIdArray){
        let result = await updateItem(itemId)
      }
      */
    }

    function requestCreateListing() {
      if(!auth?.user?.id) {
        showLoginRequiredPopup = true;
        return;
      }
      if (!title.trim() || !uploadedImages || !description.trim() || !selectedCommunities) {
        showIncompletePopup = true;
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
  
    }

    function resetForm() {
      title = "";
      selectedListingType = "Give-Away";
      description = "";
      selectedCommunities = new Set();
      uploadedImages = [];
      action = false;
    }

    function closeSuccessPopup() {
      showSuccessPopup = false;
      goto(`${listingPath}`); // Redirect to the created listing
    }

    function navigateToLeave(route: string) {
      navigationRoute = route;
      if(title || description || uploadedImages.length || selectedCommunities.size) {
        showCancelPopup = true; // Show confirmation popup
      }
      else {
        confirmNavigation();
      }
    }

    function confirmNavigation() {
      showCancelPopup = false; // Close the popup
      if(navigationRoute === 'back') {
        window.history.back();
      }
      else {
        goto(navigationRoute);
      }
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

<div class="h-screen w-screen flex flex-col bg-scroll">
  <div aria-label="header"
    class="fixed top-0 left-0 w-full z-10 flex flex-row flex-nowrap bg-background dark:bg-background-dark border-b-4 border-solid border-secondary-500 dark:border-secondary-dark-500
    shadow-[0vh_4vh_16vh_rgba(0,0,0,0.1)]
    "    
    >
    <button on:click={() => navigateToLeave('back')} aria-label="Go back"
      class="h-[10vh] w-[100vw]   flex flex-nowrap justify-between items-center overflow-hidden"
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
    <!--button class="text-secondary-500 dark:text-secondary-dark-500 m-4" on:click={() => navigateToLeave('/username')} aria-label="Profile">
      <i class="fa-regular fa-user text-4xl"></i>
    </button-->
    <div class="absolute right-0 flex items-center space-x-4">
      <button class="text-secondary-500 dark:text-secondary-dark-500 m-3" on:click={() => navigateToLeave('/username')} aria-label="Profile">
        {#if auth?.user?.profile_pic}
          <img src={auth?.user?.profile_pic}  alt="Profile Button" class="user-pfp rounded-full" style="width: 3rem; height: 3rem;">
        {:else}
          <!--img src={defaultProfilePic}  alt="Profile Button" class="default-pfp" style="width: 2.25rem; height: 2.25rem;"-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 2.25rem; height: 2.25rem; fill: rgb(57 198 156 / var(--tw-text-opacity, 1));" class="mt-1">
            <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>
  
  <div class="overflow-y-auto flex-grow mt-[10vh]">
    <div class="overflow-y-auto h-auto px-6 pb-6 max-w-lg mx-auto space-y-4">

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

        <div class="mb-4 w-full sm:w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Select a Category</label>
          <div class="relative">
            <select 
              bind:value={selectedCategoryId}
              class="category-select rounded-full border p-2 w-full"
              style="
                appearance: none; /* Hides the default arrow */
                -moz-appearance: none; /* For Firefox */
                -webkit-appearance: none; /* For Safari */
                background-image: none; /* Removes any background arrow in some browsers */
              "
            >
              {#if categoriesSorted?.length}
                {#each categoriesSorted as category}
                <option class="text-gray-600" value={String(category.id)}>
                    {category.name}
                </option>
                {/each}
              {/if}
            </select>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <!-- Custom arrow SVG -->
              <svg
                class="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
        
        <!--TODO: Make 3+ communities column flex wrap for up to two rows then scroll. Currently: overflow to the right-->
        <!-- Select Communities -->
        <div class="">
          <label class="block text-sm font-medium text-gray-700 mb-1">Select Communities</label>
          <div class="flex flex-wrap">
            {#if communities?.length}
            {#each communities as community}
              <button
                class="flex items-center px-4 py-2 mr-2 mb-2 rounded-full border font-medium text-sm"
                class:bg-primary-500="{selectedCommunities.has(community)}"
                class:text-white="{selectedCommunities.has(community)}"
                class:border-gray-300="{!selectedCommunities.has(community)}"
                class:text-gray-600="{!selectedCommunities.has(community)}"
                class:bg-white="{!selectedCommunities.has(community)}"
                on:click={() => toggleCommunity(community)}
              >
                {community.name}
              </button>
            {/each}
            {:else}
              <div>No communities available</div>
            {/if}
          </div>
        </div>
    
        <!-- Listing Type -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Listing type</label>
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
      <div class="bottom-scroll-space h-[40vh]">

      </div>
    </div>
  </div>
</div>

  {#if showCancelPopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
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
            on:click={confirmNavigation}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showIncompletePopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
        <h2 class="text-lg font-bold">Required Data Missing</h2>
        <p>You need to fill out all fields to create a listing</p>
        <div class="flex justify-around mt-4">
          <button
            class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
            on:click={() => (showIncompletePopup = false)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showLoginRequiredPopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
        <h2 class="text-lg font-bold">User Not Logged In</h2>
        <p>You need to be logged in to create a listing</p>
        <div class="flex justify-around mt-4">
          <button
            class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            on:click={() =>  (showLoginRequiredPopup = false, navigateToLeave('/username'))}
          >
            Login
          </button>
          <button
            class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
            on:click={() => (showLoginRequiredPopup = false)}
          >
            Ok
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
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
        <h2 class="text-lg font-bold">Are you sure?</h2>
        <p>Do you want to create this Listing?</p>
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
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
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

  {#if showItemStoreFailedPopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
        <h2 class="text-lg font-bold">Listing Upload Failed</h2>
        <p>{errorMessage}</p>
        <div class="flex justify-around mt-4">
          <button
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            on:click={() => (showItemStoreFailedPopup = false)}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showIncompletePopup}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center m-2">
        <h2 class="text-lg font-bold">Picture Nr.{pictureErrorIndex} Upload Failed</h2>
        <p>{errorMessage}</p>
        <div class="flex justify-around mt-4">
          <button
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            on:click={() => (showIncompletePopup = false)}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  {/if}