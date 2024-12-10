<script lang="ts">
    import { onMount } from "svelte";
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore";
  
    let title: string = "Vintage Nike Sneakers Size 12";  // 제목을 수정 가능한 변수로 설정
    let selectedListingType: string = "Give-Away";
    let selectedCommunities: Set<string> = new Set();
    let uploadedImages: { id: number; url: string }[] = []; // 업로드된 이미지를 저장할 배열
    let imageId = 0; // 이미지 ID를 관리
    let description: string = "I just remembered that I had bought these shoes 10 years ago and they never really fit me well so I barely wore them. \nI'm looking for some cool vintage fashion. Let's make a trade!";
    
    let action: boolean = false;
    let name: string = "";
    let images: string[] = [];
    let userid: number | undefined = undefined;
    let available: boolean = true;
    let views: number = 0;
    let interested: number = 0;
    let categories: number[] = [];
    let communities: string[] = Array.from(selectedCommunities);
    // 커뮤니티 목록
    const communityOptions = ["HZ", "APV", "Middelburg"];
  
    // Toggle listing type
    function toggleListingType(type: string) {
      selectedListingType = type;
      selectedListingType === "Give-Away" ? action = false : action = true;
    }
  
    // Toggle community
    function toggleCommunity(community: string) {
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
          reader.onload = () => {
            uploadedImages = [...uploadedImages, { id: imageId++, url: reader.result as string }];
          };
          reader.readAsDataURL(file);
        }
      }
    }

    /**
     * @param {{ target: { files: any[]; }; }} event
     */
    /*
     function handleImageUpload(event: Event) {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            user.profile_pic = e.target.result;
        };
        reader.readAsDataURL(file);
        }
    }
    */
  
    // Delete an uploaded image
    function deleteImage(id: number) {
      uploadedImages = uploadedImages.filter(image => image.id !== id);
    }

    //userid: number, name: string, description: string, images: string[], action: boolean, available: boolean, views: number, interested: number, categories: string[], communities: number[]
    function postMyListing() {
      name = title;
      communities = Array.from(selectedCommunities);
      userid = 0;
        
      let result = storeItem(userid, name, description, images, action, available, views, interested, categories, communities);
      console.log(result);
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
  
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <!-- Title (Editable) -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          bind:value={title}  
          class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          placeholder="Enter title"
        />
      </div>
  
      <!-- Image Upload Section -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
        <div class="flex flex-wrap gap-4">
          <!-- Render uploaded images -->
          {#each uploadedImages as image}
            <div class="relative">
              <img
                src="{image.url}"
                alt="Uploaded Item"
                class="w-32 h-32 object-cover rounded-lg border"
              />
              <!-- Delete button -->
              <button
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                on:click={() => deleteImage(image.id)}
              >
                ✕
              </button>
            </div>
          {/each}
          <!-- Add Image Button -->
          <div
            class="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg upload-placeholder"
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
          class="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          {description}
        </textarea>
      </div>
  
      <!-- Select Communities -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Select Communities</label>
        <div class="flex space-x-2">
          {#each communityOptions as community}
            <button
              class="flex items-center px-4 py-2 rounded-full border font-medium text-sm"
              class:bg-green-500="{selectedCommunities.has(community)}"
              class:text-white="{selectedCommunities.has(community)}"
              class:border-gray-300="{!selectedCommunities.has(community)}"
              class:text-gray-600="{!selectedCommunities.has(community)}"
              on:click={() => toggleCommunity(community)}
            >
              {community}
            </button>
          {/each}
        </div>
      </div>
  
      <!-- Listing Type -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Listing type</label>
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 border rounded-full text-sm font-medium"
            class:bg-green-500="{selectedListingType === 'Give-Away'}"
            class:text-white="{selectedListingType === 'Give-Away'}"
            class:border-gray-300="{selectedListingType !== 'Give-Away'}"
            class:text-gray-600="{selectedListingType !== 'Give-Away'}"
            on:click={() => toggleListingType('Give-Away')}
          >
            Give-Away
          </button>
          <button
            class="px-4 py-2 border rounded-full text-sm font-medium"
            class:bg-green-500="{selectedListingType === 'Trade-Offer'}"
            class:text-white="{selectedListingType === 'Trade-Offer'}"
            class:border-gray-300="{selectedListingType !== 'Trade-Offer'}"
            class:text-gray-600="{selectedListingType !== 'Trade-Offer'}"
            on:click={() => toggleListingType('Trade-Offer')}
          >
            Trade-Offer
          </button>
        </div>
      </div>
  
      <!-- Submit Button -->
      <button
        on:click={() => postMyListing()}
        class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Post my listing
      </button>
    </div>
  </div>  