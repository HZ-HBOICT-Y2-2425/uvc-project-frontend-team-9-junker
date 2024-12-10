<script>
// @ts-nocheck
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/authStore";
    let username = '';
    let password = '';
    let message = '';

    let userid = '';
    let name = '';
    let description = '';
    let images = '';
    let action = '';
    let available = '';
    let views = '';
    let interested = '';
    let categories = '';
    let communities = '';

    const postMyListing = async (userid, name, description, images, action, available, views, interested, categories, communities) => {
        
        storeItem(userid, name, description, images, action, available, views, interested, categories, communities);


    }
  
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3012/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok) {
          authStore.set({
            username: username,
            isAuthenticated: !!data.accessToken,
            token: data.accessToken,
          });
          message = 'Login successful!';
          goto('/');
        } else {
          message = data.error;
        }
      } catch (error) {
        message = error.message;
      }
    };
      

</script>
<p>
    <button on:click|preventDefault={ () => getAllItems()}>
        get all items
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => getItem('8')}>
        get item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => storeItem(1, "new Item", "it's new", ["default.jpg"], true, true, 0, 0, [], [])}>
        createItem
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => updateItem(8, 1, "no new Item", "it's new", ["default.jpg"], true, true, 0, 0, [], [])}>
        update Item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => deleteItem(8, 1)}>
        delete Item
    </button>
</p>

<main class="flex items-center justify-center min-h-screen bg-background">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div class="flex justify-center mb-4" >
        <button on:click={ () => goto("/")}>
          <img src="/Frog.png" alt="Junker Frog Icon" class="h-20 w-20" />
        </button>
      </div>
      <h1 class="text-2xl font-bold text-primary mb-4">Log In</h1>
      <form on:submit|preventDefault={login} class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-text">Username</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
          <!-- Binding to the reactive variable -->
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-text">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Log In
        </button>
      </form>
      {#if message}
        <p class="mt-4 text-sm text-red-500">{message}</p>
      {/if}
      <p class="mt-6 text-sm text-text">
        Don’t have an account? <a href="/register" class="text-primary hover:underline">Register</a>
      </p>
    </div>
  </main>