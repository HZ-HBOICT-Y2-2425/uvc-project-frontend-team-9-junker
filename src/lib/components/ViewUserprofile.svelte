<script>
    import { savedListingsStore } from "$lib/stores/savedStore";
    import { onMount } from "svelte";
    import SavedListings from "./Listings/SavedListings.svelte";
    import { goto } from "$app/navigation";
    import ProfileTabs from "./Profile/ProfileTabs.svelte";
    import ProfileDetails from "./Profile/ProfileDetails.svelte";

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

<div class="max-w-xl mx-auto shadow-lg rounded-lg p-6">
  <ProfileDetails {user} {badges} {item} {handleImageUpload} />

  <!-- Item Section -->
  <div class="border-t-4 border-primary-500 dark:border-primary-dark-500">
    <div class="flex items-center justify-center rounded-lg mb-6">
      <ProfileTabs />
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

