<script>
    export let userData;
    const user = userData;
    console.log(user);
    let badges = ["Beginner", "Level 1"];
    let item = {
        name: "Tennis Racket",
        interestCount: 3,
        value: 12,
        tags: ["HZ Students", "APV"],
    };
</script>
<div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
    <!-- Profile Section -->
    <div class="flex flex-col items-center mb-8">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
        src={user.profile_pic}
        alt="Profile Picture"
        class="w-32 h-32 rounded-full object-cover mb-2"
        />
    </div>
    <h2 class="text-center text-2xl font-bold mb-4">{user.username}</h2>
    <!-- Badges -->
    <div class="flex justify-center gap-3 mb-8">
        {#each badges as badge, i}
        <span
            class="px-4 py-2 rounded-full text-sm text-black {i === 0
            ? 'bg-[#B1FAAF]'
            : i === 1
                ? 'bg-[#F07FFF]'
                : 'bg-[#FB7E7E]'}"
        >
            {badge}
        </span>
        {/each}
    </div>
    <!-- Item Section -->
    <div class="border-t-2 border-[#5abf4a]">
        <div class="relative flex justify-center items-center mb-6">
        <!-- Centered "My Items" -->
        <h3 class="text-2xl font-semibold text-[#5abf4a]">Listed Items</h3>
        </div>
        <!-- Item Card -->
        <div class="flex items-center justify-between border p-4 rounded-lg mb-6">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
            src="/icons/tenis.svg"
            alt="Item Image"
            class="w-16 h-16 rounded-lg object-cover"
        />
        <div class="flex-1 ml-4">
            <p class="font-bold text-lg">{item.name}</p>
            <p class="text-sm text-gray-500">
            {item.interestCount} People would like to trade.
            </p>
            <div class="flex gap-2 mt-2">
            {#each item.tags as tag}
                <span class="bg-gray-100 text-green-500 px-3 py-1 rounded text-xs"
                >{tag}</span
                >
            {/each}
            </div>
        </div>
        <div class="text-right">
            <p class="flex items-center gap-2 text-gray-700 text-base">
            {item.value}
            <img src="/icons/eye_icon.svg" alt="Eye Icon" class="w-5 h-5" />
            </p>
            <button
            class="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
            >View Trades</button
            >
            <span class="text-[#5abf4a] text-lg">›</span>
        </div>
        </div>
    </div>
</div>