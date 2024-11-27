<script>
    import { savedListingsStore } from '$lib/stores/savedStore';
    import { onMount } from 'svelte';
    import SavedListings from './Listings/SavedListings.svelte';
    import { goto } from '$app/navigation';
    import { authStore } from "$lib/stores/authStore";
    import { get } from "svelte/store";

    export let userData;
    const user = userData.user;
    console.log(user);

    let badges = ["Beginner", "Level 1"];
    let item = {
        name: "Tennis Racket",
        interestCount: 3,
        value: 12,
        tags: ["HZ Students", "APV"],
    };

    /**
     * @param {{ target: { files: any[]; }; }} event
     */
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                user.profile_pic = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    let savedListings = [];

    // Subscribe to the saved listings store on mount
    onMount(() => {
        const unsubscribe = savedListingsStore.subscribe((saved) => {
        savedListings = saved; // Reactively update the local array
        });

        return () => {
        unsubscribe(); // Clean up the subscription when the component unmounts
        };
    });

    const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            goto("/login");
        };
</script>

<div class="max-w-lg mx-auto md:max-w-4xl md:p-8 lg:p-12">
    <div class="flex justify-center items-start">
        <div class="w-full max-w-lg mx-auto md:max-w-4xl">
            <!-- Profile Section -->
            <div class="flex flex-col items-center mb-8 md:flex-row md:items-center md:gap-6">
                <!-- Profile Picture -->
                <div class="flex flex-col items-center md:items-start">
                    <!-- svelte-ignore a11y_img_redundant_alt -->
                    <img src={user.profile_pic} alt="Profile Picture" class="w-32 h-32 rounded-full object-cover mb-2" />
                    
                    <!-- Change Profile Picture -->
                    <label for="profile-upload" class="text-green-500 underline cursor-pointer text-sm">
                        Change Profile Picture
                    </label>
                    <input type="file" id="profile-upload" accept="image/*" on:change={handleImageUpload} class="hidden" />
                    
                    <!-- Change Password -->
                    <a href="/change-password" class="text-green-500 underline cursor-pointer text-sm">
                        Change Password
                    </a>
                </div>
    
                <!-- Username -->
                <h2 class="text-center text-2xl font-bold mb-4 md:mb-0 md:text-left md:self-center">
                    @{user.username}
                </h2>
                
            </div>
    
            <!-- Badges -->
            <div class="flex justify-center gap-3 mb-8 md:justify-start">
                {#each badges as badge, i}
                <span
                    class="px-4 py-2 rounded-full text-sm text-black {i === 0
                    ? 'bg-[#B1FAAF]'
                    : i === 1
                        ? 'bg-[#F07FFF]'
                        : 'bg-[#FB7E7E]'}"
                >
                    {badge}
                </span>
                {/each}
            </div>
        </div>
    </div>
    
    <!-- Item Section -->
    <div class="border-t-2 border-[#5abf4a]">
        <div class="relative flex justify-center items-center mb-6 md:justify-between">
            <h3 class="text-2xl font-semibold text-[#5abf4a]">My Items</h3>
            <div class="absolute right-0 flex items-center space-x-1 md:static">
                <button class="text-sm text-[#a7e5a5] underline hover:text-[#5abf4a]">Saved</button>
                <span class="text-[#5abf4a] text-lg">›</span>
            </div>
        </div>

        <div class="flex items-center justify-between border p-4 rounded-lg mb-6 flex-col md:flex-row">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src="/icons/tenis.svg" alt="Item Image" class="w-16 h-16 rounded-lg object-cover mb-4 md:mb-0" />
            <div class="flex-1 ml-4 text-center md:text-left">
                <p class="font-bold text-lg">{item.name}</p>
                <p class="text-sm text-gray-500">{item.interestCount} People would like to trade.</p>
                <div class="flex gap-2 mt-2 justify-center md:justify-start">
                    {#each item.tags as tag}
                    <span class="bg-gray-100 text-green-500 px-3 py-1 rounded text-xs">{tag}</span>
                    {/each}
                </div>
            </div>
            <div class="text-center md:text-right">
                <p class="flex items-center justify-center gap-2 text-gray-700 text-base md:justify-end">
                    {item.value}
                    <img src="/icons/eye_icon.svg" alt="Eye Icon" class="w-5 h-5" />
                </p>
                <button class="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">View Trades</button>
                <span class="text-[#5abf4a] text-lg">›</span>
            </div>
        </div>
    </div>

    <div class="mt-3 text-center md:text-right">
        <button
            class="py-2 px-4 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            on:click={() => logout()} >
            Log out
        </button>
    </div>
</div>

