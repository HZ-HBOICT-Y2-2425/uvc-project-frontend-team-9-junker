// utils/authUtils.js
import { get } from 'svelte/store';
import { authStore } from '$lib/stores/authStore';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
const url = import.meta.env.VITE_API_URL;

export default async function fetchUserData() {
    if (!browser) return null;

    // Use `get` to access the current value of the store
    const { token, username } = get(authStore);
    if (!token) {
        goto("/login");
        return null;
    }

    try {
        const response = await fetch(`https://localhost:3012/user/private/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.status === 403) {
        goto("/login");
        return null;
        }

        const userData = await response.json();
        // console.log(userData);
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        goto("/login");
        return null;
    }
}
