<script>
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/authStore";

    let username = '';
    let password = '';
    let message = '';
  
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3012/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data)

        if (response.ok) {
          authStore.set({
            username: username,
            isAuthenticated: !!data.accessToken,
            token: data.accessToken,
            refreshToken: data.refreshToken,
            user: [],
            liked_items: [],
            disliked_items: []
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
  