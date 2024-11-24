<script>
  export let item = {
    title: "Tennis Racket",
    image: "path-to-racket.jpg",
    interested: 3,
    views: 12,
  };
</script>

<div
  class="flex flex-col p-4 bg-primary-900 dark:bg-primary-100 rounded-lg shadow-md h-full"
>
  <!-- Header Section -->
  <div class="flex items-start">
    <!-- Item Image -->
    <div
      class="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0"
    >
      <img
        src={item.image}
        alt={item.title}
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Title and Interest -->
    <div class="flex-1 ml-4">
      <h3 class="text-base sm:text-lg font-bold text-text dark:text-text-dark">
        {item.title}
      </h3>
      <p class="text-sm sm:text-base text-accent-400 dark:text-accent-dark-400">
        {item.interested} people would like to trade.
      </p>
      <!-- Views Section -->
      <div class="flex items-center space-x-1 mt-4">
        <span
          class="text-sm sm:text-base font-bold text-text dark:text-text-dark"
          >{item.views}</span
        >
        <i class="fa-solid fa-eye text-text dark:text-text-dark"></i>
      </div>
    </div>
  </div>

  <!-- Button Section -->
  <div class="flex justify-between mt-2">
    <!-- Details Button -->
    <button
      class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base rounded-lg shadow-md hover:bg-gray-400 transition"
    >
      Details
    </button>

    <!-- View Trades Button -->
    <button
      class="px-4 py-2 bg-primary-500 dark:bg-primary-dark-500 dark:text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-green-600 transition ml-4"
    >
      View Trades
    </button>
  </div>
</div>
