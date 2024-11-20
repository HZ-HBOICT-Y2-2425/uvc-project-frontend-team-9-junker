<script>
    let username = '';
    let password = '';
    let confirmPassword = '';
    let message = '';
  
    const register = async () => {
      if (password !== confirmPassword) {
        message = 'Passwords do not match!';
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3012/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
  
        if (response.ok) {
          message = 'Registration successful! Please log in.';
          window.location.href = '/login';
        } else {
          message = data.error;
        }
      } catch (error) {
        message = 'An error occurred during registration.';
      }
    };
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-background">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div class="flex justify-center mb-4">
        <img src="/Frog.png" alt="Junker Frog Icon" class="h-20 w-20" />
      </div>
      <h1 class="text-2xl font-bold text-primary mb-4">Create an Account</h1>
      <form on:submit|preventDefault={register} class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-text">Username</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div class="relative">
          <label for="password" class="block text-sm font-medium text-text">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
          <p class="text-xs text-gray-500 mt-1">
            Use 8 or more characters with a mix of letters, numbers, and symbols.
          </p>
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-text">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Register
        </button>
      </form>
      {#if message}
        <p class="mt-4 text-sm text-red-500">{message}</p>
      {/if}
      <p class="mt-6 text-sm text-text">
        Already have an account? <a href="/login" class="text-primary hover:underline">Log in</a>
      </p>
    </div>
  </main>
  
  <style>
    .bg-background {
      background-color: var(--background-color);
    }
  </style>
  