<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

    import ViewChats from "$lib/components/ViewChats.svelte";
</script>

<div>
  <Header title="Chats" />

  <main>
    <ViewChats />
  </main>

  <Footer />
</div>