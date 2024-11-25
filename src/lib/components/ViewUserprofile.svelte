<script>
    let username = "James M. Mason";
    let badges = ["Big Trader", "Donator", "Lvl 10"];
    let item = {
      name: "Tennis Racket",
      interestCount: 3,
      value: 12,
      tags: ["HZ Students", "APV"]
    };
  
    let profileImage = "/icons/James_pic.svg";
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  </script>
  
  <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <img src="/icons/bell_icon.svg" alt="Bell Icon" class="w-7 h-7 cursor-pointer" />
      <h1 class="text-2xl font-bold text-green-500">Junker</h1>
      <img src="/icons/human.svg" alt="Human Icon" class="w-7 h-7 cursor-pointer" />
    </div>
  
    <!-- Public Profile + Edit -->
    <div class="flex justify-center items-center gap-2 mb-6 border-t-2 border-[#5abf4a]">
      <h2 class="text-xl font-semibold text-[#5abf4a]">Public Profile</h2>
      <span class="text-green-500 text-lg cursor-pointer"><img src="/icons/pencil_icon.svg" alt="Pencil Icon" class="w-7 h-7 cursor-pointer" /></span>
    </div>
  
    <!-- Profile Section -->
    <div class="flex flex-col items-center mb-8">
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img
        src={profileImage}
        alt="Profile Picture"
        class="w-32 h-32 rounded-full object-cover mb-2"
      />
      <label
        for="profile-upload"
        class="text-green-500 underline cursor-pointer text-sm"
      >
        Change Profile Picture
      </label>
      <input type="file" id="profile-upload" accept="image/*" on:change={handleImageUpload} class="hidden" />
    </div>
  
    <h2 class="text-center text-2xl font-bold mb-4">{username}</h2>
  
    <!-- Badges -->
    <div class="flex justify-center gap-3 mb-8">
      {#each badges as badge, i}
        <span class="px-4 py-2 rounded-full text-sm text-black {i === 0 ? 'bg-[#B1FAAF]' : i === 1 ? 'bg-[#F07FFF]' : 'bg-[#FB7E7E]'}">
          {badge}
        </span>
      {/each}
    </div>
  
    <!-- Item Section -->
    <div class = "border-t-2 border-[#5abf4a]" >
        <div class="relative flex justify-center items-center mb-6">
            <!-- Centered "My Items" -->
            <h3 class="text-2xl font-semibold text-[#5abf4a]">My Items</h3>
            
            <!-- Saved Button with Arrow -->
            <div class="absolute right-0 flex items-center space-x-1">
              <button class="text-sm text-[#a7e5a5] underline hover:text-[#5abf4a]">Saved</button>
              <span class="text-[#5abf4a] text-lg">›</span>
            </div>
          </div>
          
        
        <div class="flex items-center justify-between border p-4 rounded-lg mb-6">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
          src="/icons/tenis.svg"
          alt="Item Image"
          class="w-16 h-16 rounded-lg object-cover"
        />
        <div class="flex-1 ml-4">
          <p class="font-bold text-lg">{item.name}</p>
          <p class="text-sm text-gray-500">{item.interestCount} People would like to trade.</p>
          <div class="flex gap-2 mt-2">
            {#each item.tags as tag}
              <span class="bg-gray-100 text-green-500 px-3 py-1 rounded text-xs">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="text-right">
          <p class="flex items-center gap-2 text-gray-700 text-base">
            {item.value}
            <img src="/icons/eye_icon.svg" alt="Eye Icon" class="w-5 h-5" />
          </p>
          <button class="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">View Trades</button>
          <span class="text-[#5abf4a] text-lg">›</span>
        </div>
      </div>
    </div>
  
    <!-- Footer -->
    <div class="flex justify-around items-center gap-4">
        <button 
          class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
          <img src="/icons/search_icon.svg" alt="Search Icon" class="w-7 h-7" />
        </button>
      
        <button 
          class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
          <a href="/community"><img src="/icons/comunity_icon.svg" alt="Community Icon" class="w-7 h-7" /></a>
        </button>
      
        <button 
          class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
          <img src="/icons/chat_icon.svg" alt="Chat Icon" class="w-7 h-7" />
        </button>
      
        <button 
          class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
          <img src="/icons/box_icon.svg" alt="Box Icon" class="w-7 h-7" />
        </button>
      </div>
  </div>
  