<!-- src/routes/change-password.svelte -->
<script>
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    let errorMessage = '';
  
    function handleSubmit() {
      if (newPassword !== confirmPassword) {
        errorMessage = 'New passwords do not match.';
        return;
      }
  
      // 비밀번호 변경 API를 호출하는 로직을 추가할 수 있습니다.
      // 예시: 
      // fetch('/api/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) })
      //   .then(response => {
      //     if (response.ok) {
      //       // 성공적인 변경 후 처리
      //     }
      //   })
    }
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Change Password</h2>
  
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <!-- Current Password -->
        <div>
          <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="current-password"
            bind:value={currentPassword}
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
            placeholder="Enter current password"
          />
        </div>
  
        <!-- New Password -->
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="new-password"
            bind:value={newPassword}
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
            placeholder="Enter new password"
          />
        </div>
  
        <!-- Confirm New Password -->
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            bind:value={confirmPassword}
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
            placeholder="Confirm new password"
          />
        </div>
  
        <!-- Error Message -->
        {#if errorMessage}
          <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}
  
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Update Password
        </button>
      </form>
  
      <!-- Back Link -->
      <div class="mt-4 text-center">
        <a href="/" class="text-sm text-green-500 hover:underline">Cancel and Return</a>
      </div>
    </div>
  </div>
  