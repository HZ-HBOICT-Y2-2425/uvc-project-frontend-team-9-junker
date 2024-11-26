<script>
  // Sample chat data
  export let chats = [
    {
      userName: "Alice Johnson",
      lastMessage: "I need a new dress.",
      timeAgo: "3m",
      color: "bg-primary-500", // Placeholder color
    },
    {
      userName: "Bob Smith",
      lastMessage: "The jacket feels great!",
      timeAgo: "3h",
      color: "bg-secondary-500", // Placeholder color
    },
    {
      userName: "Carol White",
      lastMessage: "Let's catch up soon.",
      timeAgo: "2d",
      color: "bg-accent-500", // Placeholder color
    },
    {
      userName: "David Brown",
      lastMessage: "Got the shoes. Thanks!",
      timeAgo: "1w",
      color: "bg-green-400", // Placeholder color
    },
  ];
</script>

<div class="flex flex-col space-y-4 bg-background dark:bg-background-dark p-4 mx-2 md:mx-20 lg:mx-40">
  
  {#each chats as chat}
    <!-- Chat Row -->
    <div class="flex items-center justify-between border-b-2 border-primary-500 pb-2">
      <!-- Left Section: Avatar and Text -->
      <div class="flex items-center space-x-2">
        <!-- Colored Placeholder for Avatar -->
        <div class={`w-6 h-6 rounded-full ${chat.color} flex items-center justify-center`}>
          <span class="text-white font-semibold">{chat.userName[0]}</span>
        </div>

        <!-- Name and Last Message -->
        <div class="flex items-center">
          <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">{chat.userName}</span>
          <span class="text-sm ml-2 sm:ml-4 text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</span>
        </div>
      </div>

      <!-- Right Section: Time and Arrow -->
      <div class="flex items-center space-x-2">
        <!-- Time Ago -->
        <span class="text-sm text-gray-500">{chat.timeAgo}</span>
      </div>
    </div>
  {/each}
</div>
