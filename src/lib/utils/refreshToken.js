import { get } from 'svelte/store';
import { authStore } from '$lib/stores/authStore';

export async function refreshToken() {
    const { refreshToken, username } = get(authStore);

    if (!refreshToken) {
        console.error("No refresh token found.");
        return null;
    }

    try {
        const response = await fetch('http://localhost:3012/refreshToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken, username }),
        });

        if (response.ok) {
            const data = await response.json();

            authStore.update((store) => ({
                ...store,
                token: data.accessToken,
                refreshToken: data.refreshToken,
            }));

            return data.accessToken; // Return new token for further use
        }

        console.error("Failed to refresh token:", response.status);
        return null;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}
