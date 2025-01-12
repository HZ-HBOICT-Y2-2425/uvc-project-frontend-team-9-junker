<script>
    import { savedListingsStore } from "$lib/stores/savedStore";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/authStore";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import ProfileTabs from "./Profile/ProfileTabs.svelte";
    import ProfileDetails from "./Profile/ProfileDetails.svelte";

    export let userData;
    const user = userData.user;
    // console.log(user);

    /**
     * @param {{ target: { files: any[]; }; }} event
     */
    function handleImageUpload(event) {
        const MAX_SIZE_MB = 5;
        const file = event.target.files[0];
        
        if (file) {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                alert(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        saveProfilePic(e.target.result);
                        user.profile_pic = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }

    const { token, username } = get(authStore);
    const saveProfilePic = async (/** @type {any} */ profile_pic) => {
        try {
            if (!token) {
                goto("/login");
                return null;
            }
            const response = await fetch(`http://localhost:3012/user/${username}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, profile_pic }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

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

<div class="max-w-xl mx-auto rounded-lg p-6 mt-[10vh]">
    <ProfileDetails {user} {handleImageUpload} />

    <!-- Item Section -->
    <div class="border-t-4 border-primary-500 dark:border-primary-dark-500">
        <div class="flex items-center justify-center rounded-lg mb-6">
        <ProfileTabs {user}/>
        </div> 
    </div>

    <div class="mt-3">
        <button
        class=" py-2 px-4 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        on:click={() => logout()}
        >
        Log out</button
        >
    </div>
</div>

