import { get } from 'svelte/store';
import { authStore } from '$lib/stores/authStore';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { refreshToken } from './refreshToken';
const url = "http://localhost:3012/user/private/";

export default async function fetchUserData() {
    if (!browser) return null;

    console.log("Fetching user data...");
    const { token, username } = get(authStore);

    if (!token) {
        console.log("No token found, redirecting to login.");
        goto("/login");
        return null;
    }

    try {
        let response = await fetch(`${url}${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) { // Token expired
            console.log("Token expired, attempting to refresh...");
            const newToken = await refreshToken();

            if (newToken) {
                response = await fetch(`${url}${username}`, {
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            } else {
                goto("/login");
                return null;
            }
        }

        if (response.status === 403) {
            goto("/login");
            return null;
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        goto("/login");
        return null;
    }
}
