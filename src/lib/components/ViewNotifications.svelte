<SubHeaderV2 title="Notifications" />

<script lang="ts">
  import SubHeaderV2 from "./SubHeaderV2.svelte";

  let notifications = [
    { id: 1, user: "GabriellaK", item: "Sneakers [Vintage]" },
    { id: 2, user: "GabriellaK", item: "Corner Desk" },
    { id: 3, user: "Tristan", item: "Vintage Nike Sneakers Size 12" }
  ];

  // Delete notification handler
  function deleteNotification(id: number) {
    notifications = notifications.filter(notification => notification.id !== id);
  }

  // Open chat button handler
  function openChat(user: string) {
    alert(`Chat with ${user}`);
  }
</script>

<style>
  .background {
    background-color: #dbfff0; /* Light green background */
    min-height: 100vh;
  }

  .content-gap {
    height: 20px; /* Adjust gap height as needed */
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #4A5568; /* Default gray */
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
  }

  .delete-button {
    cursor: pointer;
  }

  .chat-button {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #ffffff;
  }

  .chat-button i {
    color: #00a36c; /* Mint color for icon */
    font-size: 1.5rem; /* Larger icon size */
  }

  .notification-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .notifications-heading {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00a36c; /* Bright green */
    text-align: center;
    margin-bottom: 1rem;
  }
</style>

<div class="background">
  <!-- Add gap between header and notifications -->
  <div class="content-gap"></div>

  <!-- Notification Center -->
  <div class="content-container flex items-center justify-center">
    <div class="w-full max-w-md">
      {#if notifications.length > 0}
        <!-- Notification List -->
        <div>
          {#each notifications as { id, user, item }}
            <div class="notification-card flex items-center py-3 space-x-4">
              <!-- User Avatar -->
              <div class="avatar">{user.charAt(0)}</div>

              <!-- Notification Content -->
              <div class="flex-1">
                <p class="text-sm text-gray-800">
                  <span class="text-green-600 font-medium">{user}</span> liked your item😍: 
                  <span class="font-semibold">{item}</span>
                </p>
              </div>

              <!-- Chat Button -->
              <button
                class="chat-button"
                on:click={() => openChat(user)}
                title="Chat"
              >
                <i class="fa-solid fa-comment"></i>
              </button>

              <!-- Delete Button -->
              <button
                class="delete-button w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-xs"
                on:click={() => deleteNotification(id)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          {/each}
        </div>
      {:else}
        <!-- Message when no notifications -->
        <div class="text-center py-10 text-gray-500">
          <p class="text-lg font-medium">No notifications available</p>
        </div>
      {/if}
    </div>
  </div>
</div>
