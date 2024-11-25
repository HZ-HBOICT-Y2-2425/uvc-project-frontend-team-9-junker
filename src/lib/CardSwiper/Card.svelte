<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let title: string;
    export let description: string;
    export let image: string;
    export let owner: string;
    export let group: string;

    const dispatch = createEventDispatcher();

    // Reactive state for whether this card is saved
    let isSaved = false;

    // Function to handle save
    const handleSave = () => {
        // If already saved, do nothing
        if (!isSaved) {
            dispatch('save', { title, description, image, owner, group });
            isSaved = true; // Mark this card as saved
        }
    };
</script>

<div class="card">
    <!-- Image Section -->
    <img src={image} alt={title} class="card-image" />

    <!-- Content Section -->
    <div class="card-content">
        <h3 class="card-title">{title}</h3>
        <p class="card-description">{description}</p>

        <!-- Owner Information -->
        <div class="info-section">
            <div class="info owner-info">
                <span class="icon">👤</span>
                <span class="text">{owner}</span>
                <!-- Added text: Owner Info -->
                <span class="owner-text">User</span>
            </div>

            <!-- Group Information -->
            <div class="info group-info">
                <span class="icon">👥</span>
                <span class="text">{group}</span>
                <!-- Added text: Group Info -->
                <span class="group-text">Community</span>
            </div>
        </div>

        <!-- Bookmark Button -->
        <div class="bookmark" on:click={handleSave}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bookmark-icon"
                fill={isSaved ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke={isSaved ? "red" : "currentColor"}
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 5l7-2 7 2v14l-7-3-7 3V5z"
                />
            </svg>
        </div>
    </div>
</div>

<style>
.card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}

.card-image {
    width: 100%;
    height: 60%;
    object-fit: cover;
}

.card-content {
    padding: 16px;
    background: rgba(255, 255, 255, 0.9);
    color: black;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #e0e0e0;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.card-description {
    font-size: 1rem;
    color: gray;
    margin: 0;
    font-style: italic;
}

.info-section {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    align-items: center;
}

.info {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #e0f2f1;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #00695c;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
    font-size: 1.2rem;
}

.owner-text,
.group-text {
    font-size: 0.75rem;
    color: #777;
}

.bookmark {
    position: absolute;
    right: 16px;
    bottom: 16px;
    cursor: pointer;
}

.bookmark-icon {
    width: 24px;
    height: 24px;
    opacity: 0.8;
}

.bookmark:hover .bookmark-icon {
    opacity: 1;
}
</style>
