export const API_BASE_URL = 'http://localhost:3010';

export async function fetchCommunities() {
    const response = await fetch(`${API_BASE_URL}/community_microservice`);
    if (!response.ok) {
        throw new Error('Failed to fetch communities');
    }
    return response.json();
}

export async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/usermicroservice/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}
