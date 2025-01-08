<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ViewSearch from "$lib/components/ViewSearch.svelte";
  
</script>

<div class="h-screen">
  <Header title="Search" />

  <main  class="h-[80vh]">
    <ViewSearch/>
  </main>

  <Footer />
</div>