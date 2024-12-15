<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import SubHeaderV2 from "$lib/components/SubHeaderV2.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { authStore } from "$lib/stores/authStore";
    import { goto } from "$app/navigation";

    let communityId = $page.params.id;
    let communityName = $page.params.name;
    /**
   * @type {{ id: string | number | boolean; name: string | number | boolean; }}
   */
    let communityData;
    const user_id = $authStore.user.id;

    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:3011/${communityId}`);
            communityData = await response.json();
            console.log(communityData);
        } catch (error) {
            console.log(error);
        }
    });

    const joinCommunity = async () => {
        try {
            const response = await fetch(`http://localhost:3011/join/${communityId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id }),
        });

        const data = await response.json();
        if (response.ok) {
            goto(`/community/${encodeURIComponent(communityData.id)}_${encodeURIComponent(communityData.name)}`);
        } else {
            console.error('Error fetching role:', data.error);
        }
        } catch (error) {
            
        }
    }

</script>
    
    <div>
        <header>
            <SubHeaderV2 title={communityName}/>
        </header>    
    <main>
        <!-- Buttons -->
        <div class="flex justify-between mt-4">
            <button
            class="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600"
            on:click={joinCommunity()}
            >
            Join
            </button>
        </div>
    </main>
    
        <Footer />
    </div>