<script>
    import { communities } from '$lib/stores/AllPurposeStore';
  
    let status = 'public';
    let description = '';
    let picture = null;
  
    function addCommunity() {
      if (!description.trim()) {
        return alert('Please enter a valid description.');
      }
  
      const newCommunity = {
        id: Date.now(),
        status,
        description,
        picture: picture ? URL.createObjectURL(picture) : null,
      };
  
      communities.update((list) => [...list, newCommunity]);
      alert('Community added successfully!');
  
      // Reset fields
      description = '';
      picture = null;
    }
  
    function handleFileChange(event) {
      picture = event.target.files[0];
    }
  </script>
  
  <div class="p-6 space-y-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold text-center">Add Community</h1>
  
    <!-- Status Selection -->
    <div class="flex items-center space-x-4">
      <label>
        <input type="radio" bind:group={status} value="public" /> Public
      </label>
      <label>
        <input type="radio" bind:group={status} value="private" /> Private
      </label>
    </div>
  
    <!-- Description -->
    <textarea 
      placeholder="Enter a description..."
      bind:value={description}
      class="w-full px-4 py-2 border rounded-lg"
    ></textarea>
  
    <!-- Picture Upload -->
    <div>
      <label for="picture" class="block font-medium">Upload Picture</label>
      <input 
        type="file" 
        id="picture" 
        accept="image/*" 
        on:change={handleFileChange}
        class="block w-full"
      />
    </div>
  
    <!-- Add Button -->
    <button 
      on:click={addCommunity} 
      class="w-full bg-primary-500 text-white py-2 rounded-lg"
    >
      Add Community
    </button>
  </
  