<script>
  // @ts-nocheck
  import Footer from "$lib/components/Footer.svelte";
  import ViewChats from "$lib/components/ViewChats.svelte";
  import { authStore } from "$lib/stores/authStore";
  import fetchUserData from "$lib/utils/fetchUserWithAuth";

  fetchUserData();
  
  const { username } = $authStore;
  const userId = username;
</script>

<div class="page-container">
  <ViewChats {userId} />
  <Footer />
</div>